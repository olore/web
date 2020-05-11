import React from "react";
import { useTable, usePagination, useRowState, useSortBy } from "react-table";
import QueryPagination from "./QueryPagination";

export default function QueryTable({ t, columns, data }: any) {
  const border = { border: "1px solid rgba(0,0,0,.02)" };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }
    },
    useRowState,
    useSortBy,
    usePagination
  );

  return (
    <>
      <QueryPagination
        t={t}
        data={{
          canPreviousPage,
          canNextPage,
          pageOptions,
          gotoPage,
          nextPage,
          previousPage,
          setPageSize,
          pageIndex,
          pageSize
        }}
      />

      <table
        {...getTableProps()}
        className="table table-striped bg-white mb-4 w-100"
        style={{
          lineHeight: 1.3,
          tableLayout: "fixed"
        }}
      >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="align-middle text-center px-2 py-1"
                  style={{
                    ...border,
                    width: `${column.width}%`
                  }}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? "🔽"
                        : "🔼"
                      : " "}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="align-middle px-2 py-2"
                      style={{
                        ...border,
                        overflow: "auto"
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
