"use client";

import { ColumnDefinition } from "../types/table";

export const tableColumns: ColumnDefinition[] = [
  {
    key: "header1",
    header: "HEADER 1",
    render: (value: string) => (
      <div className="whitespace-nowrap flex justify-start w-full">{value}</div> // show line breaks
    ),
  },
  {
    key: "header2",
    header: "HEADER 2",
  },
  {
    key: "date",
    header: "DATE",
    render: (value: Date) => {
      const dateStr = new Date(value).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
      });

      return (
        <div className="w-fit whitespace-nowrap">
          {dateStr.replaceAll(" ", "-")}
        </div>
      );
    },
  },
  {
    key: "header3",
    header: "HEADER 3",
    render: (value: string) => (
      <div className="whitespace-pre-line">{value}</div> // show line breaks
    ),
  },
  {
    key: "type",
    header: "TYPE",
    render: (value: string) => {
      const typeColorMap: Record<string, string> = {
        I: "bg-zinc-700",
        O: "bg-zinc-500",
        M: "bg-zinc-300",
      };
      return (
        <span
          className={`text-white px-3 py-1.5 rounded-full inline-block text-center w-32 ${
            typeColorMap[value] || "bg-gray-500"
          }`}
        >
          {value}
        </span>
      );
    },
  },
  {
    key: "number",
    header: "NUMBER(Unit)",
    render: (value: number) => (
      <h1 className="w-full flex justify-end">{value}</h1>
    ),
  },
  {
    key: "action",
    header: "ACTION",
    render: (_, row) => (
      <a
        className="text-zinc-700 text-xs font-semibold underline cursor-pointer"
        onClick={() => alert(`Row ${row.id} clicked`)}
      >
        CLICK
      </a>
    ),
  },
];
