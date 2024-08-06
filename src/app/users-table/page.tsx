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
import { User } from '@/types';
import { useRouter } from 'next/navigation';
import { useSelectedLink } from '@/context/ActiveLinkContext';
import BackButton from '@/components/BackButton';

const getUsers = async (): Promise<User[] | []> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return response.json();
};

const UsersTable = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  const router = useRouter();
  const { setSelectedLink } = useSelectedLink();

  const { isLoading, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const columns = [
    {
      accessorKey: 'id',
      header: '#',
      cell: (props: CellContext<User, string>) => <p>{props.getValue()}</p>,
      size: 100,
      enableSorting: false,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (props: CellContext<User, string>) => <p>{props.getValue()}</p>,
      size: 150,
    },
    {
      accessorKey: 'username',
      header: 'User Name',
      cell: (props: CellContext<User, string>) => <p>{props.getValue()}</p>,
      size: 150,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: (props: CellContext<User, string>) => <p>{props.getValue()}</p>,
      size: 250,
    },
    {
      header: 'Address',
      columns: [
        {
          accessorKey: 'address.street',
          header: 'Street',
          cell: (props: CellContext<User, string>) => <p>{props.getValue()}</p>,
          size: 150,
        },
        {
          accessorKey: 'address.suite',
          header: 'Suite',
          cell: (props: CellContext<User, string>) => <p>{props.getValue()}</p>,
          size: 100,
        },
        {
          accessorKey: 'address.city',
          header: 'City',
          cell: (props: CellContext<User, string>) => <p>{props.getValue()}</p>,
          size: 150,
        },
      ],
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
    },
    onGlobalFilterChange: setGlobalFilter,
    pageCount: 100,
  });

  if (isLoading) return <div>Loading users...</div>;

  if (error) return <div>Error: {error.message}</div>;

  const filteredRows = table.getRowModel().rows;

  return (
    <>
      <BackButton
        onClick={() => {
          setSelectedLink('home');
          router.push('/');
        }}
        iconClass="fa-sharp fa-solid fa-arrow-left-long"
        additionalClasses="ms-32 mt-8 text-4xl"
      />
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
                            <i className="fa-solid fa-sort ms-3"></i> // <Icon
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
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersTable;
