import { LevelFriend } from "@/interface/LevelFriend";
import { levels } from "@/lib/seacreatures";
import DropIcon from "@/assets/svg/dropIcon.svg?react";
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
import { displayMinimizedNumbers } from "@/lib/utils";

interface DataTableProps<TData> {
  data: TData[];
}

const columns: ColumnDef<LevelFriend>[] = [
  {
    accessorKey: "level",
    header: "Level",
    cell: ({ row }) => {
      const levelData = levels.filter(
        (level) => level.name === row.original.level
      );
      return (
        <div className="flex items-center gap-1">
          <div className="rounded-full w-[46px] flex items-center justify-center h-[3rem] border-white border px-1 pb-3 pt-2 bg-[#934dca]">
            <div
              className="w-full h-full bg-contain bg-center bg-[#5417b0] relative overflow-hidden mt-2"
              style={{
                maskImage: `url(${levelData[0].Fish})`,
                maskSize: "100% 100%",
                maskPosition: "center",
              }}
            ></div>
          </div>
          <h2 className="text-[10px] leading-[18px] font-bold">
            {row.original.level}
          </h2>
        </div>
      );
    },
  },
  {
    accessorKey: "friend",
    header: "For Friend",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-[2px]">
          <DropIcon className="h-4 w-4"/>
          <h2 className="text-[13px] font-extrabold leading-[18px]">
            +{displayMinimizedNumbers(row.original.friend)}
          </h2>
        </div>
      );
    },
  },
  {
    accessorKey: "premium",
    header: "Premium",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-[2px]">
          <DropIcon className="h-4 w-4"/>
          <h2 className="text-[13px] font-extrabold leading-[18px]">
            +{displayMinimizedNumbers(row.original.premium)}
          </h2>
        </div>
      );
    },
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
      <Table className="border-separate rowspacing">
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
        <TableBody className="">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="!border-none bg-[#C3C3C33D] "
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      key={cell.id}
                      className={`${
                        cell.column.id === "premium"
                          ? "!rounded-r-[11px]"
                          : cell.column.id === "level"
                          ? "rounded-l-[11px]"
                          : ""
                      } !p-[10px]`}
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
