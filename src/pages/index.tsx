import { useState } from "react";
import { Tab, Tabs } from "@heroui/tabs";
import { Button } from "@heroui/react";

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
import PlayerSeasonStats from "@/components/tables/playerSeasonStats";

export default function IndexPage() {
  const [menuVisible, setMenuVisible] = useState<boolean>(true);
  const [tableParams, setTableParams] = useState<any>();
  const [renderedTable, setRenderedTable] = useState<Table>(
    Table.DEFAULT, // Starting table for the page
  );

  const activateTable = (table: Table, params: any) => {
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
      case Table.TotalGoalsByTeam:
        return <TotalGoalsByTeam {...tableParams} />;
      case Table.TotalGAP:
        return <TotalGAP {...tableParams} />; // Rendered table by default
      case Table.AvgShiftByPlay:
        return <AvgShiftByPlay />;
      case Table.AvgShiftByPeriod:
        return <AvgShiftByPeriod />;
      case Table.GoalsByVenue:
        return <GoalsByVenue {...tableParams} />;
      case Table.TopNoOfficialPenalties:
        return <TopNoOfficialPenalties {...tableParams} />;
      case Table.TopTeamsPlayedFor:
        return <TopTeamsPlayedFor {...tableParams} />;
      case Table.TopPlayersPenalties:
        return <TopPlayersPenalties {...tableParams} />;
      case Table.TotalPlayoffWins:
        return <TotalPlayoffWins {...tableParams} />;
      case Table.PlayersScoredAgainstAllTeams:
        return <PlayersScoredAgainstAllTeams />;
      case Table.Top25ByStat:
        return <Top25ByStat {...tableParams} />;
      case Table.AvgGoalsPerShot:
        return <AvgGoalsPerShot {...tableParams} />;
      case Table.AllTeams:
        return <AllTeams />;
      case Table.SearchPlayer:
        return <SearchPlayer {...tableParams}/>;
      case Table.Schedule:
        return <Schedule {...tableParams} />;
      case Table.PlayerSeasonStats:
        return <PlayerSeasonStats {...tableParams}/>
      case Table.DEFAULT:
        return <TestTable />;
      default:
        return null; // shouldn't happen
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
