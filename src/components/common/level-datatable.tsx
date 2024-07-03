import { LevelFriend } from "@/interface/LevelFriend";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData> {
  data: TData[];
}

const columns: ColumnDef<LevelFriend>[] = [
  {
    accessorKey: "level",
    header: "Level",
    cell: () => {
      return <div></div>;
    },
  },
  {
    accessorKey: "friend",
    header: "For Friend",
  },
  {
    accessorKey: "premium",
    header: "Premium",
  },
];

export function LevelDatable<TData, TValue>({ data }: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns: columns as unknown as ColumnDef<TData, TValue>[],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full px-6">
      <Table>
        <TableHeader className="*:border-none">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="font-extrabold text-[13px] text-white"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="!border-none !pb-10 bg-[#C3C3C33D]"
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      key={cell.id}
                      className={
                       `${
                        cell.column.id === "premium"
                        ? "!rounded-r-[11px]"
                        : cell.column.id === "level"
                        ? "rounded-l-[11px]"
                        : ""
                       } `
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
