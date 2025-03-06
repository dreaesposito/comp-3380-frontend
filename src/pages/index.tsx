
import { Tab, Tabs } from "@heroui/tabs";
import DefaultLayout from "@/layouts/default";
import Queries from "./queries";

export default function IndexPage() {
  const tabs = [
    {
      id: "0",
      label: "Skaters",
      content: "list queries"
    },
    {
      id: "1",
      label: "Goalies",
      content: "list quries"
    },
    {
      id: "2",
      label: "Teams",
      content: "list queries"
    }
  ]

  const queries = [
    { id: "1", label: "Find NHL Players", description: "Retrieve all NHL players from the database." },
    { id: "2", label: "Top Goal Scorers", description: "Get the top 10 goal scorers of the season asdlkf  aslka sd alaskd f alasdkf alaksdf ." },
    { id: "3", label: "Winning Teams", description: "Find teams with the most wins." },
  ];


  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-start">
        <div className="text-center">
          <Tabs aria-label="Dynamic tabs" items={tabs}>
            {(item) => (
              <Tab key={item.id} title={item.label} className="flex flex-row">
                    <Queries/>
              </Tab>
            )}
          </Tabs>
        </div>
      </section>
    </DefaultLayout>
  );
}