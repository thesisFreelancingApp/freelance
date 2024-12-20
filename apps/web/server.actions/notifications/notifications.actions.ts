"use server";
import prisma from "@/lib/prismaClient";
import { Prisma } from "@prisma/client";

export type NotificationType =
  | "NEW_ORDER"
  | "ORDER_STATUS_CHANGE"
  | "NEW_RATING"
  | "PAYMENT_RECEIVED"
  | "SERVICE_APPROVED"
  | "DISPUTE_CREATED"
  | "DISPUTE_RESOLVED";

interface CreateNotificationProps {
  recipientId: string;
  type: NotificationType;
  content: string;
  link?: string;
  metadata?: Record<string, any>;
}

export async function createNotification({
  recipientId,
  type,
  content,
  link,
  metadata,
}: CreateNotificationProps) {
  try {
    const notificationData = {
      recipientId,
      type,
      content,
      ...(link && { link }),
      metadata: metadata || Prisma.JsonNull,
      isRead: false,
    };

    const notification = await prisma.notification.create({
      data: notificationData,
    });

    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
}

export async function markAsRead(notificationId: string) {
  try {
    await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
}

export async function markAllAsRead(userId: string) {
  try {
    await prisma.notification.updateMany({
      where: {
        recipientId: userId,
        isRead: false,
      },
      data: { isRead: true },
    });
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    throw error;
  }
}
