import { Card, CardHeader, CardBody, Image, Button } from "@heroui/react";
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
    <div className="rounded-2xl hover:shadow-2xl transition-shadow duration-400">
      <Card className="py-4 border-none bg-background/60 dark:bg-default-100/50">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
          <div className="grid place-items-center">
            <Image
              alt="Card background"
              className="object-cover rounded-full"
              src={person.profileImage}
              width={60}
            />
          </div>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <h1 className="text-xl font-bold">{person.name}</h1>
          <h4 className="text-xl text-default-500 py-2">{person.desc}</h4>
          <div className="grid cols-5 md:grid-cols-2 md:gap-4 pt-2">
            <Button
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
              className="object-cover rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600"
              color="primary"
              href={person.linkedin}
              variant="bordered"
            >
              <i className="text-2xl bi bi-linkedin" />
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
