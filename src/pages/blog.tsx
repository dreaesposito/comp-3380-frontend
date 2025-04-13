// @ts-nocheck
// import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Card,
  CardHeader,
  CardBody,
  ModalFooter,
} from "@heroui/react";
import supabase from "@/utils/supabase.ts";

// for dropdown mapping
export const columns = [
  { name: "RANK", uid: "id", sortable: true },
  { name: "FIRST", uid: "firstname", sortable: true },
  { name: "LAST", uid: "lastname", sortable: true },
  { name: "GOALS", uid: "numgoalz", sortable: true },
  { name: "ASSISTS", uid: "numassistz", sortable: true },
  { name: "POINTS", uid: "numpointz", sortable: true },
  { name: "+/-", uid: "plusminuz", sortable: true },
];

export const players = [
  {
    id: 8471214,
    firstname: "Alex",
    lastname: "Ovechkin",
    numgoalz: "20",
    numassistz: "20",
    numpointz: "40",
    plusminuz: "1",
  },
  {
    id: 8471675,
    firstname: "Sidney",
    lastname: "Crosby",
    numgoalz: "2",
    numassistz: "200",
    numpointz: "202",
    plusminuz: "1",
  },
  {
    id: 8476880,
    firstname: "Tom",
    lastname: "Wilson",
    numgoalz: "30",
    numassistz: "5",
    numpointz: "50",
    plusminuz: "-19",
  },
];

export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const VerticalDotsIcon = ({ size = 24, width, height, ...props }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        fill="currentColor"
      />
    </svg>
  );
};

export const SearchIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export const ChevronDownIcon = ({ strokeWidth = 1.5, ...otherProps }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...otherProps}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

// const statusColorMap = {
//   active: "success",
//   paused: "danger",
//   vacation: "warning",
// };

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "firstname",
  "lastname",
  "numgoalz",
  "numassistz",
  "numpointz",
  "plusminuz",
];

function TableTester() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const pages = Math.ceil(players.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...players];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    // if (
    //   statusFilter !== "all" &&
    //   Array.from(statusFilter).length !== statusOptions.length
    // ) {
    //   filteredUsers = filteredUsers.filter((user) =>
    //     Array.from(statusFilter).includes(user.status),
    //   );
    // }

    return filteredUsers;
  }, [players, filterValue, statusFilter]);

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

  const handleRowClick = async (num: any) => {
    // console.log(typeof num);

    const { data, error } = await supabase.rpc("get_player_info", { pid: num });
    if (error) {
      console.error("Error fetching player information:", error);
    } else {
      // setSelectedPlayer({ ...data, imageUrl: playerImageUrl });
      console.log("fetched player info:", data);
      setSelectedPlayer(data);
      setIsModalOpen(true);
    }
  };

  const renderCell = React.useCallback((user, columnKey, index: number) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "id":
        return <h1>{index + 1}</h1>;
      case "firstname":
        return (
          <User
            avatarProps={{ radius: "full", size: "sm", src: user.avatar }}
            classNames={{
              description: "text-default-500",
            }}
            /*name={cellValue + " " + user.lastname}*/
            name={cellValue}
          ></User>
        );
      case "lastname":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            {/*<p className="text-bold text-tiny capitalize text-default-500">*/}
            {/*  {user.lastname}*/}
            {/*</p>*/}
          </div>
        );
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

  // TODO - update the search function
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
            placeholder="Search by name..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
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
          <span className="text-default-400 text-small">
            Total: {players.length} players
          </span>
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
    filterValue,
    statusFilter,
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
        "group-data-[first=true]/tr:first:before:rounded-none",
        "group-data-[first=true]/tr:last:before:rounded-none",
        // middle
        "group-data-[middle=true]/tr:before:rounded-none",
        // last
        "group-data-[last=true]/tr:first:before:rounded-none",
        "group-data-[last=true]/tr:last:before:rounded-none",
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
              align={column.uid === "actions" ? "center" : "start"}
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
          {items.map((item, index) => (
            <TableRow
              key={item.id}
              className="cursor-pointer hover:bg-default/40 hover:rounded-2xl"
              onClick={() => handleRowClick(item.id)}
            >
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey, index)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedPlayer && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          size="xl"
        >
          <ModalContent>
            <ModalHeader>Player Details</ModalHeader>
            <ModalBody>
              <Card className="p-6">
                <CardHeader className="flex pl-16 text-xl font-bold">
                  {selectedPlayer[0].fn} {selectedPlayer[0].ln}
                </CardHeader>
                <CardBody className="flex justify-center items-center">
                  <div className="flex items-center">
                    <img
                      src={selectedPlayer[0].img} // Ensure the player image URL is provided in the player data
                      alt={`${selectedPlayer[0].fn} ${selectedPlayer[0].ln}`}
                      className="w-32 h-32 mr-6 rounded-full mr-14" // Adjust size as needed
                    />
                    <div>
                      <p>
                        <strong>Nationality:</strong> {selectedPlayer[0].nat}
                      </p>
                      <p>
                        <strong>Birthdate:</strong> {selectedPlayer[0].bd}
                      </p>
                      <p>
                        <strong>Height:</strong> {selectedPlayer[0].h}
                      </p>
                      <p>
                        <strong>Weight:</strong> {selectedPlayer[0].w}
                      </p>
                      <p>
                        <strong>Player Type:</strong> {selectedPlayer[0].pt}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </ModalBody>
            <ModalFooter>
              <Button onPress={() => setIsModalOpen(false)} variant="flat">
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

export default function DocsPage() {
  return (
    <DefaultLayout>
      <TableTester />
    </DefaultLayout>
  );
}

export function TestTable() {
  return <TableTester />;
}
