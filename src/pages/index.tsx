import { useState } from "react";
import { Tab, Tabs } from "@heroui/tabs";
import { Button } from "@heroui/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@heroui/table";

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
import { QueryTable } from "@/types/Table.ts";
import PlayerSeasonStats from "@/components/tables/playerSeasonStats";

export default function IndexPage() {
  const [menuVisible, setMenuVisible] = useState<boolean>(true);
  const [tableParams, setTableParams] = useState<any>();
  const [renderedTable, setRenderedTable] = useState<QueryTable>() // Starting table for the page

  const activateTable = (table: QueryTable, params: any) => {
    setTableParams(params);
    setRenderedTable(table);
  };

  const tabs = [
    {
      id: QueryTabs.players,
      label: "Players",
    },
    {
      id: QueryTabs.teams,
      label: "Teams",
    },
    {
      id: QueryTabs.misc,
      label: "Misc.",
    },
  ];

  function tableRenderSwitch() {
    switch (renderedTable) {
      case QueryTable.TotalGoalsByTeam:
        return <TotalGoalsByTeam {...tableParams} />;
      case QueryTable.TotalGAP:
        return <TotalGAP {...tableParams} />; // Rendered table by default
      case QueryTable.AvgShiftByPlay:
        return <AvgShiftByPlay />;
      case QueryTable.AvgShiftByPeriod:
        return <AvgShiftByPeriod />;
      case QueryTable.GoalsByVenue:
        return <GoalsByVenue {...tableParams} />;
      case QueryTable.TopNoOfficialPenalties:
        return <TopNoOfficialPenalties {...tableParams} />;
      case QueryTable.TopTeamsPlayedFor:
        return <TopTeamsPlayedFor {...tableParams} />;
      case QueryTable.TopPlayersPenalties:
        return <TopPlayersPenalties {...tableParams} />;
      case QueryTable.TotalPlayoffWins:
        return <TotalPlayoffWins {...tableParams} />;
      case QueryTable.PlayersScoredAgainstAllTeams:
        return <PlayersScoredAgainstAllTeams />;
      case QueryTable.Top25ByStat:
        return <Top25ByStat {...tableParams} />;
      case QueryTable.AvgGoalsPerShot:
        return <AvgGoalsPerShot {...tableParams} />;
      case QueryTable.AllTeams:
        return <AllTeams />;
      case QueryTable.SearchPlayer:
        return <SearchPlayer {...tableParams}/>;
      case QueryTable.Schedule:
        return <Schedule {...tableParams} />;
      case QueryTable.PlayerSeasonStats:
        return <PlayerSeasonStats {...tableParams}/>
      default:
        return (
          <Table
            isHeaderSticky
            removeWrapper
          >
            <TableHeader>
              <TableColumn>{""}</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"Select a query to get started"}>
              {[]}
            </TableBody>
            
          </Table>
        )
    }
  }


  const hideQueriesButton = () => {
    return (
      <Button
        className="ml-3"
        endContent={
          menuVisible ? (
            <i className="bi bi-arrow-up" />
          ) : (
            <i className="bi bi-arrow-down" />
          )
        }
        variant="bordered"
        onPress={() => setMenuVisible(!menuVisible)}
      >
        {`${menuVisible ? "Hide" : "Show"} Queries`}
      </Button>
    )
  }

  const queryOptions = () => {
    return (
      <div className="block w-full">
        <div className="flex w-full justify-start flex-wrap">
          { menuVisible ? (
            <>
              {hideQueriesButton()}
              <Tabs
                aria-label="Dynamic tabs"
                variant="underlined"
                items={tabs}
                classNames={{
                  panel: "block w-full",
                }}

              >
                {(item) => (
                  <Tab key={item.id} title={item.label}>
                      <Queries onModalSubmission={activateTable} selectedKey={item.id} />
                  </Tab>
                )}
              </Tabs>
            </>
          ) : (
            <>
              {hideQueriesButton()}
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <DefaultLayout>
      {queryOptions()}

      {tableRenderSwitch()}
    </DefaultLayout>
  );
}
