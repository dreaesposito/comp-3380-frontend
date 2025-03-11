import { querySubtitle, queryTitle } from "@/components/primitives";
import { QueryTabs } from "@/types/QueryTabs";
import { Listbox, ListboxItem } from "@heroui/listbox";
import QueryInput from "./QueryInput";
  
export default function Queries({selectedKey}: {selectedKey: QueryTabs}) {
  const queryComponents: Map<QueryTabs, {id: number, label: string, description: string}[]> = new Map([
    [QueryTabs.skaters, [
        {id: 1, label: "Find skaters", description: "Search for a skater by name"},
        {id: 2, label: "Top Point/Goal/Assist Scorers", description: "Determine which players had the most points, goals, or assits in a season"},
    ]],
    [QueryTabs.goalies, [
        {id: 1, label: "Best save percentage", description: "Determine which goalies had the best save percentage in a season"},
    ]],
    [QueryTabs.teams, [
        {id: 1, label: "Winning Teams", description: "Find teams with the most wins in a season."},
        {id: 2, label: "Schedule", description: "Find the schedule for a team in a season."}
    ]],
  ]);


  return (
    <>
      <Listbox className="horizontal-listbox">
          {queryComponents.get(selectedKey)!.map(query =>
              <ListboxItem key={query.id}>
                  <span className={queryTitle()}>
                  {query.label}
                  </span>
                  <span className={querySubtitle()}>
                  {query.description}
                  </span>
              </ListboxItem>
          )}
      </Listbox>

      <QueryInput/>
    </>
  );
}