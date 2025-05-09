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

const columns = [
  {
    name: "Season",
    uid: "season",
    sortable: false,
  },
  {
    name: "Team",
    uid: "team",
    sortable: false,
  },
  {
    name: "Games Played",
    uid: "gamesplayed",
    sortable: false,
  },
  {
    name: "Goals",
    uid: "numgoalz",
    sortable: false,
  },
  {
    name: "Assists",
    uid: "numassistz",
    sortable: false,
  },
  {
    name: "Points",
    uid: "numpointz",
    sortable: false,
  },
  {
    name: "+/-",
    uid: "plusminuz",
    sortable: false,
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
  // playerId: string;
  firstName: string;
  lastName: string;
}

export default function PlayerSeasonStats({ firstName, lastName }: Props) {
  const season = "2015-2016";
  const stat = "p";
  // const [filterValue, setFilterValue] = React.useState("");

  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));

  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [seasonStats, setSeasonStats] = useState<any[]>([]);

  useEffect(() => {
    const getPlayers = async () => {
      // console.log(firstName)
      const { data, error } = await supabase.rpc("get_player_stats_by_season", {
        fname: firstName,
        lname: lastName
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
  }, [firstName, lastName]);

  const [page, setPage] = React.useState(1);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex justify-between items-center w-full">
        <span className="text-xl">
          {"Season Stats: " + capitalize(firstName) + " " + capitalize(lastName)}
        </span>
  
        <Dropdown>
          <DropdownTrigger className="flex">
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
    );
  }, [firstName, lastName, visibleColumns]); 
 
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
    <div className="w-full overflow-x-auto">
      <Table
        isCompact
        isHeaderSticky
        removeWrapper
        aria-label="Database table"
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
          emptyContent={"Loading data..."}
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
