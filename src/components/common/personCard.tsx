import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  Divider,
  CardFooter,
} from "@heroui/react";
import { Link } from "@heroui/link";
import React from "react";

interface Person {
  name: string;
  desc: string;
  profileImage: string;
  github: string;
  linkedin: string;
}

interface Props {
  person: Person;
}

export const PersonCard: React.FC<Props> = ({ person }) => {
  return (
    <div>
      {/*need outer div element for proper styling*/}
      <div className="rounded-2xl hover:shadow-2xl hover:shadow-zinc-300 dark:shadow-zinc-700 transition-shadow duration-250">
        <Card className="py-4 max-w-sm mx-auto">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
            <Image
              alt="Card background"
              className="object-cover rounded-full"
              src={person.profileImage}
              width={60}
            />
          </CardHeader>
          <CardBody>
            <h1 className="text-xl font-bold">{person.name}</h1>
            <h4 className="text-lg text-default-500 py-2">{person.desc}</h4>
          </CardBody>
          <Divider />
          <CardFooter className="pb-0 pt-2 px-4">
            <div className="grid grid-cols-2 content-center md:grid-cols-2 md:gap-3 mx-auto">
              <Button
                isExternal
                as={Link}
                className="object-cover rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600"
                color="default"
                href={person.github}
                radius="sm"
                variant="bordered"
              >
                <i className="text-2xl bi bi-github" />
              </Button>
              <Button
                as={Link}
                isExternal
                className="object-cover rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600"
                color="primary"
                href={person.linkedin}
                variant="bordered"
              >
                <i className="text-2xl bi bi-linkedin" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
