import { ReactElement, useState } from "react";
import { Tab, Tabs } from "@heroui/tabs";
import { Button, useDisclosure } from "@heroui/react";
import { Link } from "@heroui/link";

import Queries from "./queries";

import TotalGoalsByTeam from "@/components/tables/totalGoalsByTeam.tsx";
import TotalGAP from "@/components/tables/totalGAP.tsx";
import AvgShiftByPlay from "@/components/tables/avgShiftByPlay.tsx";
import GoalsByVenue from "@/components/tables/goalsByVenue.tsx";
import DefaultLayout from "@/layouts/default";
import { QueryTabs } from "@/types/QueryTabs";
import { TestTable } from "@/pages/blog.tsx";
import TopNoOfficialPenalties from "@/components/tables/topNoOfficialPenalties.tsx";
import TopTeamsPlayedFor from "@/components/tables/topTeamsPlayedFor.tsx";
import TopPlayersPenalties from "@/components/tables/topPlayersPenalties.tsx";
import AvgShiftByPeriod from "@/components/tables/avgShiftByPeriod.tsx";
import TotalPlayoffWins from "@/components/tables/totalPlayoffWins";
import PlayersScoredAgainstAllTeams from "@/components/tables/playersScoredAgainstAllTeams";
import Top25ByStat from "@/components/tables/top25ByStat";
import AvgGoalsPerShot from "@/components/tables/avgGoalsPerShot";
import AllTeams from "@/components/tables/allTeams";
import SearchPlayer from "@/components/tables/searchPlayer";
import Schedule from "@/components/tables/schedule";
import { Table } from "@/types/Table.ts";
import { Modal } from "@/types/Modal.ts";
import InfoModal from "@/components/modals/infoModal.tsx";
import RowInputModal from "@/components/modals/rowInputModal.tsx";
import SeasonInputModal from "@/components/modals/seasonInputModal.tsx";
import FirstLastInputModal from "@/components/modals/firstLastInputModal.tsx";
import * as TableInfo from "@/types/TableInfo.ts";
import SeasonTeamInputModal from "@/components/modals/seasonTeamInputModal.tsx";

export default function IndexPage() {
  const [menuVisible, setMenuVisible] = useState<boolean>(true);

  // needed for rendering a modal and knowing which table
  // to render when its completed
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currModal, setCurrModal] = useState<Modal | null>(null);
  const [tableToRender, setTableToRender] = useState<Table>(
    Table.DEFAULT, // Next user selection (might require more info from modal before rendering)
  );

  // needed for actually rendering a table
  const [tableParams, setTableParams] = useState<any>();
  const [renderedTable, setRenderedTable] = useState<Table>(
    Table.AvgGoalsPerShot, // Starting table for the page
  );

  const activateTable = (table: Table, params: any) => {
    setTableParams(params);
    setRenderedTable(table);
  };

  const modalProps = {
    isOpen: isOpen,
    onOpenChange: onOpenChange,
    tableToRender: tableToRender,
    callbackFunction: activateTable,
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

  function tableRenderSwitch(param: Table): ReactElement | null {
    switch (param) {
      case Table.TotalGoalsByTeam:
        return <TotalGoalsByTeam {...tableParams} />;
      case Table.TotalGAP:
        return <TotalGAP {...{ playerId: "8458529", firstName: "Alex", lastName: "Kovalev" }} />; // Rendered table by default
      case Table.AvgShiftByPlay:
        return <AvgShiftByPlay />;
      case Table.AvgShiftByPeriod:
        return <AvgShiftByPeriod />;
      case Table.GoalsByVenue:
        return <GoalsByVenue {...tableParams} />;
      case Table.TopNoOfficialPenalties:
        return <TopNoOfficialPenalties numRows={25} />;
      case Table.TopTeamsPlayedFor:
        return <TopTeamsPlayedFor numRows={20} />;
      case Table.TopPlayersPenalties:
        return <TopPlayersPenalties {...tableParams} />;
      case Table.TotalPlayoffWins:
        return <TotalPlayoffWins {...tableParams} />;
      case Table.PlayersScoredAgainstAllTeams:
        return <PlayersScoredAgainstAllTeams />;
      case Table.Top25ByStat:
        return <Top25ByStat season="2015-2016" stat="goals" />;
      case Table.AvgGoalsPerShot:
        return <AvgGoalsPerShot {...{firstName: "Tom", lastName: "Wilson" }} />;
      case Table.AllTeams:
        return <AllTeams />;
      case Table.SearchPlayer:
        return <SearchPlayer name="alex" />;
      case Table.Schedule:
        return (
          <Schedule end_year="2016" start_year="2015" team_name="Rangers" />
        );
      case Table.DEFAULT:
        return <TestTable />;
      default:
        return null; // shouldn't happen
    }
  }

  function modalRenderSwitch(param: Modal | null): ReactElement | null {
    switch (param) {
      case Modal.InfoModal:
        return <InfoModal {...modalProps} />;
      case Modal.RowInput:
        return <RowInputModal {...modalProps} />;
      case Modal.SeasonInput:
        return <SeasonInputModal {...modalProps} />;
      case Modal.FirstLastInput:
        return <FirstLastInputModal {...modalProps} />;
      case Modal.SeasonTeamInput:
        return <SeasonTeamInputModal {...modalProps} />;
      default:
        return null; // shouldn't happen
    }
  }

  function openModal(param: Modal) {
    setCurrModal(param);
    onOpen();
  }

  // modal will trigger a table update once proper info is submitted
  function prepareTable(current: TableInfo.NHLTableInfo) {
    setTableToRender(current.table); // table for the modal to render
    if (current.modal !== Modal.None) {
      openModal(current.modal);
    }
  }

  return (
    <DefaultLayout>
      <div className="pb-4">
        <Button onPress={() => prepareTable(TableInfo.TopPlayersPenaltiesInfo)}>
          TopPlayersPenalties
        </Button>

        <Button onPress={() => prepareTable(TableInfo.GoalsByVenueInfo)}>
          GoalsByVenue
        </Button>

        <Button onPress={() => prepareTable(TableInfo.TotalGoalsByTeamInfo)}>
          GoalsByTeam
        </Button>

        <Button onPress={() => prepareTable(TableInfo.TotalPlayoffWinsInfo)}>
          TotalPlayoffWins
        </Button>

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
            onPress={() => openModal(Modal.InfoModal)}
          >
            <i className="bi bi-question-circle text-lg" />
          </Link>
        </div>

        <div
          className={`${menuVisible ? "" : "hidden"} items-center mt-2 p-2 bg-default/10 shadow-gray-400 rounded-2xl`}
        >
          <Tabs
            isVertical
            aria-label="Dynamic tabs"
            className="content-center"
            items={tabs}
          >
            {(item) => (
              <Tab key={item.id} title={item.label}>
                <Queries emitToParent={activateTable} selectedKey={item.id} />
              </Tab>
            )}
          </Tabs>
        </div>
      </div>

      {/*Table type for each Query type*/}
      {tableRenderSwitch(renderedTable)}

      {/*conditional modal rendering*/}
      {modalRenderSwitch(currModal)}
    </DefaultLayout>
  );
}
