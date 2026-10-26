export interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 5, columns = 6 }: TableSkeletonProps) {
  const middleColsCount = Math.max(0, columns - 3);

  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="animate-pulse border-b border-slate-100 last:border-b-0">
          <td className="py-4 px-6 align-middle">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0" />
              <div className="h-4 w-28 bg-slate-200 rounded-md" />
            </div>
          </td>

          {Array.from({ length: middleColsCount }).map((_, colIndex) => (
            <td key={colIndex} className="py-4 px-6 align-middle">
              <div
                className={`h-4 bg-slate-200 rounded-md ${
                  colIndex % 2 === 0 ? "w-36 max-w-full" : "w-28 max-w-full"
                }`}
              />
            </td>
          ))}

          {columns >= 2 && (
            <td className="py-4 px-6 text-center align-middle">
              <div className="h-6 w-16 bg-slate-200 rounded-md mx-auto" />
            </td>
          )}

          {columns >= 3 && (
            <td className="py-4 px-6 text-center align-middle">
              <div className="flex items-center justify-center gap-2">
                <div className="h-7 w-14 bg-slate-200 rounded-lg" />
                <div className="h-7 w-18 bg-slate-200 rounded-lg" />
              </div>
            </td>
          )}
        </tr>
      ))}
    </>
  );
}

export default TableSkeleton;
