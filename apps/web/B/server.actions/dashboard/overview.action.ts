"use server";
import prisma from "@/lib/prismaClient";
import { Prisma } from "@prisma/client";

type DisputeWithRelations = Prisma.DisputeGetPayload<{
  include: {
    service: true;
    project: true;
    initiatorSeller: {
      include: {
        profile: true;
      };
    };
    initiatorBuyer: {
      include: {
        profile: true;
      };
    };
  };
}>;

export type OverviewStats = {
  totalRevenue: number;
  totalServices: number;
  activeOrders: number;
  pendingOrders: number;
  completedOrders: number;
  activeUsersCount: number;
  disputesCount: number;
  disputes: DisputeWithRelations[];
  activeUsersPercentageChange: number;
  totalRevenuePercentageChange: number;
  totalServicesPercentageChange: number;
  activeDisputesPercentageChange: number;
};

export type MonthlyRevenue = {
  name: string;
  total: number;
};

const THIRTY_DAYS_AGO = new Date(new Date().setDate(new Date().getDate() - 30));
const SIXTY_DAYS_AGO = new Date(new Date().setDate(new Date().getDate() - 60));

function calculatePercentageChange(previous: number, current: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

const getMonthlyPercentageChanges = async () => {
  try {
    const activeUsersCountCurrent = await prisma.authUser.count({
      where: { sessionLogs: { some: { loginAt: { gte: THIRTY_DAYS_AGO } } } },
    });
    const totalRevenueCurrent = await prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { status: "COMPLETED", createdAt: { gte: THIRTY_DAYS_AGO } },
    });
    const totalServicesCurrent = await prisma.service.count({
      where: { createdAt: { gte: THIRTY_DAYS_AGO } },
    });
    const activeDisputesCountCurrent = await prisma.dispute.count({
      where: { createdAt: { gte: THIRTY_DAYS_AGO } },
    });

    const activeUsersCountPrevious = await prisma.authUser.count({
      where: {
        sessionLogs: {
          some: {
            loginAt: { gte: SIXTY_DAYS_AGO, lt: THIRTY_DAYS_AGO },
          },
        },
      },
    });
    const totalRevenuePrevious = await prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: {
        status: "COMPLETED",
        createdAt: { gte: SIXTY_DAYS_AGO, lt: THIRTY_DAYS_AGO },
      },
    });
    const totalServicesPrevious = await prisma.service.count({
      where: { createdAt: { gte: SIXTY_DAYS_AGO, lt: THIRTY_DAYS_AGO } },
    });
    const activeDisputesCountPrevious = await prisma.dispute.count({
      where: { createdAt: { gte: SIXTY_DAYS_AGO, lt: THIRTY_DAYS_AGO } },
    });

    return {
      activeUsersPercentageChange: calculatePercentageChange(
        activeUsersCountPrevious,
        activeUsersCountCurrent,
      ),
      totalRevenuePercentageChange: calculatePercentageChange(
        (totalRevenuePrevious._sum.totalAmount as any) || 0,
        (totalRevenueCurrent._sum.totalAmount as any) || 0,
      ),
      totalServicesPercentageChange: calculatePercentageChange(
        totalServicesPrevious,
        totalServicesCurrent,
      ),
      activeDisputesPercentageChange: calculatePercentageChange(
        activeDisputesCountPrevious,
        activeDisputesCountCurrent,
      ),
    };
  } catch (error) {
    console.error("Failed to calculate percentage changes:", error);
    return {
      activeUsersPercentageChange: 0,
      totalRevenuePercentageChange: 0,
      totalServicesPercentageChange: 0,
      activeDisputesPercentageChange: 0,
    };
  }
};

export const getStats = async () => {
  try {
    const activeUsersCount = await prisma.authUser.count({
      where: {
        sessionLogs: {
          some: {
            loginAt: {
              gte: THIRTY_DAYS_AGO,
            },
          },
        },
      },
    });

    const totalRevenue = await prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        status: "COMPLETED",
      },
    });

    const totalServices = await prisma.service.count();

    const activeOrders = await prisma.order.count({
      where: {
        status: "IN_PROGRESS",
      },
    });

    const pendingOrders = await prisma.order.count({
      where: {
        status: "PENDING",
      },
    });

    const completedOrders = await prisma.order.count({
      where: {
        status: "COMPLETED",
      },
    });

    const disputes = await prisma.dispute.findMany({
      include: {
        service: true,
        project: true,
        initiatorSeller: {
          include: {
            profile: true,
          },
        },
        initiatorBuyer: {
          include: {
            profile: true,
          },
        },
      },
    });

    const percentageChanges = await getMonthlyPercentageChanges();

    const stats: OverviewStats = {
      totalRevenue: (totalRevenue._sum.totalAmount as any) || 0,
      totalServices,
      activeOrders,
      pendingOrders,
      completedOrders,
      activeUsersCount,
      disputesCount: disputes.length,
      disputes,
      ...percentageChanges,
    };

    return stats;
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return {
      totalRevenue: 0,
      totalServices: 0,
      activeOrders: 0,
      pendingOrders: 0,
      completedOrders: 0,
      activeUsersCount: 0,
      disputesCount: 0,
      disputes: [],
      activeUsersPercentageChange: 0,
      totalRevenuePercentageChange: 0,
      totalServicesPercentageChange: 0,
      activeDisputesPercentageChange: 0,
    };
  }
};

export const getMonthlyRevenue = async () => {
  const revenueData = await prisma.order.groupBy({
    by: ["createdAt"],
    where: { status: "ACCEPTED" },
    _sum: {
      totalAmount: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const analyticsData: MonthlyRevenue[] = revenueData.map((entry) => {
    const date = new Date(entry.createdAt);
    const monthName = date.toLocaleString("default", { month: "long" });
    return {
      name: monthName,
      total: (entry._sum.totalAmount as any) || 0,
    };
  });

  return analyticsData;
};
