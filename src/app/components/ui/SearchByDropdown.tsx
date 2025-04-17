"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import { Button } from "./Button";

type SearchOption = {
  key: string;
  label: string;
};

type SearchByDropdownProps = {
  options: SearchOption[];
  selectedOption: string;
  onOptionChange: (key: string) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: () => void;
};

export function SearchByDropdown({
  options,
  selectedOption,
  onOptionChange,
  searchQuery,
  onSearchQueryChange,
  onSearch,
}: SearchByDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find the selected option label
  const selectedLabel =
    options.find((option) => option.key === selectedOption)?.label ||
    "Search By";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle Enter key in search input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="flex w-full max-w-md">
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="primary"
          size="md"
          className="rounded-r-none border-r-0"
          onClick={() => setIsOpen(!isOpen)}
          rightIcon={<ChevronDown className="h-4 w-4" />}
        >
          {selectedLabel}
        </Button>

        {isOpen && (
          <div className="absolute left-0 z-10 mt-1 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              {options.map((option) => (
                <div
                  key={option.key}
                  className={`flex cursor-pointer items-center px-4 py-2 text-sm ${
                    selectedOption === option.key
                      ? "bg-gray-100"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    onOptionChange(option.key);
                    setIsOpen(false);
                  }}
                >
                  <span className="flex-grow">{option.label}</span>
                  {selectedOption === option.key && (
                    <Check className="h-4 w-4 text-gray-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Search text"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-10 w-full rounded-md text-sm rounded-l-none border border-gray-300 pl-3 pr-10 focus:border-gray-500 focus:outline-none"
        />
        <button
          onClick={onSearch}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
