
import DefaultLayout from "@/layouts/default";

import { useEffect, useState } from "react";
import supabase from "../utils/supabase"

import 
{ Input,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem
} from "@heroui/react";

export default function SearchPage() {

  const [searchQuery, setSearchQuery] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      if (!searchQuery) {
        setPlayers([]);
        return;
      }

      const { data, error } = await supabase.rpc("get_players", { str: '%'+searchQuery+'%' });

      if (error) {
        console.error("Error fetching players:", error);
      } else {
        console.log(data)
        setPlayers(data);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchPlayers();
    }, 300); // Delay to avoid excessive calls

    return () => clearTimeout(delayDebounce);
  }, 
  [searchQuery]
  );


  return (
    <DefaultLayout>
      <div className="flex justify-center items-center w-full">
    <div className="w-1/2">
      <Input
        label="Search"
        labelPlacement="outside"
        placeholder="Enter a player's name"
        type="text"
        className="w-full"
        classNames={{ label: "text-lg font-bold" }}
        onValueChange={setSearchQuery}
      />
      {players.length > 0 && (
        <Dropdown>
          <DropdownTrigger className="w-full">
            <DropdownMenu className="absolute w-full bg-white border rounded-lg shadow-md mt-1">
              {players.map((player: any, index) => (
                <DropdownItem
                  key={index}
                  onPress={() => {
                    setSearchQuery(player); // Select player on click
                    setPlayers([]); // Hide list after selection
                  }}
                >
                  {player.fn} {player.ln}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </DropdownTrigger>
        </Dropdown>
      )}
    </div>
  </div>
    </DefaultLayout>
  );
}
