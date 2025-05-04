import { QueryTabs } from "@/types/QueryTabs";
import { QueryTable } from "@/types/Table.ts";
import { Modal } from "@/types/Modal.ts";
import * as TableInfo from "@/types/TableInfo.ts";

import {
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@heroui/react";
import RowInputModal from "@/components/modals/rowInputModal";
import SeasonInputModal from "@/components/modals/seasonInputModal";
import FirstLastInputModal from "@/components/modals/firstLastInputModal";
import SeasonTeamInputModal from "@/components/modals/seasonTeamInputModal";
import { useState } from "react";

export default function Queries({
  selectedKey,
  onModalSubmission,
}: {
  selectedKey: QueryTabs;
  onModalSubmission: (table: QueryTable, params: any) => void;
}) {
  const queryComponents: Map<
    QueryTabs,
    { id: number, label: string; description: string, tableInfo: TableInfo.NHLTableInfo }[]
  > = new Map([
    [
      QueryTabs.players,
      [
        {
          id: 1,
          label: "Team History",
          description: "Show a player's team history",
          tableInfo: TableInfo.TeamHistoryInfo
        },
        {
          id: 2,
          label: "Season Stats",
          description: "Determine the stats of a player in a particular season",
          tableInfo: TableInfo.PlayerSeasonStatsInfo
        }
        ,{
          id: 3,
          label: "Players Scored Against All Teams",
          description: "Find players who have scored against every time in the league, including their own team",
          tableInfo: TableInfo.PlayersScoredAgainstAllTeamsInfo
        },
        {
          id: 4,
          label: "Top 25 Players By Statistic",
          description: "Determine the top 25 players by a particular statistic. Options include: Goals, Assists, Points, and Plus/Minus",
          tableInfo: TableInfo.Top25ByStatInfo
        },
        {
          id: 5,
          label: "Most Penalties",
          description: "Find players who have taken the most penalties",
          tableInfo: TableInfo.TopPlayersPenaltiesInfo
        },
        {
          id: 6,
          label: "Top Teams Played For",
          description: "Find the biggest suitcases in the league",
          tableInfo: TableInfo.TopTeamsPlayedForInfo
        },
        {
          id: 7,
          label: "Total Goals/Assists/Points",
          description: "Find the total goals, assists, and points for a player",
          tableInfo: TableInfo.TotalGAPInfo
        },
        {
          id: 8,
          label: "Total Goals By Team",
          description: "Determine how many goals a player has scored against each team in the league",
          tableInfo: TableInfo.TotalGoalsByTeamInfo
        }
      ],
    ],
    [
      QueryTabs.teams,
      [
        {
          id: 1,
          label: "All Teams",
          description: "Find all teams in the league",
          tableInfo: TableInfo.AllTeamsInfo
        },
        {
          id: 2,
          label: "Playoff Wins",
          description: "Find the total playoff wins for a team in a season",
          tableInfo: TableInfo.TotalPlayoffWinsInfo
        },
        {
          id: 3,
          label: "Schedule",
          description: "Determine the schedule for a team in a season",
          tableInfo: TableInfo.ScheduleInfo
        }
      ],
    ],
    [
      QueryTabs.misc,
      [
        {
          id: 1,
          label: "Average Shift By Period",
          description: "Find the average shift length per period",
          tableInfo: TableInfo.AvgShiftByPeriodInfo
        },
        {
          id: 2, 
          label: "Average Goals Per Shot",
          description: "Find the average goals per shot for a player",
          tableInfo: TableInfo.AvgGoalsPerShotInfo
        },
        {
          id: 3,
          label: "Average Shift By Play",
          description: "Determine the average shift length for a specific play type",
          tableInfo: TableInfo.AvgShiftByPlayInfo
        },
        {
          id: 4,
          label: "Goals By Venue",
          description: "Determine the number of goals (home and away) scored at each venue in a season",
          tableInfo: TableInfo.GoalsByVenueInfo
        },
        {
          id: 5,
          label: "Top Official Penalties",
          description: "Find the top officials who have called the most penalties in their career",
          tableInfo: TableInfo.TopNoOfficialPenaltiesInfo     
        }
      ],
    ],
  ]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currModal, setCurrModal] = useState<Modal | null>(null);
  const [tableToRender, setTableToRender] = useState<QueryTable>(
    QueryTable.DEFAULT, // Next user selection (might require more info from modal before rendering)
  );

  function prepareTable(current: TableInfo.NHLTableInfo) {
    setTableToRender(current.table); // table for the modal to render
    if (current.modal !== Modal.None) {
      openModal(current.modal);
    } else {
      onModalSubmission(current.table, null);
    }
  }

  const modalProps = {  
    isOpen: isOpen,
    onOpenChange: onOpenChange,
    tableToRender: tableToRender,
    callbackFunction: onModalSubmission,
  };

  function modalRenderSwitch() {
    switch (currModal) {
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

  return (
    <>
      <div className="flex flex-wrap">
          {queryComponents.get(selectedKey)!.map((query) => (
            <Card
              key={query.id}
              shadow="sm"
              className="min-w-[200px] max-w-[300px] h-[150px] m-2 flex-none"
              isHoverable={true}
              isPressable
              onPress={() => prepareTable(query.tableInfo)}
            >
              <CardHeader>
                <span className="whitespace-nowrap">{query.label}</span>
              </CardHeader>
              <CardBody>
                <span>
                  {query.description}
                </span>
              </CardBody>
            </Card>
          ))}
      </div>

      {modalRenderSwitch()}
    </>
  );
}