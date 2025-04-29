import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "@heroui/react";
import { useState } from "react";
import { Table } from "@/types/Table.ts";
import { Form } from "@heroui/form";
import SearchBar from "@/components/common/searchBar.tsx";
import { Player } from "@/types/Player.ts";
import supabase from "@/utils/supabase.ts";

interface ChildProps {
  isOpen: boolean;
  onOpenChange: () => void;
  tableToRender: Table;
  callbackFunction: (table: Table, params: {}) => void;
}

export default function FirstLastInputModal(props: ChildProps) {
  const [loading, setIsLoading] = useState(false);
  const [playerInfo, setPlayerInfo] = useState<any | null>(null);

  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    props.callbackFunction(props.tableToRender, {
      playerId: selectedPlayer?.playerid,
      firstName: selectedPlayer?.firstname,
      lastName: selectedPlayer?.lastname,
    });
    await new Promise((resolve) => setTimeout(resolve, 500));
    resetForm();
    props.onOpenChange();
    setIsLoading(false);
  };

  const resetForm = () => {
    setSelectedPlayer(null);
  };

  const handleSelect = async (player: Player) => {
    setSelectedPlayer(player);
    const { data, error } = await supabase.rpc("get_player_info", {
      pid: player.playerid,
    });

    if (error) {
      console.error("Error fetching player information:", error);
    } else {
      setPlayerInfo(data);
    }
  };

  return (
    <Modal
      backdrop="opaque"
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-700 to-zinc-700/10 backdrop-opacity-20",
      }}
      isOpen={props.isOpen}
      placement="top-center"
      onClose={resetForm}
      onOpenChange={props.onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Player Selection
            </ModalHeader>
            <ModalBody>
              <Form className="" onSubmit={handleSubmit}>
                <SearchBar
                  placeholder="Search players..."
                  onSelect={handleSelect}
                />
              </Form>
              {selectedPlayer === null && (
                <div className="mx-10">
                  <div className="p-20" />
                  <div className="p-10" />
                </div>
              )}

              {selectedPlayer !== null && playerInfo !== null && (
                <Card className="bg-default-50 rounded-xl shadow-md p-6">
                  <CardHeader className="flex justify-center text-3xl font-bold">
                    <div className="flex gap-2">
                      <span>{playerInfo[0].fn}</span>
                      <span>{playerInfo[0].ln}</span>
                    </div>
                  </CardHeader>
                  <CardBody className="flex justify-center items-center">
                    <div className="flex items-center">
                      <img
                        alt={`${playerInfo[0].fn} ${playerInfo[0].ln}`}
                        className="w-24 h-24 mr-6 rounded-full md:mr-14"
                        src={playerInfo[0].img}
                      />
                      <div className="flex flex-col gap-1.5">
                        <p>
                          <strong>Type:</strong> {playerInfo[0].pt}
                        </p>
                        <p>
                          <strong>Nationality:</strong> {playerInfo[0].nat}
                        </p>
                        <p>
                          <strong>Height:</strong> {playerInfo[0].h}
                        </p>
                        <p>
                          <strong>Weight:</strong> {playerInfo[0].w}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                isDisabled={selectedPlayer === null}
                isLoading={loading}
                variant="solid"
                onPress={handleSubmit}
              >
                Search DB
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
