import { Table } from "@/types/Table.ts";
import { Modal } from "@/types/Modal.ts";

export type NHLTableInfo = {
  table: Table;
  modal: Modal;
};

export const TotalGoalsByTeamInfo: NHLTableInfo = {
  table: Table.TotalGoalsByTeam,
  modal: Modal.FirstLastInput,
};

export const TotalGAPInfo: NHLTableInfo = {
  table: Table.TotalGAP,
  modal: Modal.FirstLastInput,
};

export const AvgShiftByPlayInfo: NHLTableInfo = {
  table: Table.AvgShiftByPlay,
  modal: Modal.None,
};

export const AvgShiftByPeriodInfo: NHLTableInfo = {
  table: Table.AvgShiftByPeriod,
  modal: Modal.None,
};

export const GoalsByVenueInfo: NHLTableInfo = {
  table: Table.GoalsByVenue,
  modal: Modal.SeasonInput,
};

export const TopNoOfficialPenaltiesInfo: NHLTableInfo = {
  table: Table.TopNoOfficialPenalties,
  modal: Modal.RowInput,
};

export const TopTeamsPlayedForInfo: NHLTableInfo = {
  table: Table.TopTeamsPlayedFor,
  modal: Modal.RowInput,
};

export const TopPlayersPenaltiesInfo: NHLTableInfo = {
  table: Table.TopPlayersPenalties,
  modal: Modal.RowInput,
};

export const TotalPlayoffWinsInfo: NHLTableInfo = {
  table: Table.TotalPlayoffWins,
  modal: Modal.SeasonTeamInput,
};

export const PlayersScoredAgainstAllTeamsInfo: NHLTableInfo = {
  table: Table.PlayersScoredAgainstAllTeams,
  modal: Modal.None,
};

export const Top25ByStatInfo: NHLTableInfo = {
  table: Table.Top25ByStat,
  modal: Modal.SeasonInput,
};

export const AvgGoalsPerShotInfo: NHLTableInfo = {
  table: Table.AvgGoalsPerShot,
  modal: Modal.FirstLastInput,
};

export const AllTeamsInfo: NHLTableInfo = {
  table: Table.AllTeams,
  modal: Modal.None,
};

export const SearchPlayerInfo: NHLTableInfo = {
  table: Table.SearchPlayer,
  modal: Modal.FirstLastInput,
};

export const ScheduleInfo: NHLTableInfo = {
  table: Table.Schedule,
  modal: Modal.SeasonTeamInput,
};
