import React from "react";

export default function QueryPagination({ t, data }: any) {
  const {
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
    <div
      className="pagination w-100 d-flex flex-row p-1 bg-white"
      style={{ alignItems: "stretch", justifyContent: "space-between" }}
    >
      <button
        type="button"
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
        style={{ flex: "1 1" }}
      >
        {t("Previous")}
      </button>

      <div
        className="d-flex text-center flex-row flex-wrap"
        style={{
          flex: "1.5 1",
          alignItems: "center",
          justifyContent: "space-around"
        }}
      >
        <span className="py-1 px-3">
          <span className="px-1">{t("Page")}</span>
          <input
            type="number"
            value={pageIndex + 1}
            className="text-center mr-1"
            style={{ width: 70 }}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
          />
          {t("of")} {pageOptions.length}
        </span>

        <select
          className="bg-white"
          style={{ borderRadius: 3 }}
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 25, 50, 100].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {t("Show")} {pageSize}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={() => nextPage()}
        disabled={!canNextPage}
        style={{ flex: "1 1" }}
      >
        {t("Next")}
      </button>
    </div>
  );
}