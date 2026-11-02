import React, { type PropsWithChildren } from "react";
import TableSkeleton from "../loading/TableSkeleton";

export type TableHeader = string | { label: string; align?: "left" | "center" | "right" };

export interface TableProps {
  headers: TableHeader[];
  loading?: boolean;
  loadingRows?: number;
  isEmpty?: boolean;
  emptyTitle?: string;
  pagination?: React.ReactNode;
}

export function Table({
  headers,
  children,
  loading = false,
  loadingRows = 5,
  isEmpty = false,
  emptyTitle = "No records found",
  pagination,
}: PropsWithChildren<TableProps>) {
  return (
    <div className="w-full bg-white rounded-xl shadow-[0_2px_8px_rgba(15,30,60,0.04),0_0_1px_rgba(15,30,60,0.08)] border border-slate-200/80 overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[840px]">
          <thead>
            <tr className="bg-[#2d5178] text-white">
              {headers.map((header, index) => {
                const label = typeof header === "string" ? header : header.label;
                const align = typeof header === "object" ? header.align : undefined;
                const alignClass =
                  align === "center" ? "text-center": align === "right"? "text-right": "text-left";
                return (
                  <th
                    key={index}
                    className={`py-3.5 px-6 text-[11px] font-bold tracking-wider uppercase ${alignClass}`}
                  >
                    {label}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <TableSkeleton rows={loadingRows} columns={headers.length} />
            ) : isEmpty ? (
              <tr>
                <td colSpan={headers.length} className="py-12 text-center">
                  <p className="text-sm font-medium text-slate-600 m-0">
                    {emptyTitle}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 m-0">
                    Try changing your search or status filter.
                  </p>
                </td>
              </tr>
            ) : (
              children
            )}
          </tbody>
        </table>
      </div>

      {pagination}
    </div>
  );
}

export default Table;
