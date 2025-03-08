import DefaultLayout from "@/layouts/default";
import { useEffect, useState } from "react";
import { supabase } from "@/api/supabaseClient.ts";
import {
  getKeyValue,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

interface Player {
  playerid: number;
  firstname: string;
  lastname: string;
  height: string;
  nationality: string;
}

export default function AllPlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPlayers();
  }, []);

  async function getPlayers() {
    try {
      setIsLoading(true);
      const { data: tableData } = await supabase.from("players").select("*");

      setPlayers(tableData as Player[]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DefaultLayout>
      <Table
        isHeaderSticky
        aria-label="Example table with infinite pagination"
        classNames={{
          base: "overflow-scroll",
          table: "min-h-[400px]",
        }}
      >
        <TableHeader>
          <TableColumn key="firstname">First</TableColumn>
          <TableColumn key="lastname">Last</TableColumn>
          <TableColumn key="height">Height</TableColumn>
          <TableColumn key="nationality">Nationality</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          items={players}
          loadingContent={<Spinner color="white" />}
        >
          {(item) => (
            <TableRow key={item.playerid}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </DefaultLayout>
  );
}
