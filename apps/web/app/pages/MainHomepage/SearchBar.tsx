"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SearchBarProps {
  placeholder: string;
}

export default function SearchBar({ placeholder }: SearchBarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    router.push(`/gigs/?query=${encodeURIComponent(searchQuery)}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full max-w-3xl px-8 mx-auto mt-4">
      <div className="relative">
        <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          className="py-6 pl-10 pr-20 text-base"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button
          className="absolute -translate-y-1/2 right-1 top-1/2"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
}
