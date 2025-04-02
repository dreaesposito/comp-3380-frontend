import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
// import { Form } from "@heroui/form";
// import React from "react";
import {
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Link } from "@heroui/link";

// export default function QueryInput() {
//   const [action, setAction] = React.useState("");
//
//   return (
//     <div className="flex flex-row gap-4">
//       <Form
//         className="w-full max-w-xs flex flex-col gap-4"
//         onReset={() => setAction("reset")}
//         onSubmit={(e) => {
//           e.preventDefault();
//           let data = Object.fromEntries(new FormData(e.currentTarget));
//
//           setAction(`submit ${JSON.stringify(data)}`);
//         }}
//       >
//         <Input
//           isRequired
//           errorMessage="Please enter a valid username"
//           label="Username"
//           labelPlacement="outside"
//           name="username"
//           placeholder="Enter your username"
//           type="text"
//         />
//
//         <Input
//           isRequired
//           errorMessage="Please enter a valid email"
//           label="Email"
//           labelPlacement="outside"
//           name="email"
//           placeholder="Enter your email"
//           type="email"
//         />
//         <div className="flex gap-2">
//           <Button color="primary" type="submit">
//             Submit
//           </Button>
//           <Button type="reset" variant="flat">
//             Reset
//           </Button>
//         </div>
//         {action && (
//           <div className="text-small text-default-500">
//             Action: <code>{action}</code>
//           </div>
//         )}
//       </Form>
//     </div>
//   );
// }

export default function QueryModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Open Modal
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  endContent={<h1>endIcon</h1>}
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  endContent={<h1>endIcon</h1>}
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
