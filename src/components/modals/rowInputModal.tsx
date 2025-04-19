import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import React, { useState } from "react";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";

import { Table } from "@/types/Table.ts";

interface ChildProps {
  isOpen: boolean;
  onOpenChange: () => void;
  tableToRender: Table;
  callbackFunction: (table: Table, params: {}) => void;
}

export default function RowInputModal(props: ChildProps) {
  const [numRows, setNumRows] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [loading, setIsLoading] = useState(false);

  // validate the error here
  // TODO - instead of a fake async call, use global state to manage loading
  const handleSubmit = async () => {
    if (invalidInput()) {
      setErrors({ numRows: "Please enter a number between 1 and 2000" });
    } else {
      setIsLoading(true);
      props.callbackFunction(props.tableToRender, { numRows: Number(numRows) });
      await new Promise((resolve) => setTimeout(resolve, 500));
      resetForm();
      props.onOpenChange();
      setIsLoading(false);
    }
  };

  const invalidInput = () => {
    return (
      !numRows.match(/^\d+$/) || Number(numRows) < 1 || Number(numRows) > 2000
    );
  };

  const resetForm = () => {
    setErrors({});
    setNumRows("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
      e.preventDefault();
    }
  };

  // TODO - use back-end server error codes and use loading state
  return (
    <>
      <Modal
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        isOpen={props.isOpen}
        placement="top-center"
        onClose={resetForm}
        onOpenChange={props.onOpenChange}
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
                    isClearable
                    isRequired
                    errorMessage={errors["numRows"]}
                    isInvalid={!!errors["numRows"]}
                    name="numRows"
                    placeholder="Enter a number"
                    value={numRows}
                    onKeyDown={handleKeyDown}
                    onValueChange={setNumRows}
                  />
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" isLoading={loading} variant="solid" onPress={handleSubmit}>
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
