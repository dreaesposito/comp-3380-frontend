
import DefaultLayout from "@/layouts/default";

import React from "react";
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
} from "@heroui/react";

import {
Modal,
ModalContent,
ModalHeader,
ModalBody,
ModalFooter,
Card,
CardHeader,
CardBody,
} from "@heroui/react";


import { useEffect, useState } from "react";
import supabase from "../utils/supabase"
import {Select, SelectItem} from "@heroui/select";

const seasons = [
  {key: "2012-2013", label: "2012-2013"},
  {key: "2013-2014", label: "2013-2014"},
  {key: "2014-2015", label: "2014-2015"},
  {key: "2015-2016", label: "2015-2016"},
  {key: "2016-2017", label: "2016-2017"},
  {key: "2017-2018", label: "2017-2018"},
  {key: "2018-2019", label: "2018-2019"},
  {key: "2019-2020", label: "2019-2020"},

];

const stats = [
  {key: "Goals", label: "g"},
  {key: "Assists", label: "a"},
  {key: "Points", label: "p"},
  {key: "PlusMinus", label: "pm"},
];


import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const ChevronDownIcon = ({strokeWidth = 1.5, ...otherProps}: IconSvgProps) => {
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


export default function LeadersPage() {
  const [players, setPlayers] = useState<any[]>([]);
  const [season, setSeason] = useState('2014-2015');
  const [stat, setStat] = useState("Points");

  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const playerImageUrl = `https://www.pngfind.com/pngs/b/3-36418_basketball-player-silhouette-png.png`; // look into sportsdata.io for free headshots

  useEffect(() => {
    const getPlayers = async () => {
      console.log(season)
      const label = stats.find(s => s.key === stat)?.label || "N/A";
      console.log(stat)
      console.log(label)
      // Using await inside an async function
      // const { data, error } = await supabase.from("players").select("*").limit(30).order("weight", {ascending:false});
      const { data, error } = await supabase.rpc("get_top_25", { season_param: season, stat: label });
      if (error) {
        console.error("Error fetching players:", error);
      } else {
        console.log("fetched players:", data);
        setPlayers(data);
      }
    };

    getPlayers(); // Call the async function
  }, [
    season,
    stat,
  ]);




  const topContent = React.useMemo(() => {
    return (
      // <div className="flex flex-col gap-4">
      <div className="flex justify-center items-center space-x-20 p-4 rounded-lg">

      {/* //<div className="container m-auto grid grid-cols-3 gap-4"> */}
      <div className="flex items-center gap-4 p-4 rounded-lg">
          <h2 className="text-sm font-medium">Season:</h2>
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                size="sm"
                variant="flat"
              >
                {season}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={true}
              selectedKeys={new Set([season])}
              selectionMode="single"
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0]; // Get selected value
                console.log(selectedKey.toString())
                setSeason(selectedKey.toString());
              }}
            >
              {seasons.map((season) => (
                <DropdownItem key={season.key}>
                  { season.key }
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

        </div>
        <div className="flex items-center gap-4 p-4 rounded-lg">
          <h2 className="text-sm font-medium">Order By:</h2>
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                size="sm"
                variant="flat"
              >
                {stat}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={true}
              selectedKeys={new Set([stat])}
              selectionMode="single"
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys)[0]; // Get selected value
                console.log(selectedKey.toString())
                setStat(selectedKey.toString());
              }}
            >
              {stats.map((stat) => (
                <DropdownItem key={stat.key}>
                  { stat.key }
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

        </div>
      </div>
    );
  

  }, [
    season,
    stat,
  ]);



  const handleRowClick = async (num: any) => {
    console.log(typeof num);


    const { data, error } = await supabase.rpc("get_player_info", { pid: num});
      if (error) {
        console.error("Error fetching player information:", error);
      } else {

        

        // setSelectedPlayer({ ...data, imageUrl: playerImageUrl });
        console.log("fetched player info:", data);
        setSelectedPlayer(data);
        setIsModalOpen(true);

      }

    
    

  };

  return (
    <DefaultLayout>
      {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '75%' }}> */}
        {/* Select Component for Season Filtering
        <Select
          className="max-w-xs"
          items={seasons}
          label="Select Season"
          placeholder="Select a Season"
          onChange={(e) => handleSeasonChange(e.target.value)}
        >
          {(seasonItem) => <SelectItem>{seasonItem.label}</SelectItem>}
        </Select> */}
      <div className="w-3/4 mx-auto mb-4">
        <h1 className="text-center text-4xl font-bold">League Leaders</h1>
      </div>

      <div className="w-3/4 mx-auto mb-4">{topContent}</div>

        {/* Table for displaying players */}

      <div className="w-3/4 mx-auto ">
        <Table isHeaderSticky
               isVirtualized
               //rowHeight={40}
              // topContent={topContent}
              // topContentPlacement="outside"
               aria-label="Player Stats Table" 
               className="max-h-[400px] overflow-auto"
               //style={{ width: '75%' }}
               >
          <TableHeader>
          <TableColumn>#</TableColumn>
            <TableColumn>First Name</TableColumn>
            <TableColumn>Last Name</TableColumn>
            <TableColumn>Goals</TableColumn>
            <TableColumn>Assists</TableColumn>
            <TableColumn>Points</TableColumn>
            <TableColumn>+/-</TableColumn>
          </TableHeader>
          <TableBody>
            {/* Render rows for each player */}
            {players.map((player, index) => (
              <TableRow key={index}
              onClick={() => handleRowClick(player.pid)}  // Add onClick handler here
              className="cursor-pointer hover:bg-gray-100"  // Add hover effect for better UX
            >
                <TableCell>{index+1}</TableCell>
                <TableCell>{player.firstname}</TableCell>
                <TableCell>{player.lastname}</TableCell>
                <TableCell>{player.numgoalz}</TableCell>
                <TableCell>{player.numassistz}</TableCell>
                <TableCell>{player.numpointz}</TableCell>
                <TableCell>{player.plusminuz}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal for Player Details */}
      {selectedPlayer && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="xl">
          <ModalContent>
            <ModalHeader>Player Details</ModalHeader>
            <ModalBody>
              <Card className="p-6">
                <CardHeader className="flex pl-16 text-xl font-bold">{selectedPlayer[0].fn} {selectedPlayer[0].ln}</CardHeader>
                <CardBody className="flex justify-center items-center">
                <div className="flex items-center">
              <img 
                src={selectedPlayer[0].img} // Ensure the player image URL is provided in the player data
                alt={`${selectedPlayer[0].fn} ${selectedPlayer[0].ln}`} 
                className="w-32 h-32 mr-6 rounded-full mr-14" // Adjust size as needed
              />
              <div>
                <p><strong>Nationality:</strong> {selectedPlayer[0].nat}</p>
                <p><strong>Birthdate:</strong> {selectedPlayer[0].bd}</p>
                <p><strong>Height:</strong> {selectedPlayer[0].h}</p>
                <p><strong>Weight:</strong> {selectedPlayer[0].w}</p>
                <p><strong>Player Type:</strong> {selectedPlayer[0].pt}</p>
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
    </DefaultLayout>
  );
}