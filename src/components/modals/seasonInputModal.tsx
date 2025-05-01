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

import { Table } from "@/types/Table.ts";

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
  <div className="w-[250px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

interface ChildProps {
  isOpen: boolean;
  onOpenChange: () => void;
  tableToRender: Table;
  callbackFunction: (table: Table, params: {}) => void;
}


export default function SeasonInputModal(props: ChildProps) {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["2012-2013"]));
  const [loading, setIsLoading] = useState(false);
  const selectedSeason = useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys],
  );

  const handleSubmit = async () => {
    setIsLoading(true);
    props.callbackFunction(props.tableToRender, {
      selectedSeason: selectedSeason,
    });
    await new Promise((resolve) => setTimeout(resolve, 500));
    resetForm();
    props.onOpenChange();
    setIsLoading(false);
  };

  const resetForm = () => {
    setSelectedKeys(new Set(["2012-2013"]));
  };

  return (
    <>
      <Modal
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-700 to-zinc-700/10 backdrop-opacity-20",
          body: "justify-center items-center",
        }}
        size={"xs"}
        isOpen={props.isOpen}
        placement="top-center"
        onClose={resetForm}
        onOpenChange={props.onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Select Season
              </ModalHeader>
              <ModalBody>
                <ListboxWrapper>
                  <Listbox
                    disallowEmptySelection
                    aria-label="Single selection example"
                    selectedKeys={selectedKeys}
                    selectionMode="single"
                    variant="faded"
                    onSelectionChange={(keys) =>
                      setSelectedKeys(keys as Set<string>)
                    }
                  >
                    {seasons.map((season) => (
                      <ListboxItem key={season}>{season}</ListboxItem>
                    ))}
                  </Listbox>
                </ListboxWrapper>
                <p className="text-small text-default-500">
                  Season to Display: {selectedSeason}
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
