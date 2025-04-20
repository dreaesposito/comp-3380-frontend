// @ts-nocheck

// TODO - add games played?

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
  User,
} from "@heroui/react";

import supabase from "@/utils/supabase.ts";

// for dropdown mapping
// export const columns = [
//   {
//     name: "Season",
//     uid: "season_name",
//     sortable: true,
//   },
//   {
//     name: "Goals",
//     uid: "total_goals",
//     sortable: true,
//   },
//   {
//     name: "Assists",
//     uid: "total_assists",
//     sortable: true,
//   },
//   {
//     name: "Points",
//     uid: "total_points",
//     sortable: true,
//   },
// ];

const columns = [
  {
    name: "Season",
    uid: "season",
    sortable: true,
  },
  {
    name: "Team",
    uid: "team",
    sortable: true,
  },
  {
    name: "Games Played",
    uid: "gamesplayed",
    sortable: true,
  },
  {
    name: "Goals",
    uid: "numgoalz",
    sortable: true,
  },
  {
    name: "Assists",
    uid: "numassistz",
    sortable: true,
  },
  {
    name: "Points",
    uid: "numpointz",
    sortable: true,
  },
  {
    name: "+/-",
    uid: "plusminuz",
    sortable: true,
  },
];

const INITIAL_VISIBLE_COLUMNS = [
  "season",
  "team",
  "gamesplayed",
  "numgoalz",
  "numassistz",
  "numpointz",
  "plusminuz",
];

export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

import { Player } from "@/types/Player";

interface Props {
  player: Player
}

export default function Top25ByStat({ player }: Props) {
  const season = "2015-2016";
  const stat = "p";
  // const [filterValue, setFilterValue] = React.useState("");

  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));

  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // const [sortDescriptor, setSortDescriptor] = React.useState({
  //   column: "g",
  //   direction: "descending",
  // });

  const [seasonStats, setSeasonStats] = useState<any[]>([]);

  useEffect(() => {
    const getPlayers = async () => {
      const { data, error } = await supabase.rpc("get_player_stats_by_season", {
        fname: player.firstname,
        lname: player.lastname,
      });

      if (error) {
        console.error("Error performing query:", error);
      } else {
        data.forEach((seasonStat, index) => {
          seasonStat.rank = index + 1;
        });
        setSeasonStats(data);
        console;
      }
    };

    getPlayers(); // Call the async function
  }, []);

  const [page, setPage] = React.useState(1);

  // const pages = Math.ceil(players.length / rowsPerPage);
  // const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  // const filteredItems = React.useMemo(() => {
  //   return [...players];
  // }, [players, filterValue]);

  // const items = React.useMemo(() => {
  //   const start = (page - 1) * rowsPerPage;
  //   const end = start + rowsPerPage;

  //   return filteredItems.slice(start, end);
  // }, [page, filteredItems, rowsPerPage]);

  // const sortedItems = React.useMemo(() => {
  //   return [...items].sort((a, b) => {
  //     const first = a[sortDescriptor.column];
  //     const second = b[sortDescriptor.column];
  //     const cmp = first < second ? -1 : first > second ? 1 : 0;

  //     return sortDescriptor.direction === "descending" ? -cmp : cmp;
  //   });
  // }, [sortDescriptor, items]);

  // const onRowsPerPageChange = React.useCallback((e) => {
  //   setRowsPerPage(Number(e.target.value));
  //   setPage(1);
  // }, []);

  // const onSearchChange = React.useCallback((value) => {
  //   if (value) {
  //     setFilterValue(value);
  //     setPage(1);
  //   } else {
  //     setFilterValue("");
  //   }
  // }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">

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
        <div className="flex justify-between items-center">
          <span className="text-default-700 text-medium">
            Season Stats for {player.firstname} {player.lastname}
          </span>
          {/* <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="25">25</option>
            </select>
          </label> */}
        </div>
      </div>
    );
  }, [
    // filterValue,
    visibleColumns,
    // onSearchChange,
    // onRowsPerPageChange,
    // players.length,
    // hasSearchFilter,
  ]);

  // const bottomContent = React.useMemo(() => {
  //   return (
  //     <div className="py-2 px-2 flex justify-center items-center">
  //       <Pagination
  //         showControls
  //         classNames={{
  //           cursor: "bg-foreground text-background",
  //         }}
  //         color="default"
  //         isDisabled={hasSearchFilter}
  //         page={page}
  //         total={pages}
  //         variant="light"
  //         onChange={setPage}
  //       />
  //     </div>
  //   );
  // }, [selectedKeys, page,]);

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
        // bottomContent={bottomContent}
        // bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper:
              "after:bg-foreground after:text-background text-background",
          },
        }}
        classNames={classNames}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
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
          items={seasonStats}
        >
          {seasonStats.map((item) => (
            <TableRow
              key={item.rank}
              className="cursor-pointer hover:bg-default/40 hover:rounded-full"
            >
              {(columnKey) => <TableCell>{item[columnKey]}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
