// Ensure you are fetching the categories correctly
import prisma from "@/lib/prismaClient";

// export const getCategories = async () => {
//   const categories = await prisma.mainCategories.findMany({
//     where: { level: 1 },
//     include: {
//       children: {
//         include: {
//           children: true,
//         },
//       },
//     },
//   });

//   // Log only the first category for debugging
//   if (categories.length > 0) {
//     console.log("First Category:_________________________________________", JSON.stringify(categories[2], null, 2));
//   } else {
//     console.log("No categories found.");
//   }

//   return categories;
// };

// export const getCategories = async () => {
//   try {
//     const categories = await prisma.mainCategories.findMany({
//       where: { level: 1 },
//       include: {
//         children: {
//           include: {
//             children: true,
//           },
//         },
//       },
//     });

//     // Log the count of categories fetched and details of the third category (if exists)
//     console.log(`Categories fetched: ${categories.length}`);
//     if (categories.length > 0) {
//       console.log("Third Category Details:_________________________________________", JSON.stringify(categories[2], null, 2));
//     } else {
//       console.log("No categories found.");
//     }

//     return categories;
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     throw new Error("Could not fetch categories");
//   }
// };

// actions/categoryActions.ts

// server.actions/testCat.ts

export const getCategoryByName = async (name: string) => {
  try {
    // Replace hyphens with spaces and decode the URL-encoded name
    const decodedName = decodeURIComponent(name);
    console.log(decodedName);
    // Fetch the category by name
    const category = await prisma.mainCategories.findFirst({
      where: {
        name: {
          equals: decodedName,
          mode: "insensitive", // Case-insensitive search
        },
      },
      include: {
        children: {
          // Eager-load subcategories
          include: {
            children: true, // Eager-load sub-subcategories
          },
        },
      },
    });

    return category;
  } catch (error) {
    console.error("Error fetching category by name:", error);
    throw new Error("Could not fetch category");
  }
};

export const getSubCategoryByName = async (name: string) => {
  try {
    // Fetch the category by id
    const decodedName = decodeURIComponent(name);
    const category = await prisma.mainCategories.findFirst({
      where: {
        name: {
          equals: decodedName,
          mode: "insensitive",
        },
      },
      include: {
        children: {
          // Eager-load subcategories
          include: {
            children: true, // Eager-load sub-subcategories
          },
        },
      },
    });

    return category;
  } catch (error) {
    console.error("Error fetching category by name:", error);
    throw new Error("Could not fetch category");
  }
};
