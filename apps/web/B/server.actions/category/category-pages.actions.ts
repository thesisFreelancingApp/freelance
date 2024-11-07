import prisma from "@/lib/prismaClient";

export const getCategoryByName = async (slug: string) => {
  try {
    // Find category by slug instead of name
    const category = await prisma.mainCategories.findFirst({
      where: {
        slug: slug,
      },
      include: {
        children: {
          include: {
            children: true,
            services: {
              take: 4,
              include: {
                ratings: true,
              },
            },
          },
        },
      },
    });

    if (!category) {
      console.log(`No category found for slug: ${slug}`);
      return null;
    }

    console.log(`Found category: ${category.name}`);
    return category;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw new Error("Failed to fetch category");
  }
};

export const getFeaturedServices = async (categoryId: number) => {
  try {
    return await prisma.service.findMany({
      where: {
        categoryId: categoryId,
      },
      take: 8,
      include: {
        ratings: true,
        creator: {
          include: {
            profile: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching featured services:", error);
    return [];
  }
};
