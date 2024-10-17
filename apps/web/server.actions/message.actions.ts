"use server";

import prisma from "@/lib/prismaClient";
import { createClient } from "@/utils/supabase/server";

export async function sendMessage(receiverId: string, content: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to send a message");
  }

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

  return message;
}
