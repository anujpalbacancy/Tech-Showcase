'use client';
import React, { useState } from 'react';
import {
  ColumnDef,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useDebounce } from '@/hooks/useDebounce';

interface TableProps<TData extends RowData> {
  columns: ColumnDef<TData, unknown>[]; // Array of column definitions
  data: TData[]; // Array of data
  globalFilterPlaceholder?: string; // Placeholder for the global filter input
  initialPageSize?: number; // Initial number of rows per page
  debounceTime?: number; // Debounce time for global filter input
}

const Table = <TData extends RowData>({
  columns,
  data,
  globalFilterPlaceholder = 'Search...',
  initialPageSize = 10,
  debounceTime = 300,
}: TableProps<TData>): JSX.Element => {
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [paginationState, setPaginationState] = useState({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  const debouncedGlobalFilter = useDebounce(globalFilter, debounceTime);

  const table = useReactTable<TData>({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter: debouncedGlobalFilter,
      pagination: paginationState,
    },
    onPaginationChange: setPaginationState,
    onGlobalFilterChange: setGlobalFilter,
  });

  const filteredRows = table.getRowModel().rows;

  return (
    <>
      <div className="mt-6 flex justify-center">
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="mb-6 w-full max-w-md rounded border p-2 text-black"
          placeholder={globalFilterPlaceholder}
        />
      </div>
      <div className="flex justify-center">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="mt-10 table justify-center text-center">
              <div className="thead">
                {table.getHeaderGroups()?.map((headerGroup) => (
                  <div className="tr" key={headerGroup.id}>
                    {headerGroup.headers?.map((header) => (
                      <div
                        className="th cursor-pointer"
                        onClick={header.column.getToggleSortingHandler()}
                        style={{ width: header.getSize() }}
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        {header.column.getCanSort() &&
                          !header.isPlaceholder && (
                            <i className="fa-solid fa-sort ms-3"></i>
                          )}
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={`resizer ${
                            header.column.getIsResizing() ? 'isResizing' : ''
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="tbody">
                {filteredRows.length > 0 ? (
                  filteredRows.map((row) => (
                    <div className="tr" key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <div
                          className="td p-3"
                          style={{ width: cell.column.getSize() }}
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  <div className="tr">
                    <div
                      className="td p-3 text-center"
                      style={{ width: '100%' }}
                    >
                      No data found
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="pagination mb-5 mt-4">
              <button
                data-testid="prev-page-button"
                className="cursor-pointer"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <i className="fa-sharp fa-solid fa-arrow-left-long"></i>
              </button>
              <span className="mx-2">
                Page {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </span>
              <button
                data-testid="next-page-button"
                className="cursor-pointer"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <i className="fa-sharp fa-solid fa-arrow-right-long"></i>
              </button>
              <select
                data-testid="page-size-select"
                className="mb-5 ms-3 px-2 py-1 text-black"
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
