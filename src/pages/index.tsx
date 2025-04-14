// import { Link } from "@heroui/link";
// import { Snippet } from "@heroui/snippet";
// import { Code } from "@heroui/code";
// import { button as buttonStyles } from "@heroui/theme";
import { ReactElement } from "react";
import TotalGoalsByTeam from "@/components/tables/totalGoalsByTeam.tsx";
import TotalGAP from "@/components/tables/totalGAP.tsx";
import AvgShiftByPlay from "@/components/tables/avgShiftByPlay.tsx";
import GoalsByVenue from "@/components/tables/goalsByVenue.tsx";
import { Tab, Tabs } from "@heroui/tabs";
// import { title, querySubtitle as subtitle } from "@/components/primitives";
// import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import Queries from "./queries";
import { QueryTabs } from "@/types/QueryTabs";
import { TestTable } from "@/pages/blog.tsx";
import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Link } from "@heroui/link";
import TopNoOfficialPenalties from "@/components/tables/topNoOfficialPenalties.tsx";
import TopTeamsPlayedFor from "@/components/tables/topTeamsPlayedFor.tsx";
import TopPlayersPenalties from "@/components/tables/topPlayersPenalties.tsx";
import AvgShiftByPeriod from "@/components/tables/avgShiftByPeriod.tsx";
import RowInputModal from "@/components/selection-modals/RowInputModal.tsx";

export default function IndexPage() {
  const [menuVisible, setMenuVisible] = useState<boolean>(true);
  const [childData, setChildData] = useState(""); // to display from the child
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // for modal
  const [currTable, setCurrTable] = useState<string>("totalGoalsByTeam"); // to toggle which table is rendered

  // a function is passed to the child component (callback function)
  // so then this funtion is 'called' in the child with the
  const handleChildData = (first: string, last: string) => {
    //console.log("Received data from child:", first, first);
    setChildData(first + " " + last);
  };


  const handleRowData = (numRows: number, tableCode: string) => {
    setChildData(numRows);
    setCurrTable(tableCode);
  };

  const tabs = [
    {
      id: QueryTabs.skaters,
      label: "Skaters",
    },
    {
      id: QueryTabs.goalies,
      label: "Goalies",
    },
    {
      id: QueryTabs.teams,
      label: "Teams",
    },
  ];

  function tableRenderSwitch(param: string): ReactElement {
    switch (param) {
      case "totalGoalsByTeam":
        return <TotalGoalsByTeam first="Claude" last="Giroux" />;
      case "totalGAP":
        return <TotalGAP first="Sidney" last="Crosby" />;
      case "avgShiftByPlay":
        return <AvgShiftByPlay />;
      case "avgShiftByPeriod":
        return <AvgShiftByPeriod />;
      case "goalsByVenue":
        return <GoalsByVenue season="2018-2019" />;
      case "topNoOfficialPenalties":
        return <TopNoOfficialPenalties numRows={25} />;
      case "topTeamsPlayedFor":
        return <TopTeamsPlayedFor numRows={20} />;
      case "topPlayersPenalties":
        return <TopPlayersPenalties numRows={Number(childData)} />; // Experiment

      default:
        return <TestTable />;
    }
  }

  return (
    <DefaultLayout>
      <div className="pb-4">
        <RowInputModal
          emitData={handleRowData}
          tableCode="topPlayersPenalties"
        />

        <div className="flex gap-3">
          <Button
            className="text-default-500"
            endContent={
              menuVisible ? (
                <i className="bi bi-arrow-up" />
              ) : (
                <i className="bi bi-arrow-down" />
              )
            }
            size={"sm"}
            variant="bordered"
            onPress={() => setMenuVisible(!menuVisible)}
          >
            {`${menuVisible ? "Hide" : "Show"} Queries`}
          </Button>

          <Link
            aria-label="Query info"
            className="text-default-400 text-sm hover:opacity-75 hover:cursor-pointer"
            onPress={onOpen}
          >
            <i className="bi bi-question-circle text-lg"></i>
          </Link>
        </div>

        <div
          className={`${menuVisible ? "" : "hidden"} items-center mt-2 p-2 bg-default/10 shadow-gray-400 rounded-2xl`}
        >
          <Tabs
            className="content-center"
            isVertical
            aria-label="Dynamic tabs"
            items={tabs}
          >
            {(item) => (
              <Tab key={item.id} title={item.label}>
                <Queries emitToParent={handleChildData} selectedKey={item.id} />
                {/*<DisplayTables selectedKey={item.id} />*/}
                {childData}
              </Tab>
            )}
          </Tabs>
        </div>
      </div>

      {/*Table type for each Query type*/}
      {tableRenderSwitch(currTable)}

      {/*info modal popup*/}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                How to select a query
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </DefaultLayout>
  );
}
