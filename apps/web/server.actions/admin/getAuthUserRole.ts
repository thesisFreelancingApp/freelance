
"use server"
// Import necessary modules and initialize Prisma
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const prisma = new PrismaClient();

// Helper function to check if the user is an admin
async function checkAdmin() {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { isAdmin: false, redirect: NextResponse.redirect("/login") };
  }

  const authUser = await prisma.authUser.findUnique({
    where: { id: user.id },
    select: { role: true },
  });

  if (!authUser || authUser.role !== "ADMIN") {
    return { isAdmin: false, redirect: NextResponse.redirect("/") };
  }

  return { isAdmin: true };
}

// Admin actions

// User Management
export async function getAllUsers() {
  const adminCheck = await checkAdmin();
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const users = await prisma.authUser.findMany();
  return NextResponse.json(users);
}

export async function updateUserRole({ userId, role }: { userId: string; role: string }) {
  const adminCheck = await checkAdmin();
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const updatedUser = await prisma.authUser.update({
    where: { id: userId },
    data: { role },
  });

  return NextResponse.json(updatedUser);
}

// Account Management
export async function getAllAccounts() {
  const adminCheck = await checkAdmin();
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const accounts = await prisma.account.findMany();
  return NextResponse.json(accounts);
}

export async function updateAccountProvider({ accountId, lastProvider }: { accountId: number; lastProvider: string }) {
  const adminCheck = await checkAdmin();
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const updatedAccount = await prisma.account.update({
    where: { id: accountId },
    data: { lastProvider },
  });

  return NextResponse.json(updatedAccount);
}

// Service Management
export async function getAllServices() {
  const adminCheck = await checkAdmin();
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const services = await prisma.service.findMany();
  return NextResponse.json(services);
}

export async function updateServiceVisibility({ serviceId, isPublic }: { serviceId: string; isPublic: boolean }) {
  const adminCheck = await checkAdmin();
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const updatedService = await prisma.service.update({
    where: { id: serviceId },
    data: { isPublic },
  });

  return NextResponse.json(updatedService);
}

// Wallet Management
export async function getAllWallets() {
  const adminCheck = await checkAdmin();
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const wallets = await prisma.wallet.findMany();
  return NextResponse.json(wallets);
}

export async function updateWalletBalance({ walletId, balance }: { walletId: string; balance: number }) {
  const adminCheck = await checkAdmin();
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const updatedWallet = await prisma.wallet.update({
    where: { id: walletId },
    data: { balance },
  });

  return NextResponse.json(updatedWallet);
}

// Transaction Management
export async function getAllTransactions() {
  const adminCheck = await checkAdmin();
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const transactions = await prisma.walletTransaction.findMany();
  return NextResponse.json(transactions);
}

export async function updateTransactionDescription({ transactionId, description }: { transactionId: string; description: string }) {
  const adminCheck = await checkAdmin();
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const updatedTransaction = await prisma.walletTransaction.update({
    where: { id: transactionId },
    data: { description },
  });

  return NextResponse.json(updatedTransaction);
}

// Order Management
export async function getAllOrders() {
  const adminCheck = await checkAdmin();
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const orders = await prisma.order.findMany();
  return NextResponse.json(orders);
//   return 'hello'
}

export async function updateOrderStatus({ orderId, status }: { orderId: string; status: string }) {
  const adminCheck = await checkAdmin();
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });

  return NextResponse.json(updatedOrder);
}

// Notification Management
export async function getAllNotifications() {
  const adminCheck = await checkAdmin();
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const notifications = await prisma.notification.findMany();
  return NextResponse.json(notifications);
}

export async function markNotificationAsRead({ notificationId }: { notificationId: string }) {
  const adminCheck = await checkAdmin();
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const updatedNotification = await prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true },
  });

  return NextResponse.json(updatedNotification);
}

// Additional actions can be added similarly for other models like `Message`, `Dispute`, etc.
