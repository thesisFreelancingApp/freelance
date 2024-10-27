import { Label } from "@/components/ui/label";
import { Category, SubCategory } from "@/types";

interface CategorySelectionProps {
  categories: Category[];
  selectedCategory: {
    main: Category | null;
    sub: SubCategory | null;
    child: SubCategory | null;
  };
  setSelectedCategory: (category: {
    main: Category | null;
    sub: SubCategory | null;
    child: SubCategory | null;
  }) => void;
}

export default function CategorySelection({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategorySelectionProps) {
  const handleMainCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const mainCategory =
      categories.find((cat) => cat.name === e.target.value) || null;
    setSelectedCategory({ main: mainCategory, sub: null, child: null });
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!selectedCategory.main) return;
    const subCategory =
      selectedCategory.main.children.find(
        (subCat) => subCat.name === e.target.value,
      ) || null;
    setSelectedCategory({
      main: selectedCategory.main,
      sub: subCategory,
      child: null,
    });
  };

  const handleChildCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (!selectedCategory.sub) return;
    const childCategory =
      selectedCategory.sub.children?.find(
        (childCat) => childCat.name === e.target.value,
      ) || null;
    setSelectedCategory({
      main: selectedCategory.main,
      sub: selectedCategory.sub,
      child: childCategory,
    });
  };

  return (
    <div>
      {/* Sélection de la catégorie principale */}
      <Label>Main Category</Label>
      <select
        value={selectedCategory.main?.name || ""}
        onChange={handleMainCategoryChange}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Main Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Sélection de la sous-catégorie */}
      {selectedCategory.main && selectedCategory.main.children && (
        <>
          <Label>Sub Category</Label>
          <select
            value={selectedCategory.sub?.name || ""}
            onChange={handleSubCategoryChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Sub Category</option>
            {selectedCategory.main.children.map((subCat) => (
              <option key={subCat.id} value={subCat.name}>
                {subCat.name}
              </option>
            ))}
          </select>
        </>
      )}

      {/* Sélection de la catégorie enfant */}
      {selectedCategory.sub && selectedCategory.sub.children && (
        <>
          <Label>Child Category</Label>
          <select
            value={selectedCategory.child?.name || ""}
            onChange={handleChildCategoryChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Child Category</option>
            {selectedCategory.sub.children.map((childCat) => (
              <option key={childCat.id} value={childCat.name}>
                {childCat.name}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}
