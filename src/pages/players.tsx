///////////////////////////////////////
// npm install recharts
//
// ///////////////////////////////////
// import { title } from "@/components/primitives";
import supabase from "../utils/supabase";

import DefaultLayout from "@/layouts/default";
import PlayerSeasonStats from "@/components/tables/playerSeasonStats";
import PlayerStatsChart from "@/components/common/playerStatsChart";

import { useState } from "react";

import {
Card,
CardHeader,
CardBody,
} from "@heroui/react";

import SearchBar from "@/components/common/searchBar";
import { Player } from "@/types/Player";

export default function PlayerAnalysisPage() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [playerInfo, setPlayerInfo] = useState<any | null>(null);

  const handleSelect = async (player: Player) => {
    // console.log("Selected player:", player);
    setSelectedPlayer(player)

    const { data, error } = await supabase.rpc("get_player_info", { pid: player.playerid});
    if (error) {
      console.error("Error fetching player information:", error);
    } else {
      // console.log("fetched player info:", data);
      setPlayerInfo(data);
    }
  }

  function calculateAge(birthdate: string): number {
    const today = new Date();
    const birthDate = new Date(birthdate);
  
    let age = today.getFullYear() - birthDate.getFullYear();
  
    const hasHadBirthdayThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
  
    if (!hasHadBirthdayThisYear) {
      age--;
    }
    return age;
  }

  return (
    <DefaultLayout>
      {/* <h1 className="text-center text-3xl font-extrabold mb-8">Stats by Season</h1> */}
      <div className="w-3/4 mx-auto mb-4">
        <h1 className="text-center text-4xl font-bold">Player Analysis</h1>
      </div>

      <div className="w-3/4 mx-auto mb-4">
        <div className="p-4">
          <SearchBar placeholder="Search players..." onSelect={handleSelect} /> 
      
        </div>
      </div>

      {selectedPlayer && playerInfo && (
      <div className="">
        <div className="flex gap-4 w-full">
          {/* <div className="w-1/3 bg-default-50 rounded-xl p-4 shadow-md"> */}
          <Card className="w-1/3 bg-default-50 rounded-xl shadow-md p-6">
            <CardHeader className="flex justify-center text-3xl font-bold">
              <div className="flex gap-2">
                <span>{playerInfo[0].fn}</span>
                <span>{playerInfo[0].ln}</span>
              </div>
            </CardHeader>
            <CardBody className="flex justify-center items-center">
              <div className="flex items-center">
                <img 
                  src={playerInfo[0].img} 
                  alt={`${playerInfo[0].fn} ${playerInfo[0].ln}`} 
                  className="w-24 h-24 mr-6 rounded-full" 
                />
                <div className="flex flex-col gap-1.5">
                  <p><strong>Type:</strong> {playerInfo[0].pt}</p>
                  <p><strong>Nationality:</strong> {playerInfo[0].nat}</p>
                  <p><strong>Age:</strong> {calculateAge(playerInfo[0].bd)}</p>
                  {/* <p><strong>Birthdate:</strong> {playerInfo[0].bd}</p> */}
                  <p><strong>Height:</strong> {playerInfo[0].h}</p>
                  <p><strong>Weight:</strong> {playerInfo[0].w}</p>
                </div>
              </div>
            </CardBody>
          </Card>
          {/* </div> */}

          <div className="w-2/3 bg-default-50 rounded-xl p-6 shadow-md">
            <PlayerSeasonStats firstName={selectedPlayer.firstname} lastName={selectedPlayer.lastname} />
          </div>
        </div>
        
        <div className="w-full bg-default-50 rounded-xl p-6 shadow-md mt-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Player Comparison</h2>
          <PlayerStatsChart player={selectedPlayer} />
        </div>
      </div>

      )}
    </DefaultLayout>
  );
}
