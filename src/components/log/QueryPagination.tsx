import React from "react";

export default function QueryPagination({ data }: any) {
  let {
    previousPage,
    canPreviousPage,
    pageIndex,
    gotoPage,
    pageOptions,
    nextPage,
    canNextPage,
    pageSize,
    setPageSize
  } = data;

  return (
    <div className="pagination">
      <button
        style={{ width: 200 }}
        className="p-2 m-3"
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >
        Previous
      </button>

      <span className="p-2 m-3">
        <input
          type="number"
          value={pageIndex + 1}
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
  );
}
