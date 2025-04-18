"use client";

import { useCallback, useEffect, useState } from "react";
import TableComponent from "./components/Table";
import { tableColumns } from "./mocks/columns";
import { filterOptions, searchFields, sortOptions } from "./types/table";
import { fetchMockTableData } from "./mocks/fetchDataApi";

export default function Home() {
  const columns = tableColumns;

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState<string | undefined>("header3");

  const fetchTableData = useCallback(async () => {
    setLoading(true);

    try {
      const { data: fetchedData, totalItems } = await fetchMockTableData({
        page: currentPage,
        search: searchQuery,
        searchField: searchField,
        filters: filters,
        sortBy: sortConfig?.key, // fallback to a valid key
        sortOrder: sortConfig?.direction,
      });

      setData(fetchedData);
      setTotal(totalItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, sortConfig, searchQuery, searchField, filters]);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  const handleFilter = (newFilters: Record<string, string[]>) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSort = (key: string, direction: "asc" | "desc") => {
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const handleSearch = (query: string, field?: string) => {
    setSearchQuery(query);
    if (field) setSearchField(field);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowClick = (record: any) => {
    alert(`Clicked on: ${record.id}`);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] w-full items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="self-left w-full text-4xl text-rose-600 font-bold uppercase">
        Table Component
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start ">
        <TableComponent
          data={data}
          columns={columns}
          isShowIndex
          isShowTableBar
          onClickRow={handleRowClick}
          searchOptions={searchFields}
          filterOptions={filterOptions}
          sortOptions={sortOptions}
          currentPage={currentPage}
          totalItems={total}
          itemsPerPage={10}
          isLoading={loading}
          onChangePage={handlePageChange}
          onApplySort={handleSort}
          onSearch={handleSearch}
          onLoadData={fetchTableData}
          onApplyFilter={handleFilter}
          filters={filters}
        />
      </main>
    </div>
  );
}
