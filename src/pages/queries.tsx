import { QueryTabs } from "@/types/QueryTabs";

import {
  Card,
  CardBody,
  CardHeader,
  ScrollShadow,
} from "@heroui/react";

export default function Queries({
  selectedKey,
  emitToParent,
}: {
  selectedKey: QueryTabs;
  emitToParent: (firstName: any, lastName: any) => void;
}) {
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");

  // // send the data from the modal to the parent
  // const handleFormSubmit = () => {
  //   emitToParent(firstName, lastName);
  //   resetForm();
  //   onOpenChange();
  // };

  // const resetForm = () => {
  //   setFirstName("");
  //   setLastName("");
  // };

  // const handleModalSelection = (queryKey: number, id: number) => {
  //   onOpen(); // open the modal
  //   console.log(`Query key: ${queryKey}, ID:${id}`);
  // };

  const queryComponents: Map<
    QueryTabs,
    { id: number; label: string; description: string }[]
  > = new Map([
    [
      QueryTabs.skaters,
      [
        {
          id: 1,
          label: "Find skaters",
          description: "Search for a skater by name",
        },
        {
          id: 2,
          label: "Top Point/Goal/Assist Scorers",
          description:
            "Determine which players had the most points, goals, or assists in a season",
        },
        {
          id: 3,
          label: "Test Query",
          description: "123 test description",
        },
        {
          id: 4,
          label: "Another tes",
          description: "owengowenowie go owigeo wi owieg ",
        },
        {
          id: 5,
          label: "Test Query",
          description: "123 test description",
        },
        {
          id: 6,
          label: "Test Query",
          description: "123 test description",
        },
        {
          id: 7,
          label: "Top Point/Goal/Assist Scorers",
          description:
            "Determine which players had the most points, goals, or assists in a season",
        },
      ],
    ],
    [
      QueryTabs.goalies,
      [
        {
          id: 1,
          label: "Best save percentage",
          description:
            "Determine which goalies had the best save percentage in a season",
        },
      ],
    ],
    [
      QueryTabs.teams,
      [
        {
          id: 1,
          label: "Winning Teams",
          description: "Find teams with the most wins in a season.",
        },
        {
          id: 2,
          label: "Schedule",
          description: "Find the schedule for a team in a season.",
        },
      ],
    ],
  ]);



  return (
    // <ScrollShadow 
    //   orientation="horizontal"
    //   className="overflow-x-scroll scrollbar-hide"
    // > 
      <div className="flex flex-wrap"> {/* remove flex wrap, add w-max and uncomment scroll shadow to get scroll functionality*/}
          {queryComponents.get(selectedKey)!.map((query) => (
            <Card
              key={query.id}
              shadow="sm"
              className="min-w-[200px] max-w-[300px] h-[150px] m-2 flex-none"
              isHoverable={true}
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
  //  </ScrollShadow>
  );
}


   {/* <QueryInput />
      <Modal
        isOpen={isOpen}
        placement="top-center"
        onClose={resetForm}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Header
              </ModalHeader>
              <ModalBody>
                <Input
                  // endContent={<h1>endContent</h1>}
                  isClearable
                  label="First Name"
                  placeholder=""
                  value={firstName}
                  variant="bordered"
                  onValueChange={setFirstName}
                />
                <Input
                  // endContent={<h1>endContent</h1>}
                  isClearable
                  label="Last Name"
                  placeholder=""
                  value={lastName}
                  variant="bordered"
                  onValueChange={setLastName}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  variant="solid"
                  onPress={handleFormSubmit}
                >
                  Enter
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal> */}