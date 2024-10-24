"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function FilterSortBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSort = searchParams.get("sort") || "";
  const initialPriceRange = searchParams.get("priceRange") || "";

  const [sort, setSort] = useState(initialSort);
  const [priceRange, setPriceRange] = useState(initialPriceRange);

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    updateURL({ sort: e.target.value });
  };

  const handlePriceRange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceRange(e.target.value);
    updateURL({ priceRange: e.target.value });
  };

  const updateURL = (params: Record<string, string>) => {
    const searchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    });
    router.push(`${window.location.pathname}?${searchParams.toString()}`);
  };

  useEffect(() => {
    setSort(initialSort);
    setPriceRange(initialPriceRange);
  }, [initialSort, initialPriceRange]);

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <label htmlFor="sort" className="mr-2">
          Sort by:
        </label>
        <select
          id="sort"
          value={sort}
          onChange={handleSort}
          className="border rounded p-1"
        >
          <option value="">Relevance</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating_desc">Top Rated</option>
        </select>
      </div>
      <div>
        <label htmlFor="priceRange" className="mr-2">
          Price range:
        </label>
        <select
          id="priceRange"
          value={priceRange}
          onChange={handlePriceRange}
          className="border rounded p-1"
        >
          <option value="">All</option>
          <option value="0-50">$0 - $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100-500">$100 - $500</option>
          <option value="500">$500+</option>
        </select>
      </div>
    </div>
  );
}
