# 📊 Custom Table Component (with Next.js)

A fully custom, reusable **Table Component** built using **Next.js** and **TypeScript**, without relying on any UI library.  
Includes features like searching, filtering, sorting, pagination, loading state, and role-based column visibility.

---

## ⚙️ Props Overview

| Prop             | Type                                                   | Description                                         |
|------------------|--------------------------------------------------------|-----------------------------------------------------|
| `data`           | `DataType[]`                                           | Table data                                          |
| `columns`        | `ColumnDefinition[]`                                   | Column configs (with role visibility support)       |
| `nullValue`      | `string`                                               | Value to display for nulls (default: `-`)           |
| `isShowTableBar` | `boolean`                                              | Show top bar (search/filter/sort controls)         |
| `isShowIndex`    | `boolean`                                              | Show index (row number)                            |
| `isLoading`      | `boolean`                                              | Show loading state                                 |
| `searchOptions`  | `SearchOption[]`                                       | Fields available for searching                     |
| `filterOptions`  | `FilterOption[]`                                       | Filter definitions by field                        |
| `sortOptions`    | `SortOption[]`                                         | Sortable fields                                    |
| `currentPage`    | `number`                                               | Current page number                                |
| `totalItems`     | `number`                                               | Total items (for pagination)                       |
| `itemsPerPage`   | `number`                                               | Items per page                                     |
| `userRole`       | `string`                                               | Current user's role                                |
| `onApplyFilter`  | `(filters: Record<string, string[]>) => void`          | Filter callback                                     |
| `onApplySort`    | `(key: string, direction: "asc" \| "desc")=> void`     | Sort callback                                       |
| `onClickRow`     | `(record: any) => void`                                | Row click handler                                   |
| `onChangePage`   | `(page: number) => void`                               | Page change handler                                 |
| `onSearch`       | `(query: string, field?: string) => void`              | Search handler                                      |
| `onLoadData`     | `() => void`                                           | Manual reload trigger                               |
| `filters`        | `Record<string, string[]>`                             | Current applied filters                             |

---

## 🧪 Example Usage

```tsx
 <TableComponent
          data={data}
          columns={columns}
          nullValue="-"
          isShowTableBar
          isShowIndex
          isLoading={false}
          searchOptions={[{ key: "Name", label: "name" }]}
          filterOptions={[{
            key: "status", label: "status",
            options: [{ value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },],},]}
          sortOptions={[{ key: "createdAt", label: "Created At" }]}
          currentPage={1}
          totalItems={50}
          itemsPerPage={10}
          userRole="Admin"
          onApplyFilter={handleFilter}
          onApplySort={handleSort}
          onClickRow={handleRowClick}
          onChangePage={handlePageChange}
          onSearch={handleSearch}
        />
```

## ▶️ Getting Started (Next.js)

1. Clone the Repo
```bash
git clone https://github.com/thyms-c/table-component.git
cd table-component
```

2. Install Dependencies
```bash
pnpm install
```
3. Run Dev Server
```bash
pnpm run dev
```
Open your browser at http://localhost:3000
