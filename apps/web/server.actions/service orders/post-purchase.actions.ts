"use server";

import prisma from "@/lib/prismaClient";
import { createNotification } from "../notifications/notifications.actions";
import {
  OrderStatus,
  PaymentStatus,
  PaymentMethodType,
  Prisma,
} from "@prisma/client";
import { completeTransaction } from "../payment/update-transaction.actions";

// Initial post-purchase setup
export async function handlePostPurchase(
  orderId: string,
  transactionReference?: string,
) {
  try {
    console.log("Starting post-purchase process for order:", orderId);

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        buyer: { include: { profile: true } },
        seller: { include: { profile: true } },
        service: true,
        servicePackage: true,
      },
    });
    console.log("Found order:", order);

    if (!order) throw new Error("Order not found");

    // 1. Handle payment and escrow
    if (
      order.paymentMethod === PaymentMethodType.EXTERNAL &&
      transactionReference
    ) {
      await completeTransaction(transactionReference);
      await prisma.order.update({
        where: { id: orderId },
        data: { paymentStatus: PaymentStatus.COMPLETED },
      });
    }

    // 2. Create chat room
    const chatRoom = await createOrderChatRoom(order);
    console.log("Created chat room:", chatRoom);

    // 3. Send initial notifications with 48-hour acceptance window
    await sendInitialNotifications(order, chatRoom.id);
    console.log("Sent notifications");

    // 4. Schedule auto-cancellation if not accepted within 48 hours
    await scheduleAutoCancellation(orderId);

    return { success: true, chatRoomId: chatRoom.id, orderId: order.id };
  } catch (error) {
    console.error("Error in post-purchase process:", error);
    throw error;
  }
}

// Handle seller's order acceptance/decline
export async function handleOrderAcceptance(
  orderId: string,
  accepted: boolean,
  message?: string,
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        buyer: { include: { profile: true } },
        seller: { include: { profile: true } },
        servicePackage: true,
      },
    });

    if (!order) throw new Error("Order not found");

    if (accepted) {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: OrderStatus.REQUIREMENTS },
      });

      await createNotification({
        recipientId: order.buyer.profile.id,
        type: "ORDER_STATUS_CHANGE",
        content: "Order accepted! Please submit your requirements.",
        link: `/orders/${orderId}`,
      });
    } else {
      await handleOrderCancellation(orderId, "Seller declined the order");
    }

    return { success: true };
  } catch (error) {
    console.error("Error handling order acceptance:", error);
    throw error;
  }
}

// Handle requirements submission and approval
export async function handleRequirementsSubmission(
  orderId: string,
  requirements: string,
  files?: string[],
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { servicePackage: true },
    });

    if (!order) throw new Error("Order not found");

    // Calculate delivery deadline
    const deliveryDeadline = new Date();
    deliveryDeadline.setDate(
      deliveryDeadline.getDate() + (order.servicePackage?.deliveryTime || 0),
    );

    const fileData: Prisma.JsonValue = files ? files : [];
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.IN_PROGRESS,
        requirements,
        requirementFiles: fileData,
        deliveryDeadline,
        revisionLimit: order.servicePackage?.revisions || 0,
      },
    });

    // Notify seller
    await createNotification({
      recipientId: order.seller.profile.id,
      type: "ORDER_STATUS_CHANGE",
      content: "Buyer has submitted requirements. You can start working now.",
      link: `/orders/${orderId}`,
    });

    return { success: true };
  } catch (error) {
    console.error("Error submitting requirements:", error);
    throw error;
  }
}

// Handle order delivery
export async function handleOrderDelivery(
  orderId: string,
  deliveryMessage: string,
  files?: string[],
) {
  try {
    const deliveryData: Prisma.JsonValue = files ? files : [];
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.DELIVERED,
        deliveryMessage,
        deliveryFiles: deliveryData,
      },
      include: { buyer: true },
    });

    // Start 3-day review period
    const reviewDeadline = new Date();
    reviewDeadline.setDate(reviewDeadline.getDate() + 3);

    // Notify buyer
    await createNotification({
      recipientId: order.buyerId,
      type: "ORDER_STATUS_CHANGE",
      content: `Your order has been delivered! Please review within 3 days (by ${reviewDeadline.toLocaleDateString()})`,
      link: `/orders/${orderId}`,
      metadata: {
        reviewDeadline: reviewDeadline.toISOString(),
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error delivering order:", error);
    throw error;
  }
}

// Handle revision request
export async function handleRevisionRequest(
  orderId: string,
  revisionMessage: string,
  files?: string[],
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) throw new Error("Order not found");
    if (order.revisionCount >= (order.revisionLimit || 0)) {
      throw new Error("Revision limit reached");
    }

    const revisionData: Prisma.JsonValue = files ? files : [];
    await prisma.$transaction([
      prisma.order.update({
        where: { id: orderId },
        data: {
          status: OrderStatus.IN_REVISION,
          revisionCount: { increment: 1 },
        },
      }),
      prisma.orderRevision.create({
        data: {
          orderId,
          revisionMessage,
          revisionFiles: revisionData,
        },
      }),
    ]);

    // Notify seller
    await createNotification({
      recipientId: order.sellerId,
      type: "ORDER_STATUS_CHANGE",
      content: "Buyer has requested a revision",
      link: `/orders/${orderId}`,
    });

    return { success: true };
  } catch (error) {
    console.error("Error requesting revision:", error);
    throw error;
  }
}

