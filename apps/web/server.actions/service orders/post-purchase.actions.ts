"use server";

import prisma from "@/lib/prismaClient";
import { createNotification } from "../notifications/notifications.actions";
import { OrderStatus, PaymentStatus, PaymentMethodType } from "@prisma/client";
import { completeTransaction } from "../payment/update-transaction.actions ";

export async function handlePostPurchase(
  orderId: string,
  transactionReference?: string,
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        buyer: {
          include: { profile: true },
        },
        seller: {
          include: { profile: true },
        },
        service: true,
        paymentTransaction: true,
      },
    });

    if (!order) throw new Error("Order not found");

    // Handle payment completion if external payment
    if (
      order.paymentMethod === PaymentMethodType.EXTERNAL &&
      transactionReference
    ) {
      await completeTransaction(transactionReference);

      // Update order payment status
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: PaymentStatus.COMPLETED,
          status: OrderStatus.ACCEPTED,
        },
      });
    }

    // Create chat room between buyer and seller
    const chatRoom = await prisma.chatRoom.create({
      data: {
        title: `Order: ${order.service?.name || "Service"} #${orderId.slice(0, 8)}`,
        participants: {
          create: [
            {
              participantId: order.buyerId,
              role: "buyer",
            },
            {
              participantId: order.sellerId,
              role: "seller",
            },
          ],
        },
        messages: {
          create: {
            content: `Order started for ${order.service?.name}. Amount: ${order.totalAmount} ${order.currency}`,
            senderId: order.sellerId,
          },
        },
      },
    });

    // Send notifications
    await Promise.all([
      // Notify seller
      createNotification({
        recipientId: order.sellerId,
        type: "NEW_ORDER",
        content: `New order received worth ${order.totalAmount} ${order.currency}`,
        link: `/orders/${orderId}`,
        metadata: {
          orderId,
          amount: order.totalAmount,
          buyerName: order.buyer.profile.firstName,
        },
      }),

      // Notify buyer
      createNotification({
        recipientId: order.buyerId,
        type: "ORDER_STATUS_CHANGE",
        content: `Your order has been placed successfully`,
        link: `/orders/${orderId}`,
        metadata: {
          orderId,
          status: order.status,
          serviceName: order.service?.name,
        },
      }),
    ]);

    return {
      success: true,
      chatRoomId: chatRoom.id,
      orderId: order.id,
      paymentStatus: order.paymentStatus,
    };
  } catch (error) {
    console.error("Error in post-purchase process:", error);
    throw new Error("Failed to process post-purchase actions");
  }
}

// Handle order status updates
export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
  message?: string,
) {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: newStatus,
        updatedAt: new Date(),
      },
      include: {
        buyer: true,
        seller: true,
        service: true,
      },
    });

    // Find the chat room for this order
    const chatRoom = await prisma.chatRoom.findFirst({
      where: {
        AND: [
          { participants: { some: { participantId: order.buyerId } } },
          { participants: { some: { participantId: order.sellerId } } },
        ],
      },
    });

    // Add status update message to chat
    if (chatRoom && message) {
      await prisma.message.create({
        data: {
          chatRoomId: chatRoom.id,
          senderId: order.sellerId,
          content: message,
        },
      });
    }

    // Send notification about status change
    await createNotification({
      recipientId: order.buyerId,
      type: "ORDER_STATUS_CHANGE",
      content: `Order status updated to ${newStatus}`,
      link: `/orders/${orderId}`,
      metadata: {
        orderId,
        status: newStatus,
        serviceName: order.service?.name,
      },
    });

    // If order is completed, handle payment release
    if (newStatus === OrderStatus.COMPLETED) {
      // Update seller's earnings
      await prisma.seller.update({
        where: { id: order.sellerId },
        data: {
          totalEarnings: {
            increment: Number(order.totalAmount),
          },
        },
      });

      // Notify seller about payment
      await createNotification({
        recipientId: order.sellerId,
        type: "PAYMENT_RECEIVED",
        content: `Payment released for order #${orderId}`,
        link: `/orders/${orderId}`,
        metadata: {
          orderId,
          amount: order.totalAmount,
        },
      });
    }

    return order;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error("Failed to update order status");
  }
}
