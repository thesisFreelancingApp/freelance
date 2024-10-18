"use server";

import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";

export async function sendMessage(receiverId: string, content: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to send a message");
  }
  console.log(
    "here ya lhoooooooooo ==================================================",
    user.id,
    receiverId,
  );

  // Find or create a chat room
  let chatRoom = await prisma.chatRoom.findFirst({
    where: {
      OR: [
        { clientId: user.id, freelancerId: receiverId },
        { clientId: receiverId, freelancerId: user.id },
      ],
    },
  });

  if (!chatRoom) {
    chatRoom = await prisma.chatRoom.create({
      data: {
        clientId: user.id,
        freelancerId: receiverId,
      },
    });
  }

  // Create the message
  const message = await prisma.message.create({
    data: {
      chatRoomId: chatRoom.id,
      senderId: user.id,
      content,
    },
  });

  // Broadcast the new message using Supabase Realtime
  await supabase.from("messages").insert({
    id: message.id,
    content: message.content,
    senderId: message.senderId,
    chatRoomId: message.chatRoomId,
    createdAt: message.createdAt,
  });

  return { message, chatRoomId: chatRoom.id };
}

export async function getMessages(chatRoomId: number) {
  return prisma.message.findMany({
    where: { chatRoomId },
    orderBy: { createdAt: "asc" },
  });
}

export async function getOrCreateChatRoom(receiverId: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to access chat rooms");
  }

  let chatRoom = await prisma.chatRoom.findFirst({
    where: {
      OR: [
        { clientId: user.id, freelancerId: receiverId },
        { clientId: receiverId, freelancerId: user.id },
      ],
    },
  });

  if (!chatRoom) {
    chatRoom = await prisma.chatRoom.create({
      data: {
        clientId: user.id,
        freelancerId: receiverId,
      },
    });
  }

  return chatRoom.id;
}
