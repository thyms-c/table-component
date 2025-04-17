"use client";

import { Button } from "./ui/Button";
import { MultiSelectFilter } from "./ui/MultiSelect";
import { ArrowUpDown, Download } from "lucide-react";
import { SearchByDropdown } from "./ui/SearchByDropdown";
import { FilterOption, SearchOption } from "../types/table";

interface TableBarProps {
  filterOptions?: FilterOption[];
  searchOptions?: SearchOption[];
  totalItems?: number;
  onFilterChange?: (filters: string, value: string[]) => void;
  selectedFilterValues?: Record<string, string[]>;
  onSearch?: () => void;
  selectedSearchOption?: string;
  searchQuery?: string;
  onSearchOptionChange?: (key: string) => void;
  onSearchQueryChange?: (query: string) => void;
}

export default function TableBar({
  searchOptions = [],
  filterOptions = [],
  totalItems = 0,
  onFilterChange,
  selectedFilterValues = {},
  onSearch,
  selectedSearchOption = "",
  searchQuery = "",
  onSearchOptionChange,
  onSearchQueryChange,
}: TableBarProps) {
  return (
    <div className="flex w-full justify-between items-end mb-3">
      <div className="text-sm text-gray-500">{totalItems} Rows</div>

      <div className="flex gap-4 justify-end">
        {searchOptions.length > 0 && (
          <SearchByDropdown
            options={searchOptions}
            selectedOption={selectedSearchOption}
            onOptionChange={onSearchOptionChange || (() => {})}
            searchQuery={searchQuery}
            onSearchQueryChange={onSearchQueryChange ?? (() => {})}
            onSearch={onSearch ?? (() => {})}
          />
        )}

        {filterOptions.map(
          (filter) =>
            filter.options.length > 0 && (
              <MultiSelectFilter
                key={filter.key}
                label={filter.label}
                options={filter.options}
                selectedValues={selectedFilterValues[filter.key]}
                onChange={(value) => onFilterChange?.(filter.key, value)}
              />
            )
        )}

        <Button
          variant="ghost"
          leftIcon={<ArrowUpDown size={18} />}
          className="whitespace-nowrap"
          disabled
        >
          Sort By
        </Button>
        <Button variant="ghost" leftIcon={<Download size={18} />}>
          Export
        </Button>
      </div>
    </div>
  );
}
