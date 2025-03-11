
import { Tab, Tabs } from "@heroui/tabs";
import DefaultLayout from "@/layouts/default";
import Queries from "./queries";
import { QueryTabs } from "@/types/QueryTabs";

export default function IndexPage() {
  const tabs = [
    {
      id: QueryTabs.skaters,
      label: "Skaters"
    },
    {
      id: QueryTabs.goalies,
      label: "Goalies"
    },
    {
      id: QueryTabs.teams,
      label: "Teams"
    }
  ];

  return (
    <DefaultLayout>
      <section className="items-center justify-start">
        <div className="text-center">
          <Tabs aria-label="Dynamic tabs" items={tabs}>
            {(item) => (
              <Tab key={item.id} title={item.label}>
                    <Queries selectedKey={item.id}/>
              </Tab>
            )}
          </Tabs>
        </div>
      </section>
    </DefaultLayout>
  );
}