// Handle order completion
export async function handleOrderCompletion(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        seller: true,
        service: true,
      },
    });

    if (!order) throw new Error("Order not found");

    // Update order status
    await prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.COMPLETED },
    });

    // Release funds to seller
    await prisma.seller.update({
      where: { id: order.sellerId },
      data: {
        totalEarnings: {
          increment: Number(order.totalAmount) * 0.9, // 10% platform fee
        },
      },
    });

    // Enable review system
    await enableOrderReviews(orderId);

    return { success: true };
  } catch (error) {
    console.error("Error completing order:", error);
    throw error;
  }
}

// Helper functions...

// Helper function to create chat room
async function createOrderChatRoom(order: any) {
  try {
    // First check if chat room already exists
    const existingChatRoom = await prisma.chatRoom.findFirst({
      where: {
        AND: [
          { participants: { some: { participantId: order.buyer.profile.id } } },
          {
            participants: { some: { participantId: order.seller.profile.id } },
          },
        ],
      },
    });

    if (existingChatRoom) {
      console.log("Using existing chat room:", existingChatRoom.id);
      return existingChatRoom;
    }

    // Create chat room with correct participant IDs
    const chatRoom = await prisma.chatRoom.create({
      data: {
        title: `Order #${order.id.slice(0, 8)} - ${order.service?.name}`,
        participants: {
          create: [
            {
              participantId: order.buyer.profile.id,
              role: "buyer",
            },
            {
              participantId: order.seller.profile.id,
              role: "seller",
            },
          ],
        },
      },
    });

    console.log("Created new chat room:", chatRoom.id);

    // Add initial messages
    await prisma.message.createMany({
      data: [
        {
          chatRoomId: chatRoom.id,
          senderId: order.seller.profile.id, // Use profile ID
          content: `Order Details:
- Service: ${order.service?.name}
- Package: ${order.servicePackage?.name}
- Amount: ${order.totalAmount} ${order.currency}
- Delivery Time: ${order.servicePackage?.deliveryTime} days
- Revisions: ${order.servicePackage?.revisions}`,
        },
        {
          chatRoomId: chatRoom.id,
          senderId: order.seller.profile.id, // Use profile ID
          content: "Please submit your requirements to begin the order.",
        },
      ],
    });

    return chatRoom;
  } catch (error) {
    console.error("Error creating chat room:", error);
    throw error;
  }
}

// Helper function to send initial notifications
async function sendInitialNotifications(order: any, chatRoomId: string) {
  try {
    await Promise.all([
      // Notify seller - use seller's profile ID
      createNotification({
        recipientId: order.seller.profile.id, // Use profile ID instead of sellerId
        type: "NEW_ORDER",
        content: `New order received! Please accept within 48 hours.`,
        link: `/orders/${order.id}`,
        metadata: {
          orderId: order.id,
          amount: order.totalAmount,
          buyerName: order.buyer.profile.firstName,
          chatRoomId,
          deadline: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours
        },
      }),
      // Notify buyer - use buyer's profile ID
      createNotification({
        recipientId: order.buyer.profile.id, // Use profile ID instead of buyerId
        type: "ORDER_STATUS_CHANGE",
        content: `Order placed successfully. Waiting for seller acceptance.`,
        link: `/orders/${order.id}`,
        metadata: {
          orderId: order.id,
          chatRoomId,
          serviceName: order.service?.name,
          packageName: order.servicePackage?.name,
        },
      }),
    ]);
  } catch (error) {
    console.error("Error sending notifications:", error);
    throw error;
  }
}

