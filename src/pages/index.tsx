// import { Link } from "@heroui/link";
// import { Snippet } from "@heroui/snippet";
// import { Code } from "@heroui/code";
// import { button as buttonStyles } from "@heroui/theme";

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

export default function IndexPage() {
  const [menuVisible, setMenuVisible] = useState<boolean>(true);
  const [childData, setChildData] = useState(""); // to display from the child
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // for modal

  // a function is passed to the child component (callback function)
  // so then this funtion is 'called' in the child with the
  const handleChildData = (first: string, last: string) => {
    //console.log("Received data from child:", first, first);
    setChildData(first + " " + last);
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

  return (
    <DefaultLayout>
      <div className="pb-4">
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

        <div className={`${menuVisible ? "" : "hidden"} items-center mt-2 p-2 bg-default/10 shadow-gray-400 rounded-2xl`}>
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
      <TestTable />

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
