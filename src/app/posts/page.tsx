'use client';
import React, { useState } from 'react';
import {
  CellContext,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { Post } from '@/types';

const getUsers = async (): Promise<Post[] | []> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return response.json();
};

const UsersTable = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [paginationState, setPaginationState] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const columns = [
    {
      accessorKey: 'id',
      header: '#',
      cell: (props: CellContext<Post, string>) => <p>{props.getValue()}</p>,
      size: 100,
      enableSorting: true,
    },
    {
      accessorKey: 'userId',
      header: 'User ID',
      cell: (props: CellContext<Post, string>) => <p>{props.getValue()}</p>,
      size: 100,
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: (props: CellContext<Post, string>) => <p>{props.getValue()}</p>,
      size: 350,
    },
    {
      accessorKey: 'body',
      header: 'Description',
      cell: (props: CellContext<Post, string>) => <p>{props.getValue()}</p>,
      size: 600,
    },
  ];

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
      pagination: paginationState,
    },
    onPaginationChange: setPaginationState,
    onGlobalFilterChange: setGlobalFilter,
  });

  if (isLoading) return <div>Loading Posts...</div>;

  if (error) return <div>Error: {error.message}</div>;

  const filteredRows = table.getRowModel().rows;

  return (
    <>
      <div className="mt-10 text-center text-3xl font-extrabold">
        Users Table
      </div>
      <div className="mt-6 flex justify-center">
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="mb-6 w-full max-w-md rounded border p-2 text-black"
          placeholder="Search..."
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
                className="cursor-pointer"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <i className="fa-sharp fa-solid fa-arrow-right-long"></i>
              </button>
              <select
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

export default UsersTable;
