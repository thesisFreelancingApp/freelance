import { decodeHelper } from "@/hooks/use-Url";

import DynamicBreadc from "@/components/ui/breadcrumpDyn";
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
    <>
      <DynamicBreadc />
      <div>
        <h1>Sub-Category Page</h1>
        <p>Main Category: {decodeHelper(dynamic)}</p>
        <p>Sub Category: {decodeHelper(sub)}</p>
      </div>
    </>
  );
};

export default SubCategoryPage;
