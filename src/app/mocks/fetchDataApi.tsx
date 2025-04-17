import { DataType } from "../types/data";
import { mockTableData } from "./data";

type FetchOptions = {
  page?: number;
  limit?: number;
  search?: string;
  searchField?: string;
  sortBy?: string;
  sortOrder?: string;
  filters?: Record<string, string[]>;
};

export type PaginatedResult = {
  data: DataType[];
  totalItems: number;
  totalPages: number;
};

// Simulate delay with a Promise
function delay<T>(value: T, ms: number): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// The mock fetch function
export async function fetchMockTableData({
  page = 1,
  limit = 10,
  search = "",
  searchField = "",
  sortBy = "",
  sortOrder = "",
  filters = {},
}: FetchOptions): Promise<PaginatedResult> {
  const mockResponse: DataType[] = mockTableData;

  // Search
  const searchedData = mockResponse.filter((item) => {
    if (!search) return true;

    if (searchField && searchField in item) {
      const fieldValue = item[searchField as keyof DataType];
      return String(fieldValue).toLowerCase().includes(search.toLowerCase());
    }

    // fallback: search all fields
    const values = Object.values(item);
    return values.some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    );
  });

  // Filter
  const filteredData = searchedData.filter((item) => {
    return Object.entries(filters).every(([field, allowedValues]) => {
      const itemValue = item[field as keyof DataType];
      return allowedValues.includes(String(itemValue));
    });
  });

  // Sort
  const sortedData = filteredData.sort((a, b) => {
    const aVal = a[sortBy as keyof DataType];
    const bVal = b[sortBy as keyof DataType];

    if (aVal == null) return 1;
    if (bVal == null) return -1;

    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Paginate
  const startIndex = (page - 1) * limit;
  const paginatedData = sortedData.slice(startIndex, startIndex + limit);

  const result = {
    data: paginatedData,
    totalItems: sortedData.length,
    totalPages: Math.ceil(sortedData.length / limit),
  };

  return delay(result, 500);
}
