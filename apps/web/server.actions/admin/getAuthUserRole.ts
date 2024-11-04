// Import necessary modules and initialize Prisma
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const prisma = new PrismaClient();

// Middleware function to check if the user is an admin
async function checkAdmin(request: NextRequest) {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) return { isAdmin: false, redirect: NextResponse.redirect(new URL("/login", request.url)) };

  const authUser = await prisma.authUser.findUnique({
    where: { id: user.id },
    select: { role: true },
  });

  if (!authUser || authUser.role !== "ADMIN") {
    return { isAdmin: false, redirect: NextResponse.redirect(new URL("/", request.url)) };
  }
  return { isAdmin: true };
}

// Admin actions

// User Management
export async function getAllUsers(request: NextRequest) {
  const adminCheck = await checkAdmin(request);
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const users = await prisma.authUser.findMany();
  return NextResponse.json(users);
}

export async function updateUserRole(request: NextRequest) {
  const adminCheck = await checkAdmin(request);
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const { userId, role } = await request.json();
  const updatedUser = await prisma.authUser.update({
    where: { id: userId },
    data: { role },
  });

  return NextResponse.json(updatedUser);
}

// Account Management
export async function getAllAccounts(request: NextRequest) {
  const adminCheck = await checkAdmin(request);
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const accounts = await prisma.account.findMany();
  return NextResponse.json(accounts);
}

export async function updateAccountProvider(request: NextRequest) {
  const adminCheck = await checkAdmin(request);
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const { accountId, lastProvider } = await request.json();
  const updatedAccount = await prisma.account.update({
    where: { id: accountId },
    data: { lastProvider },
  });

  return NextResponse.json(updatedAccount);
}

// Service Management
export async function getAllServices(request: NextRequest) {
  const adminCheck = await checkAdmin(request);
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const services = await prisma.service.findMany();
  return NextResponse.json(services);
}

export async function updateServiceVisibility(request: NextRequest) {
  const adminCheck = await checkAdmin(request);
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const { serviceId, isPublic } = await request.json();
  const updatedService = await prisma.service.update({
    where: { id: serviceId },
    data: { isPublic },
  });

  return NextResponse.json(updatedService);
}

// Wallet Management
export async function getAllWallets(request: NextRequest) {
  const adminCheck = await checkAdmin(request);
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const wallets = await prisma.wallet.findMany();
  return NextResponse.json(wallets);
}

export async function updateWalletBalance(request: NextRequest) {
  const adminCheck = await checkAdmin(request);
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const { walletId, balance } = await request.json();
  const updatedWallet = await prisma.wallet.update({
    where: { id: walletId },
    data: { balance },
  });

  return NextResponse.json(updatedWallet);
}

// Transaction Management
export async function getAllTransactions(request: NextRequest) {
  const adminCheck = await checkAdmin(request);
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const transactions = await prisma.walletTransaction.findMany();
  return NextResponse.json(transactions);
}

export async function updateTransactionDescription(request: NextRequest) {
  const adminCheck = await checkAdmin(request);
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const { transactionId, description } = await request.json();
  const updatedTransaction = await prisma.walletTransaction.update({
    where: { id: transactionId },
    data: { description },
  });

  return NextResponse.json(updatedTransaction);
}

// Order Management
export async function getAllOrders(request: NextRequest) {
  const adminCheck = await checkAdmin(request);
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const orders = await prisma.order.findMany();
  return NextResponse.json(orders);
}

export async function updateOrderStatus(request: NextRequest) {
  const adminCheck = await checkAdmin(request);
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const { orderId, status } = await request.json();
  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });

  return NextResponse.json(updatedOrder);
}

// Notification Management
export async function getAllNotifications(request: NextRequest) {
  const adminCheck = await checkAdmin(request);
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const notifications = await prisma.notification.findMany();
  return NextResponse.json(notifications);
}

export async function markNotificationAsRead(request: NextRequest) {
  const adminCheck = await checkAdmin(request);
  if (!adminCheck.isAdmin) return adminCheck.redirect;

  const { notificationId } = await request.json();
  const updatedNotification = await prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true },
  });

  return NextResponse.json(updatedNotification);
}

// Additional actions can be added similarly for models like `Message`, `Dispute`, etc.
