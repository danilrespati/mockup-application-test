import React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const Table = ({ id, dataArr: data, headerMap }) => {
  const columns = [];
  for (const [key, value] of Object.entries(headerMap)) {
    columns.push({
      accessorKey: key,
      header: value,
      cell: (props) => <p>{props.getValue()}</p>,
    });
  }
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  // console.log(table.getRowModel());
  return (
    <table id={id}>
      <thead>
        <tr>
          {table.getHeaderGroups()[0].headers.map((header) => {
            return <th key={header.id}>{header.column.columnDef.header}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => {
          return (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
