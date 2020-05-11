import React from "react";
import { useTable, usePagination, useRowState, useSortBy } from "react-table";

export default function QueryTable({ columns, data }: any) {
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
      <div className="pagination">
        <button
          style={{ width: 200 }}
          className="p-2 m-3"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </button>

        <span
          className="p-2 m-3">
          <input
            type="number"
            defaultValue={pageIndex + 1}
            className="text-center mr-1"
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "70px" }}
          />
          of {pageOptions.length}
        </span>

        <button
          style={{ width: 200 }}
          className="p-2 m-3"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </button>

        <select
          style={{ maxHeight: 25, marginTop: 15 }}
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 25, 50, 100].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

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
        <tbody {...getTableBodyProps()} >
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
                        overflow: "auto",
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
