import { decodeHelper } from "@/hooks/use-Url";
import { useSearchParams } from "next/navigation";

const SubCategoryPage = ({
  params,
}: {
  params: { dynamicCategory: string; subCategory: string };
}) => {
  // console.log(params);

  const dynamic = params.dynamicCategory;
  const sub = params.subCategory;
  console.log(decodeHelper(dynamic));
  return (
    <div>
      <h1>Main Category Page</h1>
      <p>Main Category: {decodeHelper(dynamic)}</p>
    </div>
  );
};

export default SubCategoryPage;
