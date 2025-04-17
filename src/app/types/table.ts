import React from "react";

 export interface ColumnDefinition<Row = any> {
    key: keyof Row | string;
    header: React.ReactNode | string;
    render?: (value: any, row?: Row) => React.ReactNode;
  }

 export type Column = {
    key: string
    title: string
    render?: (value: any, record: any) => React.ReactNode
  }
  
 export type SearchOption = {
    key: string
    label: string
  }
  
 export type FilterOption = {
    key: string
    label: string
    options: { value: string; label: string }[]
  }
  
 export type SortOption = {
    key: string
    label: string
  }

  export const searchFields = [
    { key: "header1", label: "Header 1" },
    { key: "header2", label: "Header 2" },
    { key: "header3", label: "Header 3" },
    { key: "number", label: "Number" },
  ];

  export const filterOptions = [
    {
      key: "type",
      label: "Type",
      options: [
        { value: "I", label: "I" },
        { value: "O", label: "O" },
        { value: "M", label: "M" },
      ],
    },
  ];

  export const sortOptions = [
    { key: "header1", label: "Header 1" },
    { key: "header2", label: "Header 2" },
    { key: "date", label: "Date" },
    { key: "type", label: "Type" },
    { key: "number", label: "Number(Unit)" },
  ];