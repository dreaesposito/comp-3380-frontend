import { useState, useEffect } from "react";
import { Input } from "@heroui/react";
import supabase from "../../utils/supabase";
import { Player } from "@/types/Player";

export const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => {
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

interface SearchBarProps {
  placeholder?: string;
  onSelect: (player: Player) => Promise<void>;
}

const SearchBar = ({ placeholder = "Search...", onSelect}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  // Fetch all players once on mount
  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase.rpc("get_all_players");

      if (error) {
        console.error("Error fetching players:", error);
      } else {
        const players = (data || []) as Player[];
        setAllPlayers(players);
      }
    };

    fetchPlayers();
  }, []);

  const filteredPlayers = allPlayers.filter((player) => {
    let matches = false;

    if (
      player.firstname === undefined ||
      player.lastname === undefined ||
      player.team === undefined
    ) {
      console.warn("Player has undefined fields:", player.team);
      
    } else {

      if (((player.firstname).toLowerCase() + " " + (player.lastname).toLowerCase()).includes(query.toLowerCase()) && query != " "){
        matches = true
      }
    }
    return matches;
  });

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[100%]",
              inputWrapper: "border-1",
            }}
            placeholder={placeholder}
            size="md"
            startContent={<SearchIcon className="text-default-300" />}
            value={query}
            variant="bordered"
            onValueChange={setQuery}
        />
      {query.length > 0 && !(selectedPlayer && `${selectedPlayer.firstname} ${selectedPlayer.lastname}` === query) && (
        <div className="absolute w-full bg-default-100 border border-default-200 rounded-md shadow-md mt-1 z-50 max-h-64 overflow-y-auto pointer-events-auto">

          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player, index) => (
              <div
                key={index}
                className="flex justify-between items-center px-4 py-2 hover:bg-default/60 cursor-pointer"
                onClick={() => {
                  setQuery(`${player.firstname} ${player.lastname}`);
                  setSelectedPlayer(player);
                  // Optionally close dropdown here or keep it open
                  onSelect(player);
                }}
              >
                <span>
                  {player.firstname} {player.lastname}
                </span>
                <span className="text-sm text-gray-400 ml-4">
                  {player.team}
                  {/* {player.team.slice(0, 3)} */}
                </span>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
