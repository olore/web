import React from 'react';
import { useTable, usePagination, HeaderGroup, UsePaginationOptions, UseSortByOptions, useRowState, Row, UseTableColumnOptions } from 'react-table';

// export interface TableInstance<D extends object = {}>
//     extends UseFiltersInstanceProps<D>,
//       UseTableHeaderGroupProps<D>,
//       UseTableInstanceProps<D>,
//       UseFiltersInstanceProps<D>,
//       UsePaginationInstanceProps<D> {}

export interface TableOptions<D extends object>
  extends UsePaginationOptions<D>,
    UseTableColumnOptions<D>,
    UseSortByOptions<D> {};

// export interface TableState<D extends object = {}> {
//     hiddenColumns?: Array<IdType<D>>;
// }

export default function QueryTable({ columns, data}: any) {

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
    state: { pageIndex, pageSize },
  } : {
    getTableProps: any,
    getTableBodyProps: any,
    headerGroups: Array<HeaderGroup>,
    prepareRow: any,
    page: Array<Row>,
    canPreviousPage: any,
    canNextPage: any,
    pageOptions: any,
    pageCount: any,
    gotoPage: any,
    nextPage: any,
    previousPage: any,
    setPageSize: any,
    state: any
  } = useTable({
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 25 },
    }, 
    usePagination,
    useRowState,
  )

  return (
    <>
    <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    <table {...getTableProps()} className="table table-striped" style={{ backgroundColor: "white"}}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} style={{ width: column.width}}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()} style={{lineHeight: 1, padding: '7px 5px'}}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
    </>
  )
}