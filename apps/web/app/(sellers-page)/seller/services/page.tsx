import MultiStepFormPage from "@/app/pages/sellers/create-service";
import { getAllCategories } from "@/server.actions/category/category.actions";

export default async function Services() {
  const categories = await getAllCategories();
  return <MultiStepFormPage categories={categories} />;
}
