import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useState } from "react";
import { Input } from "@heroui/input";
import { Table } from "@/types/Table.ts";
import { Form } from "@heroui/form";

interface ChildProps {
  isOpen: boolean;
  onOpenChange: () => void;
  tableToRender: Table;
  callbackFunction: (table: Table, params: {}) => void;
}

export default function FirstLastInputModal(props: ChildProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [loading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    let valid = true;

    if (firstName === "") {
      valid = false;
      setErrors((prev: any) => ({
        ...prev,
        first: "Field cannot be empty",
      }));
    }

    if (lastName === "") {
      valid = false;
      setErrors((prev: any) => ({
        ...prev,
        last: "Field cannot be empty",
      }));
    }

    if (valid) {
      setIsLoading(true);
      props.callbackFunction(props.tableToRender, {
        firstName: firstName,
        lastName: lastName,
      });
      await new Promise((resolve) => setTimeout(resolve, 500));
      resetForm();
      props.onOpenChange();
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setErrors({});
  };

  return (
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
              Player Selection
            </ModalHeader>
            <ModalBody>
              <Form className="" onSubmit={handleSubmit}>
                <Input
                  isClearable
                  isRequired
                  errorMessage={errors["first"]}
                  isInvalid={!!errors["first"]}
                  label="First Name"
                  name={"first"}
                  placeholder=""
                  value={firstName}
                  onValueChange={setFirstName}
                />
                <Input
                  isClearable
                  isRequired
                  errorMessage={errors["last"]}
                  isInvalid={!!errors["last"]}
                  label="Last Name"
                  name={"last"}
                  placeholder=""
                  value={lastName}
                  onValueChange={setLastName}
                />
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                isLoading={loading}
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
  );
}
