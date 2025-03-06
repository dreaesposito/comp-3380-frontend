import { querySubtitle, queryTitle } from "@/components/primitives";
import { QueryTabs } from "@/types/queryTabs";
import { Listbox, ListboxItem } from "@heroui/listbox";
  
export default function Queries({selectedKey}: {selectedKey: QueryTabs}) {
  const queryComponents: Map<QueryTabs, [{id: number, label: string, description: string}]> = new Map([
    [QueryTabs.skaters, [
        {id: 1, label: "Find NHL Players", description: "Retrieve all NHL players from the database."}
        
    ]],
    [QueryTabs.goalies, [
        {id: 2, label: "Top Goal Scorers", description: "Get the top 10 goal scorers of the season asdlkf  aslka sd alaskd f alasdkf alaksdf ."}
    ]],
    [QueryTabs.teams, [
        {id: 3, label: "Winning Teams", description: "Find teams with the most wins."}
    ]],
  ]);


  return (
    <Listbox className="horizontal-listbox">
        {queryComponents.get(selectedKey)!.map(query =>
            <ListboxItem key={query.id} className="flex flex-col">
                <span className={queryTitle()}>
                {query.label}
                </span>
                <span className={querySubtitle()}>
                {query.description}
                </span>
            </ListboxItem>
        )}
    </Listbox>
  )
}