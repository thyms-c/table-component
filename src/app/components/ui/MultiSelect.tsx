"use client";

import { useState, useRef, useEffect } from "react";
import { ListFilter, Check } from "lucide-react";
import { Button } from "./Button";

type FilterOption = {
  value: string;
  label: string;
};

type MultiSelectFilterProps = {
  label: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
};

export function MultiSelectFilter({
  label,
  options,
  selectedValues = [],
  onChange,
}: MultiSelectFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localSelected, setLocalSelected] = useState<string[]>(selectedValues);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const toggleOption = (value: string) => {
    setLocalSelected((prev) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const applyFilters = () => {
    onChange(localSelected);
    setIsOpen(false);
  };

  const clearFilters = () => {
    setLocalSelected([]);
  };

  const hasSelectedValues = localSelected.length > 0;
  const selectedCount = localSelected.length;

  return (
    <div className="relative" ref={dropdownRef}>
      <Button variant="primary" onClick={() => setIsOpen(!isOpen)}>
        <ListFilter className="h-4 w-4 mr-1" />
        Filter
        {selectedCount > 0 && (
          <span className="ml-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-rose-500 text-xs font-medium text-white">
            {selectedCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-64 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-2">
            <div className="py-1 px-2 text-sm font-medium text-gray-700 border-b border-gray-200 mb-2 flex justify-between items-center">
              <span>{label}</span>
              {hasSelectedValues && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="max-h-60 overflow-auto">
              {options.map((option) => {
                const isSelected = localSelected.includes(option.value);
                return (
                  <div
                    key={option.value}
                    className="flex items-center px-2 py-1.5 hover:bg-gray-100 rounded-md cursor-pointer"
                    onClick={() => toggleOption(option.value)}
                  >
                    <div
                      className={`h-4 w-4 rounded border flex items-center justify-center ${
                        isSelected
                          ? "bg-gray-800 border-gray-800 text-white"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                    <span className="ml-2 text-sm text-gray-700">
                      {option.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="pt-2 mt-2 border-t border-gray-200 flex justify-end">
              <button
                type="button"
                onClick={applyFilters}
                className="text-xs bg-gray-800 text-white px-3 py-1.5 rounded hover:bg-gray-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
