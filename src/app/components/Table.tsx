"use client";

import { Key, useState } from "react";
import {
  ColumnDefinition,
  FilterOption,
  SearchOption,
  SortOption,
} from "../types/table";
import TableHeadBar from "./TableBar";
import { Button } from "./ui/Button";
import {
  ChevronLeft,
  ChevronRight,
  ArrowDownUp,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { DataType } from "../types/data";

interface TableComponentProps {
  data: DataType[];
  columns: ColumnDefinition[];
  nullValue?: string;
  isShowTableBar?: boolean;
  isShowIndex?: boolean;
  isLoading?: boolean;
  searchOptions?: SearchOption[];
  filterOptions?: FilterOption[];
  sortOptions?: SortOption[];
  currentPage?: number;
  totalItems?: number;
  itemsPerPage?: number;
  userRole?: string;
  onApplyFilter?: (filters: Record<string, string[]>) => void;
  onApplySort?: (key: string, direction: "asc" | "desc") => void;
  onClickRow?: (record: any) => void;
  onChangePage?: (page: number) => void;
  onSearch?: (query: string, field?: string) => void;
  onLoadData?: () => void;
  filters?: Record<string, string[]>;
}

export default function TableComponent({
  data = [],
  columns = [],
  nullValue = "-",
  isShowTableBar = false,
  isShowIndex = false,
  isLoading = false,
  searchOptions = [],
  filterOptions = [],
  sortOptions = [],
  currentPage = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onApplyFilter,
  onApplySort,
  onClickRow,
  onChangePage,
  onSearch,
  filters = {},
}: TableComponentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState<string | undefined>(
    searchOptions.length > 0 ? searchOptions[0].key : undefined
  );
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>(
    {}
  );

  const renderCellContent = (record: any, column: ColumnDefinition) => {
    const value = record[column.key];

    if (value === null) {
      return nullValue;
    }

    if (column.render) {
      return column.render(value, record);
    }

    return value;
  };

  const handleSort = (key: string) => {
    const newDirection =
      sortKey === key && sortDirection === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortDirection(newDirection);
    if (onApplySort) {
      onApplySort(key, newDirection);
    }
  };

  const handleFilterChange = (key: string, values: string[]) => {
    const newFilters = { ...activeFilters, [key]: values };

    // Remove empty arrays to keep the filters object clean
    if (values.length === 0) {
      delete newFilters[key];
    }

    setActiveFilters(newFilters);
    if (onApplyFilter) {
      onApplyFilter(newFilters);
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery, searchField);
    }
  };

  return (
    <div className="overflow-x-auto w-[1150] mt-18 min-h-screen">
      {isShowTableBar && (
        <TableHeadBar
          filterOptions={filterOptions}
          searchOptions={searchOptions}
          totalItems={totalItems}
          onFilterChange={handleFilterChange}
          selectedFilterValues={filters}
          onSearch={handleSearch}
          selectedSearchOption={searchField || searchOptions[0].key}
          searchQuery={searchQuery}
          onSearchOptionChange={setSearchField}
          onSearchQueryChange={setSearchQuery}
        />
      )}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {isShowIndex && (
              <th className="px-4 py-2  bg-zinc-200 text-zinc-500 text-sm w-16 border-2 border-t-1 border-zinc-200">
                #
              </th>
            )}

            {columns.map((column) => (
              <th
                key={column.key as Key}
                className="px-4 py-2 bg-zinc-200  text-zinc-500 text-sm border-l border-t border-r border-2 border-zinc-200"
              >
                <div className="flex items-center justify-center gap-1">
                  <span>{column.header}</span>

                  {sortOptions.some((option) => option.key === column.key) && (
                    <button
                      onClick={() => handleSort(column.key as string)}
                      className="ml-1 focus:outline-none"
                    >
                      {sortKey === column.key ? (
                        sortDirection === "asc" ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : (
                          <ArrowDown className="h-4 w-4" />
                        )
                      ) : (
                        <div className="h-4 w-4 opacity-50">
                          <ArrowDownUp className="h-4 w-4" />
                        </div>
                      )}
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td
                colSpan={isShowIndex ? columns.length + 1 : columns.length}
                className="px-6 py-4 text-center text-gray-500"
              >
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={isShowIndex ? columns.length + 1 : columns.length}
                className="px-6 py-4 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((record, index) => (
              <tr
                key={index}
                className={`border-t border-gray-200 bg-white hover:bg-gray-50`}
              >
                {isShowIndex && (
                  <td
                    className={`px-6 py-4 text-gray-800 font-semibold text-sm border-zinc-100 border-2  ${
                      index % 2 === 0 ? "bg-zinc-50" : "bg-white"
                    }`}
                  >
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                )}

                {columns.map((column) => (
                  <td
                    key={column.key as Key}
                    onClick={() => onClickRow && onClickRow(record)}
                    className={`px-6 py-4 text-sm text-gray-900 font-medium border-zinc-100 border-2 ${
                      index % 2 === 0 ? "bg-zinc-50" : "bg-white"
                    }`}
                  >
                    {renderCellContent(record, column)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, totalItems)}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </div>

          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onChangePage && onChangePage(currentPage - 1)}
              disabled={currentPage === 1}
              leftIcon={<ChevronLeft className="h-4 w-4" />}
            >
              Previous
            </Button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum = currentPage;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <Button
                  key={i}
                  variant={currentPage === pageNum ? "primary" : "outline"}
                  size="sm"
                  onClick={() => onChangePage && onChangePage(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}

            <Button
              variant="outline"
              size="sm"
              onClick={() => onChangePage && onChangePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              rightIcon={<ChevronRight className="h-4 w-4" />}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
