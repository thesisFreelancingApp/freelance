// "use server";
// import prisma from "@/lib/prismaClient";

// export type UsersType = {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   lastLogin: string | null;
//   status: string;
// };

// export const getUsersData = async () => {
//   const THIRTY_DAYS_AGO = new Date(
//     new Date().setDate(new Date().getDate() - 30),
//   );

//   try {
//     const users = await prisma.authUser.findMany({
//       select: {
//         id: true,
//         profile: {
//           select: {
//             firstName: true,
//           },
//         },
//         email: true,
//         role: true,
//         sessionLogs: {
//           select: {
//             loginAt: true,
//           },
//           orderBy: {
//             loginAt: "desc",
//           },
//           take: 1,
//         },
//       },
//     });

//     const formattedUsers = users.map((user) => {
//       const lastLogin = user.sessionLogs[0]?.loginAt || null;
//       const formatedlastLogin = user.sessionLogs[0]?.loginAt
//         ? new Intl.DateTimeFormat("en-GB", {
//             day: "2-digit",
//             month: "2-digit",
//             year: "2-digit",
//             hour: "2-digit",
//             minute: "2-digit",
//             hour12: false,
//           }).format(user.sessionLogs[0].loginAt)
//         : null;
//       const status =
//         lastLogin && lastLogin >= THIRTY_DAYS_AGO ? "Active" : "Inactive";

//       return {
//         id: user.id,
//         name: user.profile?.firstName || "No Name",
//         email: user.email,
//         role: user.role,
//         lastLogin: formatedlastLogin,
//         status,
//       };
//     });

//     return formattedUsers;
//   } catch (error) {
//     console.error("Error fetching users data:", error);
//     return [];
//   }
// };



// server.actions/dashboard/users.action.js
"use server";
import prisma from "@/lib/prismaClient";

export type UsersType = {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string | null;
  status: string;
};

export const getUsersData = async (page = 1, limit = 10) => {
  const THIRTY_DAYS_AGO = new Date(new Date().setDate(new Date().getDate() - 30));
  const offset = (page - 1) * limit;

  try {
    const users = await prisma.authUser.findMany({
      skip: offset,
      take: limit,
      select: {
        id: true,
        profile: { select: { firstName: true } },
        email: true,
        role: true,
        sessionLogs: {
          select: { loginAt: true },
          orderBy: { loginAt: "desc" },
          take: 1,
        },
      },
    });

    const totalUsers = await prisma.authUser.count();
    const totalPages = Math.ceil(totalUsers / limit);

    const formattedUsers = users.map((user) => {
      const lastLogin = user.sessionLogs[0]?.loginAt || null;
      const formattedLastLogin = user.sessionLogs[0]?.loginAt
        ? new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }).format(user.sessionLogs[0].loginAt)
        : null;
      const status = lastLogin && lastLogin >= THIRTY_DAYS_AGO ? "Active" : "Inactive";

      return {
        id: user.id,
        name: user.profile?.firstName || "No Name",
        email: user.email,
        role: user.role,
        lastLogin: formattedLastLogin,
        status,
      };
    });

    return { users: formattedUsers, totalPages };
  } catch (error) {
    console.error("Error fetching users data:", error);
    return { users: [], totalPages: 1 };
  }
};
