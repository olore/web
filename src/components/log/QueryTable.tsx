import React, { CSSProperties } from 'react';
import { useTable, usePagination, UsePaginationOptions, UseSortByOptions, IdType, useRowState, Hooks, UseTableHooks, UseRowStateOptions } from 'react-table';

// export interface TableInstance<D extends object = {}>
//     extends UseFiltersInstanceProps<D>,
//       UseTableHeaderGroupProps<D>,
//       UseTableInstanceProps<D>,
//       UseFiltersInstanceProps<D>,
//       UsePaginationInstanceProps<D> {}

export interface TableOptions<D extends object>
  extends UsePaginationOptions<D>,
    UseSortByOptions<D> {};

// export interface TableState<D extends object = {}> {
//     hiddenColumns?: Array<IdType<D>>;
// }

export default function QueryTable({ columns, data}: any) {

  // Use the state and functions returned from useTable to build your UI
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
    getCellProps,
    state: { pageIndex, pageSize },
    // initialRowStateAccessor: () => ({ count: 0 }),
    // initialCellStateAccessor: () => ({ count: 0 }),

  } = useTable({
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 25 },
    }, 
    usePagination,
    useRowState,
    hooks => {
      hooks.getCellProps.push((props, {instance}) => {
        console.log(instance);
        // let status = instance.row.values.status;
        // let color = [1, 4, 5, 6].includes(status) ? "red" : "green"
        return [

          props,
          {
            style: {
              color: "pink" // this is able to change colors
            }
          }

        ]
      });

      // hooks.prepareRow.push((row, { instance }) => {
      //   let color = [1, 4, 5, 6].includes(row.values.status) ? "red" : "green"
      //   // row.getRowProps().style = ("color: " + color) as CSSProperties;

      //   row.cells.forEach(cell => {
      //     console.log(cell);
      //     cell.getCellProps((props, { instance }) => [
      //       props,
      //       {
      //         style: {
      //           color: color
      //         }
      //       }
      //     ]);
      //   });

      // })
    }
  )

  /*
  const getRowStyles = (props, { instance }) => [
  props,
  {
    style: {
      display: 'flex',
      width: `${instance.totalColumnsWidth}px`,
    },
  },
]

export const useBlockLayout = hooks => {
  hooks.getRowProps.push(getRowStyles)
  */
  
  

  // Render the UI for your table
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
        {headerGroups.map((headerGroup: { getHeaderGroupProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>; headers: any[]; }) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row: { getRowProps: () => JSX.IntrinsicAttributes & React.ClassAttributes<HTMLTableRowElement> & React.HTMLAttributes<HTMLTableRowElement>; cells: any[]; }, i: any) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()} style={{padding: '7px 5px'}}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
    </>
  )
}