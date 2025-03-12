import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { Tab, Tabs } from "@heroui/tabs";
import { title, querySubtitle as subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import Queries from "./queries";
import { QueryTabs } from "@/types/QueryTabs";

export default function IndexPage() {
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

  return (
    <DefaultLayout>
      <section className="items-center justify-start">
        <div className="text-center">
          <Tabs aria-label="Dynamic tabs" items={tabs}>
            {(item) => (
              <Tab key={item.id} title={item.label}>
                <Queries selectedKey={item.id} />
              </Tab>
            )}
          </Tabs>
        </div>
      </section>

      <h1>Testing 123</h1>

      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Make&nbsp;</span>
          <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
          <br />
          <span className={title()}>
            websites regardless of your design experience.
          </span>
          <div className={subtitle({ class: "mt-4" })}>
            Beautiful, fast and modern React UI library.
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href="/aege"
          >
            Not found page
          </Link>
          <Link
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href="/blog"
          >
            <GithubIcon size={20} />
            Default Table
          </Link>
          <Link
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href="/docs"
          >
            <GithubIcon size={20} />
            All Players Call
          </Link>
        </div>

        <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Get started by editing{" "}
              <Code color="primary">pages/index.tsx</Code>
            </span>
          </Snippet>
        </div>
      </section>
    </DefaultLayout>
  );
}