// Helper function to schedule auto-cancellation
async function scheduleAutoCancellation(orderId: string) {
  try {
    // In production, use a proper job queue system
    setTimeout(
      async () => {
        const order = await prisma.order.findUnique({
          where: { id: orderId },
        });

        if (order?.status === "PENDING") {
          await handleOrderCancellation(
            orderId,
            "Automatic cancellation - Seller did not accept in time",
          );
        }
      },
      48 * 60 * 60 * 1000,
    ); // 48 hours
  } catch (error) {
    console.error("Error scheduling cancellation:", error);
    throw error;
  }
}

// Helper function to handle order cancellation
async function handleOrderCancellation(orderId: string, reason: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        buyer: true,
        seller: true,
        service: true,
      },
    });

    if (!order) throw new Error("Order not found");

    // Update order status
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "CANCELLED" },
    });

    // Process refund
    if (order.paymentStatus === "COMPLETED") {
      if (order.paymentMethod === "WALLET") {
        await prisma.wallet.update({
          where: { ownerId: order.buyerId },
          data: {
            balance: {
              increment: Number(order.totalAmount),
            },
          },
        });
      }
      // Handle external payment refund if needed
    }

    // Send notifications
    await Promise.all([
      createNotification({
        recipientId: order.buyerId,
        type: "ORDER_STATUS_CHANGE",
        content: `Order cancelled: ${reason}. Refund initiated.`,
        link: `/orders/${orderId}`,
      }),
      createNotification({
        recipientId: order.sellerId,
        type: "ORDER_STATUS_CHANGE",
        content: `Order cancelled: ${reason}`,
        link: `/orders/${orderId}`,
      }),
    ]);
  } catch (error) {
    console.error("Error cancelling order:", error);
    throw error;
  }
}

// Helper function to enable order reviews
async function enableOrderReviews(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        buyer: true,
        seller: true,
        service: true,
      },
    });

    if (!order) throw new Error("Order not found");

    // Create review permissions or update order status to allow reviews
    await Promise.all([
      createNotification({
        recipientId: order.buyerId,
        type: "ORDER_STATUS_CHANGE",
        content: `Please leave a review for your completed order`,
        link: `/orders/${orderId}/review`,
      }),
      createNotification({
        recipientId: order.sellerId,
        type: "PAYMENT_RECEIVED",
        content: `Payment released for order #${orderId}`,
        link: `/orders/${orderId}`,
      }),
    ]);
  } catch (error) {
    console.error("Error enabling reviews:", error);
    throw error;
  }
}

// Add this export at the top with other exports
export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
  message: string,
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        buyer: true,
        seller: true,
        service: true,
        servicePackage: true,
      },
    });

    if (!order) throw new Error("Order not found");

    // Validate status transition
    const isValidTransition = validateStatusTransition(order.status, newStatus);
    if (!isValidTransition) {
      throw new Error("Invalid status transition");
    }

    // Update order status
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: newStatus,
        updatedAt: new Date(),
        // Update deadline if moving to IN_PROGRESS
        ...(newStatus === OrderStatus.IN_PROGRESS && {
          deliveryDeadline: new Date(
            Date.now() +
              (order.servicePackage?.deliveryTime || 0) * 24 * 60 * 60 * 1000,
          ),
        }),
      },
    });

    // Send notification
    await createNotification({
      recipientId: order.buyerId,
      type: "ORDER_STATUS_CHANGE",
      content: message,
      link: `/orders/${orderId}`,
      metadata: {
        orderId,
        status: newStatus,
        serviceName: order.service?.name,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
}

// Add helper function to validate status transitions
function validateStatusTransition(
  currentStatus: OrderStatus,
  newStatus: OrderStatus,
): boolean {
  const validTransitions: Record<OrderStatus, OrderStatus[]> = {
    PENDING: ["ACCEPTED", "CANCELLED", "DECLINED"],
    ACCEPTED: ["IN_PROGRESS", "CANCELLED"],
    REQUIREMENTS: ["IN_PROGRESS", "CANCELLED"],
    IN_PROGRESS: ["DELIVERED", "CANCELLED", "DISPUTED"],
    DELIVERED: ["COMPLETED", "IN_REVISION", "DISPUTED"],
    IN_REVISION: ["DELIVERED", "DISPUTED"],
    COMPLETED: ["DISPUTED"],
    DECLINED: [],
    CANCELLED: [],
    DISPUTED: ["COMPLETED", "CANCELLED"],
  };

  return validTransitions[currentStatus]?.includes(newStatus) || false;
}
