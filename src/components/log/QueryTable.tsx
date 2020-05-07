import React from "react";
import { useTable, usePagination, useRowState, useSortBy } from "react-table";

export default function QueryTable({ columns, data }: any) {
  const border = { border: "1px solid rgba(0,0,0,.02)" };

  const getHeaderProps = (props: any, { column }: any) => {
    return [
      props,
      {
        style: {
          width: `${column.width}%`,
          textAlign: "center",
          fontSize: "0.75rem",
          ...border
        }
      }
    ];
  };

  const getCellProps = (props: any, { cell }: any) => {
    let defaultOverflow = {
      overflow: "auto",
      textOverflow: "clip",
      wordBreak: "normal",
      whiteSpace: "nowrap"
    };
    if (cell.column.id === "status") {
      defaultOverflow = {
        overflow: "auto",
        textOverflow: "wrap",
        wordBreak: "break-word",
        whiteSpace: "wrap"
      };
    }
    console.log(cell);
    return [
      props,
      {
        style: {
          padding: "7px 5px",
          verticalAlign: "inherit",
          ...defaultOverflow,
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
    usePagination,
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
        style={{
          width: "100%",
          lineHeight: 1.3,
          tableLayout: "fixed",
          backgroundColor: "white"
        }}
      >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
        <tbody {...getTableBodyProps()} style={{ verticalAlign: "middle" }}>
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
