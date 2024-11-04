"use server";
import prisma from "@/lib/prismaClient";
import { Prisma } from "@prisma/client";

export type UsersType = {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string | null;
  status: string;
};

export const getUsersData = async () => {
  const THIRTY_DAYS_AGO = new Date(
    new Date().setDate(new Date().getDate() - 30),
  );

  try {
    const users = await prisma.authUser.findMany({
      select: {
        id: true,
        profile: {
          select: {
            firstName: true,
          },
        },
        email: true,
        role: true,
        sessionLogs: {
          select: {
            loginAt: true,
          },
          orderBy: {
            loginAt: "desc",
          },
          take: 1,
        },
      },
    });

    const formattedUsers = users.map((user) => {
      const lastLogin = user.sessionLogs[0]?.loginAt || null;
      const formatedlastLogin = user.sessionLogs[0]?.loginAt
        ? new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }).format(user.sessionLogs[0].loginAt)
        : null;
      const status =
        lastLogin && lastLogin >= THIRTY_DAYS_AGO ? "Active" : "Inactive";

      return {
        id: user.id,
        name: user.profile?.firstName || "No Name",
        email: user.email,
        role: user.role,
        lastLogin: formatedlastLogin,
        status,
      };
    });

    return formattedUsers;
  } catch (error) {
    console.error("Error fetching users data:", error);
    return [];
  }
};
