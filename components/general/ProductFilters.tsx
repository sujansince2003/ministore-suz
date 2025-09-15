"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import debounce from "lodash/debounce";

interface ProductFiltersProps {
  categories: string[];
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  search: string;
  categories: string[];
  minPrice: number;
  maxPrice: number;
  sortBy: string;
}

export function ProductFilters({
  categories,
  onFilterChange,
}: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    categories: [],
    minPrice: 0,
    maxPrice: 1000,
    sortBy: "",
  });

  const debouncedSearch = debounce((value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  }, 300);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <Label>Search</Label>
        <Input
          placeholder="Search products..."
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>

      <div>
        <Label>Categories</Label>
        <div className="space-y-2 mt-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) => {
                  setFilters((prev) => ({
                    ...prev,
                    categories: checked
                      ? [...prev.categories, category]
                      : prev.categories.filter((c) => c !== category),
                  }));
                }}
              />
              <Label htmlFor={category} className="capitalize">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Price Range</Label>
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                minPrice: Number(e.target.value),
              }))
            }
          />
          <span>-</span>
          <Input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                maxPrice: Number(e.target.value),
              }))
            }
          />
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <Label>Sort By</Label>
        <Select
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, sortBy: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort by price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low-to-high">Price: Low to High</SelectItem>
            <SelectItem value="high-to-low">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
