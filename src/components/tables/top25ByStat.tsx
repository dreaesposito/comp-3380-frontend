// @ts-nocheck

// TODO - add games played?

import React, { useEffect, useState } from "react";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@heroui/react";

import {
  SearchIcon,
  ChevronDownIcon,
} from "@/components/common/tableIcons.tsx";

import supabase from "@/utils/supabase.ts";

const columns = [
  {
    name: "Rank",
    uid: "rank"
  },
  {
    name: "First Name",
    uid: "firstname"
  },
  {
    name: "Last Name",
    uid: "lastname"
  },
  {
    name: "Goals",
    uid: "numgoalz"
  },
  {
    name: "Assists",
    uid: "numassistz"
  },
  {
    name: "Points",
    uid: "numpointz"
  },
  {
    name: "+/-",
    uid: "plusminuz"
  },
];

const INITIAL_VISIBLE_COLUMNS = [
  "rank",
  "firstname",
  "lastname",
  "numgoalz",
  "numassistz",
  "numpointz",
  "plusminuz",
];

export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

enum StatType {
  goals = "g",
  assists = "a",
  points = "p",
  plusMinus = "pm"
}

interface Props {
  selectedSeason: string;
}

export default function Top25ByStat({ selectedSeason }: Props) {
  const [stat, setStat] = React.useState<StatType>(StatType.goals)

  const [filterValue, setFilterValue] = React.useState<string>("");

  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));

  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );

  function statToString(s: StatType): string {
    switch(s) {
      case StatType.assists:
        return "Assists"
      case StatType.goals:
        return "Goals"
      case StatType.points:
        return "Points"
      case StatType.plusMinus:
        return "+/-"
    }
  }

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    const getPlayers = async () => {
      const { data, error } = await supabase.rpc("get_top_25", {
        season_param: selectedSeason,
        stat: stat
      });

      if (error) {
        console.error("Error performing query:", error);
      } else {
        data.forEach((player, index) => {
          player.rank = index + 1;
        });
        setPlayers(data);
        console;
      }
    };

    getPlayers(); // Call the async function
  }, [selectedSeason, stat]);

  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(players.length / rowsPerPage);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    let items = [...players];

    if(filterValue) {
      items = items.filter(item => 
        item.firstname.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.lastname.toLowerCase().includes(filterValue.toLowerCase()) ||
        (item.firstname.toLowerCase() + " " + item.lastname.toLowerCase()).includes(filterValue.toLowerCase())
      )
    }

    return items.slice(start, end);
  }, [players, page, rowsPerPage, filterValue]);

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
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search player..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={(value) => {
              if(value) {
                setPage(1)
                setFilterValue(value)
              } else {
                setFilterValue("")
              }
            }}
          />
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
          <div className="flex items-center gap-1">
            <span className="text-default-700 text-medium">
              Top 25 Players ({selectedSeason}) by: 
            </span>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <span className="italic font-bold cursor-pointer">{statToString(stat)}</span>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="top stat"
                selectionMode="single"
                selectedKeys={[stat]}
                onSelectionChange={(val) => setStat(Array.from(val)[0])}
              >
                {Object.values(StatType).map((value) => (
                  <DropdownItem key={value} className="capitalize">
                    {statToString(value)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="25">25</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    items,
    filterValue,
    stat,
    selectedSeason,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    players.length
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          isDisabled={Boolean(filterValue)}
          color="default"
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
      </div>
    );
  }, [selectedKeys, items.length, page, pages, filterValue]);

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
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              alignItems="center"
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"Select an option to load data"}
          items={items}
        >
          {(item) => (
            <TableRow
              key={item.rank}
              className="cursor-pointer hover:bg-default/40 hover:rounded-full"
            >
              {(columnKey) => <TableCell>{item[columnKey]}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
