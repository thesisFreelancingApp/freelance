<<<<<<< HEAD
"use server";
import prisma from "@/lib/prismaClient";
import { Prisma } from "@prisma/client";
=======
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
>>>>>>> 680cc03670e2ca8a3ecc9d2cbccd622f4647352d

export type UsersType = {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string | null;
  status: string;
};

<<<<<<< HEAD
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
=======
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
>>>>>>> 680cc03670e2ca8a3ecc9d2cbccd622f4647352d
          take: 1,
        },
      },
    });

<<<<<<< HEAD
    const formattedUsers = users.map((user) => {
      const lastLogin = user.sessionLogs[0]?.loginAt || null;
      const formatedlastLogin = user.sessionLogs[0]?.loginAt
=======
    const totalUsers = await prisma.authUser.count();
    const totalPages = Math.ceil(totalUsers / limit);

    const formattedUsers = users.map((user) => {
      const lastLogin = user.sessionLogs[0]?.loginAt || null;
      const formattedLastLogin = user.sessionLogs[0]?.loginAt
>>>>>>> 680cc03670e2ca8a3ecc9d2cbccd622f4647352d
        ? new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }).format(user.sessionLogs[0].loginAt)
        : null;
<<<<<<< HEAD
      const status =
        lastLogin && lastLogin >= THIRTY_DAYS_AGO ? "Active" : "Inactive";
=======
      const status = lastLogin && lastLogin >= THIRTY_DAYS_AGO ? "Active" : "Inactive";
>>>>>>> 680cc03670e2ca8a3ecc9d2cbccd622f4647352d

      return {
        id: user.id,
        name: user.profile?.firstName || "No Name",
        email: user.email,
        role: user.role,
<<<<<<< HEAD
        lastLogin: formatedlastLogin,
=======
        lastLogin: formattedLastLogin,
>>>>>>> 680cc03670e2ca8a3ecc9d2cbccd622f4647352d
        status,
      };
    });

<<<<<<< HEAD
    return formattedUsers;
  } catch (error) {
    console.error("Error fetching users data:", error);
    return [];
=======
    return { users: formattedUsers, totalPages };
  } catch (error) {
    console.error("Error fetching users data:", error);
    return { users: [], totalPages: 1 };
>>>>>>> 680cc03670e2ca8a3ecc9d2cbccd622f4647352d
  }
};
