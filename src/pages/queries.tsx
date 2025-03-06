import { querySubtitle, queryTitle } from "@/components/primitives";
import { Input } from "@heroui/input";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { div } from "framer-motion/client";
import { FC, useState } from "react";
  
export default function Queries() {
   
  const queries = [
    { id: "1", label: "Find NHL Players", description: "Retrieve all NHL players from the database." },
    { id: "2", label: "Top Goal Scorers", description: "Get the top 10 goal scorers of the season asdlkf  aslka sd alaskd f alasdkf alaksdf ." },
    { id: "3", label: "Winning Teams", description: "Find teams with the most wins." },
  ];


  return (
    <Listbox className="horizontal-listbox">
    {queries.map(query =>
      <ListboxItem key={query.id} className="flex flex-col">
        <span className={queryTitle()}>
        {query.label}
        </span>
        <span className={querySubtitle()}>
        {query.description}
        </span>
      </ListboxItem>
    )}
  </Listbox>
  )
}