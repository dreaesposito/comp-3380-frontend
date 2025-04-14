import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import React from "react";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";

interface ChildProps {
  emitData: (season: number, table: string) => void;
  tableCode: string;
}

export default function RowInputModal(props: ChildProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [numRows, setNumRows] = React.useState("");
  const errors: string[] = [];

  const handleSubmit = () => {
    props.emitData(Number(numRows), props.tableCode);
    resetForm();
    onOpenChange();
  };

  const resetForm = () => {
    setNumRows("");
  };

  if (
    !numRows.match(/^\d+$/) ||
    Number(numRows) < 1 ||
    Number(numRows) > 2000
  ) {
    errors.push("Value must be a valid integer between 1 and 2000");
  }

  return (
    <>
      <Button onPress={onOpen}>RowInputModal</Button>
      <Modal
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        isOpen={isOpen}
        placement="top-center"
        onClose={resetForm}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Number of Rows to Display
              </ModalHeader>
              <ModalBody>
                <Form className="w-full max-w-xs" onSubmit={handleSubmit}>
                  <Input
                    errorMessage={() => (
                      <ul>
                        {errors.map((error, i) => (
                          <li key={i}>{error}</li>
                        ))}
                      </ul>
                    )}
                    isInvalid={errors.length > 0}
                    name="password"
                    placeholder="Enter a number"
                    value={numRows}
                    onValueChange={setNumRows}
                  />
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  isDisabled={errors.length > 0}
                  variant="solid"
                  onPress={handleSubmit}
                >
                  Search DB
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
