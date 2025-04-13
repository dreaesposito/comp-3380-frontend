// @ts-nocheck

import { ChevronDownIcon } from "@/components/common/tableIcons.tsx";

import React, { useEffect, useState } from "react";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

import supabase from "@/utils/supabase.ts";

export const columns = [
  {
    name: "#",
    uid: "rank",
  },
  {
    name: "Player",
    uid: "first_name",
  },
  {
    name: "Weight",
    uid: "player_weight",
    sortable: true,
  },
  {
    name: "Height",
    uid: "player_height",
    sortable: true,
  },
  {
    name: "Penalties",
    uid: "num_penalties",
    sortable: true,
  },
];

const INITIAL_VISIBLE_COLUMNS = [
  "rank",
  "first_name",
  "player_weight",
  "player_height",
  "num_penalties",
];

export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

interface Props {
  numRows: number;
}

export default function TopPlayersPenalties({ numRows }: Props) {
  const [filterValue, setFilterValue] = React.useState("");

  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));

  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );

  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "num_penalties",
    direction: "descending",
  });

  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    const getPlayers = async () => {
      const { data, error } = await supabase.rpc("top_players_penalties", {
        num_rows: numRows,
      });

      if (error) {
        console.error("Error performing query:", error);
      } else {
        // assign rank numbering
        data.forEach((player, index) => {
          player.rank = index + 1;
        });
        setPlayers(data);
      }
    };

    getPlayers(); // Call the async function
  }, []);

  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(players.length / rowsPerPage);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    return [...players];
  }, [players, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    // console.log(user);

    switch (columnKey) {
      case "first_name":
        return cellValue + " " + user.last_name; // gives decimal formatting
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-600 text-medium">
            {"Top " +
              (numRows > players.length ? players.length : numRows) +
              " Players"}
          </span>

          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="15">25</option>
              <option value="25">50</option>
              <option value="25">100</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    players.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      // th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      th: ["bg-default/30", "text-default-500", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]/tr:first:before:rounded",
        "group-data-[first=true]/tr:last:before:rounded",
        // middle
        "group-data-[middle=true]/tr:before:rounded",
        // last
        "group-data-[last=true]/tr:first:before:rounded",
        "group-data-[last=true]/tr:last:before:rounded",
      ],
    }),
    [],
  );

  return (
    <div>
      <Table
        isCompact
        isHeaderSticky
        removeWrapper
        aria-label="Database table"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper:
              "after:bg-foreground after:text-background text-background",
          },
        }}
        classNames={classNames}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              alignItems="center"
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"Select an option to load data"}
          items={sortedItems}
        >
          {sortedItems.map((item) => (
            <TableRow
              key={item.id}
              className="cursor-pointer hover:bg-default/40 hover:rounded-full"
            >
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
