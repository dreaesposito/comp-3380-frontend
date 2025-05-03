import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useMemo, useState } from "react";
import { Listbox, ListboxItem } from "@heroui/listbox";

import { QueryTable } from "@/types/Table.ts";
import { Team, teams } from "@/components/teams.ts";

const seasons = [
  "2012-2013",
  "2013-2014",
  "2014-2015",
  "2015-2016",
  "2016-2017",
  "2017-2018",
  "2018-2019",
  "2019-2020",
];

const ListboxWrapper = ({ children }: { children: any }) => (
  <div className="w-60 border-small px-0 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

interface ChildProps {
  isOpen: boolean;
  onOpenChange: () => void;
  tableToRender: QueryTable;
  callbackFunction: (table: QueryTable, params: {}) => void;
}

export default function SeasonTeamInputModal(props: ChildProps) {

  const [selectedSeasonKeys, setSelectedSeasonKeys] = useState(
    new Set(["2012-2013"]),
  );
  const [selectedTeamKeys, setSelectedTeamKeys] = useState(
    new Set(["Ducks"]),
  );

  const [loading, setIsLoading] = useState(false);

  const selectedSeason = useMemo(
    () => Array.from(selectedSeasonKeys).join(", "),
    [selectedSeasonKeys],
  );

  const selectedTeam = useMemo(
    () => Array.from(selectedTeamKeys).join(", "),
    [selectedTeamKeys],
  );

  const handleSubmit = async () => {
    setIsLoading(true);
    props.callbackFunction(props.tableToRender, {
      teamName: selectedTeam,
      seasonName: selectedSeason,
    });
    await new Promise((resolve) => setTimeout(resolve, 500));
    resetForm();
    props.onOpenChange();
    setIsLoading(false);
  };

  const resetForm = () => {
    setSelectedSeasonKeys(new Set(["2012-2013"]));
    setSelectedTeamKeys(new Set(["Ducks"]));
  };

  return (
    <>
      <Modal
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-700 to-zinc-700/10 backdrop-opacity-20",
          body: "justify-center flex-row flex-wrap px-0 py-0 gap-4",
        }}
        isOpen={props.isOpen}
        placement="top-center"
        size={"xl"}
        onClose={resetForm}
        onOpenChange={props.onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Select Season and Team
              </ModalHeader>
              <ModalBody>
                <ListboxWrapper>
                  <Listbox
                    disallowEmptySelection
                    aria-label="Single selection example"
                    selectedKeys={selectedSeasonKeys}
                    selectionMode="single"
                    variant="faded"
                    onSelectionChange={(keys) =>
                      setSelectedSeasonKeys(keys as Set<string>)
                    }
                  >
                    {seasons.map((season) => (
                      <ListboxItem key={season}>{season}</ListboxItem>
                    ))}
                  </Listbox>
                </ListboxWrapper>
                <ListboxWrapper>
                  <Listbox
                    disallowEmptySelection
                    isVirtualized
                    aria-label="Single selection example"
                    selectedKeys={selectedTeamKeys}
                    selectionMode="single"
                    variant="faded"
                    virtualization={{
                      maxListboxHeight: 275,
                      itemHeight: 40,
                    }}
                    onSelectionChange={(keys) =>
                      setSelectedTeamKeys(keys as Set<string>)
                    }
                  >
                    {teams.map((team: Team) => (
                      <ListboxItem
                        key={team.team_name}
                        startContent={
                          <img
                            alt={"Logo"}
                            height={30}
                            src={team.team_logo}
                            width={30}
                          />
                        }
                      >
                        <p>
                          {team.team_city} {team.team_name}
                        </p>
                      </ListboxItem>
                    ))}
                  </Listbox>
                </ListboxWrapper>
                <p className="text-small text-default-500">
                  Season to Display: {selectedSeason} {selectedTeam}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
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
    </>
  );
}
