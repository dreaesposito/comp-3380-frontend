import { Table } from "@/types/Table.ts";
import { Modal } from "@/types/Modal.ts";

export type NHLTableInfo = {
  table: Table;
  modal: Modal;
};

export const TopPlayersPenaltiesInfo: NHLTableInfo = {
  table: Table.TopPlayersPenalties,
  modal: Modal.RowInput,
};

export const GoalsByVenueInfo: NHLTableInfo = {
  table: Table.GoalsByVenue,
  modal: Modal.SeasonInput,
};

export const TotalGoalsByTeamInfo: NHLTableInfo = {
  table: Table.TotalGoalsByTeam,
  modal: Modal.FirstLastInput,
};
