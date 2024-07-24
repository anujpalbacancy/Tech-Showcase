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
} from "@tanstack/react-table";
import { useQuery } from '@tanstack/react-query';
import { Post } from '@/types';

const getUsers = async ({ pageIndex, pageSize }: { pageIndex: number, pageSize: number }): Promise<{ posts: Post[], total: number }> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${pageIndex + 1}&_limit=${pageSize}`);
    const total = Number(response.headers.get('x-total-count')); // assuming the API returns the total count in headers
    const posts = await response.json();
    return { posts, total };
};

const UsersTable = () => {
    const [globalFilter, setGlobalFilter] = useState('');
    const [paginationState, setPaginationState] = useState<{ pageIndex: number, pageSize: number }>({ pageIndex: 0, pageSize: 10 });

    const { isLoading, error, data, isFetching, isStale } = useQuery({
        queryKey: ['users', paginationState.pageIndex, paginationState.pageSize],
        queryFn: () => getUsers(paginationState),
    });

    const columns = [
        {
            accessorKey: "id",
            header: "#",
            cell: (props: CellContext<Post, string>) => <p>{props.getValue()}</p>,
            size: 100,
            enableSorting: true,
        },
        {
            accessorKey: "userId",
            header: "User ID",
            cell: (props: CellContext<Post, string>) => <p>{props.getValue()}</p>,
            size: 100,
        },
        {
            accessorKey: "title",
            header: "Title",
            cell: (props: CellContext<Post, string>) => <p>{props.getValue()}</p>,
            size: 350,
        },
        {
            accessorKey: "body",
            header: "Description",
            cell: (props: CellContext<Post, string>) => <p>{props.getValue()}</p>,
            size: 600,
        }
    ];

    const table = useReactTable({
        data: data ? data.posts : [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        pageCount: data ? Math.ceil(data.total / paginationState.pageSize) : -1,
        state: {
            globalFilter,
            pagination: paginationState,
        },
        onPaginationChange: setPaginationState,
        onGlobalFilterChange: setGlobalFilter,
        manualPagination: true
    });

    if (isLoading) return <div>Loading users...</div>;

    if (error) return <div>Error: {error.message}</div>;

    const filteredRows = table.getRowModel().rows;

    return (
        <>
            <div className='text-3xl text-center font-extrabold mt-10'>Users Table</div>
            <div className='flex justify-center mt-6'>
                <input
                    type="text"
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="border rounded p-2 mb-6 w-full text-black max-w-md"
                    placeholder="Search..."
                />
            </div>
            <div className='flex justify-center '>
                <div className='overflow-x-auto'>
                    <div className='min-w-full inline-block align-middle'>
                        <div className='table text-center justify-center mt-10'>
                            <div className='thead'>
                                {table.getHeaderGroups()?.map((headerGroup) => (
                                    <div className='tr' key={headerGroup.id}>
                                        {headerGroup.headers?.map((header) => (
                                            <div className='th cursor-pointer' onClick={header.column.getToggleSortingHandler()} style={{ width: header.getSize() }} key={header.id}>
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                                {header.column.getCanSort() && !header.isPlaceholder && (
                                                    <i className="fa-solid fa-sort ms-3"></i>
                                                )}
                                                <div
                                                    onMouseDown={header.getResizeHandler()}
                                                    onTouchStart={header.getResizeHandler()}
                                                    className={`resizer ${header.column.getIsResizing() ? "isResizing" : ""
                                                        }`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <div className='tbody'>
                                {filteredRows.length > 0 ? (
                                    filteredRows.map((row) => (
                                        <div className='tr' key={row.id}>
                                            {row.getVisibleCells().map((cell) => (
                                                <div className='td p-3' style={{ width: cell.column.getSize() }} key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </div>
                                            ))}
                                        </div>
                                    ))
                                ) : (
                                    <div className='tr'>
                                        <div className='td p-3 text-center' style={{ width: '100%' }}>
                                            No data found
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='pagination my-4'>
                            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                                {'<'}
                            </button>
                            <span className="mx-2">
                                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                            </span>
                            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                                {'>'}
                            </button>
                            <select
                                className='px-2 py-1 ms-4 rounded-sm  text-black'
                                value={table.getState().pagination.pageSize}
                                onChange={(e) => {
                                    table.setPageSize(Number(e.target.value))
                                }}
                            >
                                {[10, 20, 30, 40, 50].map(pageSize => (
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
