"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ClearFiltersButton() {
  const router = useRouter();

  const handleClearFilters = () => {
    router.push(window.location.pathname);
  };

  return <Button onClick={handleClearFilters}>Clear Filters</Button>;
}
