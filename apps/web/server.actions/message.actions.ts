"use server";

import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";

export async function sendMessage(receiverId: string, content: string) {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in to send a message");
  }
      
  try {
    // Check for an existing ChatRoom between the users
    let chatRoom = await prisma.chatRoom.findFirst({
      where: {
        AND: [
          {
            participants: {
              some: {
                participantId: user.id,
              },
            },
          },
          {
            participants: {
              some: {
                participantId: receiverId,
              },
            },
          },
        ],
      },
    });

    // If no ChatRoom exists, create a new one
    if (!chatRoom) {
      chatRoom = await prisma.chatRoom.create({
        data: {
          participants: {
            create: [
              { participantId: user.id, role: "user" },
              { participantId: receiverId, role: "user" },
            ],
          },
        },
      });
    }

    // Create the message with more included data
    const message = await prisma.message.create({
      data: {
        chatRoomId: chatRoom.id,
        senderId: user.id,
        content,
        isRead: false,
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profilePic: true,
          },
        },
        chatRoom: {
          include: {
            participants: {
              include: {
                profile: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    profilePic: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // Update the chatRoom's updatedAt
    await prisma.chatRoom.update({
      where: { id: chatRoom.id },
      data: { updatedAt: new Date() },
    });

    return message;
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error("Failed to send message");
  }
}

export async function getMessages(
  chatRoomId: string,
  page: number = 1,
  pageSize: number = 20,
) {
  const skip = (page - 1) * pageSize;

  const [messages, totalCount] = await Promise.all([
    prisma.message.findMany({
      where: { chatRoomId },
      orderBy: { createdAt: "desc" },
      take: pageSize,
      skip,
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profilePic: true,
          },
        },
      },
    }),
    prisma.message.count({
      where: { chatRoomId },
    }),
  ]);

  return {
    messages: messages.reverse(),
    hasMore: skip + pageSize < totalCount,
    totalCount,
  };
}

export async function getAllChatRooms() {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const chatRooms = await prisma.chatRoom.findMany({
    where: {
      participants: {
        some: {
          participantId: user.id,
        },
      },
    },
    orderBy: { updatedAt: "desc" },
    include: {
      participants: {
        include: {
          profile: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profilePic: true,
            },
          },
        },
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  return chatRooms.map((room) => {
    const otherParticipant = room.participants.find(
      (p) => p.participantId !== user.id,
    )?.profile;

    return {
      id: room.id,
      otherUser: otherParticipant || null,
      lastMessage: room.messages[0] || null,
    };
  });
}

export async function getRecentMessages() {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const recentChatRooms = await prisma.chatRoom.findMany({
    where: {
      participants: {
        some: {
          participantId: user.id,
        },
      },
    },
    orderBy: { updatedAt: "desc" },
    take: 5,
    include: {
      participants: {
        include: {
          profile: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profilePic: true,
            },
          },
        },
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        include: {
          sender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profilePic: true,
            },
          },
        },
      },
    },
  });

  // Get unread count in a separate query for accuracy
  const unreadCount = await prisma.message.count({
    where: {
      chatRoom: {
        participants: {
          some: {
            participantId: user.id,
          },
        },
      },
      NOT: { senderId: user.id },
      isRead: false,
    },
  });

  const recentMessages = recentChatRooms
    .map((chatRoom) => {
      const message = chatRoom.messages[0];
      const otherParticipant = chatRoom.participants.find(
        (p) => p.participantId !== user.id,
      )?.profile;

      if (!message || !otherParticipant) return null;

      return {
        id: message.id,
        content: message.content,
        createdAt: message.createdAt,
        isRead: message.isRead,
        sender: message.sender,
        otherUser: otherParticipant,
      };
    })
    .filter((msg): msg is NonNullable<typeof msg> => msg !== null);

  return {
    messages: recentMessages,
    unreadCount,
  };
}

export async function markMessagesAsRead(chatRoomId: string) {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  try {
    const messages = await prisma.message.updateMany({
      where: {
        chatRoomId,
        NOT: { senderId: user.id },
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    // If any messages were updated, update the chat room's updatedAt
    if (messages.count > 0) {
      await prisma.chatRoom.update({
        where: { id: chatRoomId },
        data: { updatedAt: new Date() },
      });
    }

    return messages;
  } catch (error) {
    console.error("Error marking messages as read:", error);
    throw new Error("Failed to mark messages as read");
  }
}
