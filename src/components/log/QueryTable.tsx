import React from "react";
import { useTable, usePagination, useRowState } from "react-table";

export default function QueryTable({ columns, data }: any) {
  const border = { border: "1px solid rgba(0,0,0,.02)" };

  const getHeaderProps = (props: any, { column }: any) => {
    return [
      props,
      {
        style: {
          width: `${column.width}px`,
          textAlign: "center",
          ...border
        }
      }
    ];
  };

  const getCellProps = (props: any, { cell }: any) => {
    return [
      props,
      {
        style: {
          padding: "7px 5px",
          ...border
        }
      }
    ];
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
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
    usePagination,
    useRowState,
    hooks => {
      hooks.getHeaderProps.push(getHeaderProps);
      hooks.getCellProps.push(getCellProps);
    }
  );

  return (
    <>
      <div className="pagination">
        <button
          style={{ padding: 5, margin: 10, width: 200 }}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </button>

        <span style={{ padding: 5, margin: 10 }}>
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "70px", textAlign: "center", marginRight: "6px" }}
          />
          of {pageOptions.length}
        </span>

        <button
          style={{ padding: 5, margin: 10, width: 200 }}
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
        className="table table-striped bg-white mb-4"
        style={{ lineHeight: 1, backgroundColor: "white" }}
      >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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
