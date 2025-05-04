import { QueryTable } from "@/types/Table.ts";
import { Modal } from "@/types/Modal.ts";

export type NHLTableInfo = {
  table: QueryTable;
  modal: Modal;
};

export const TotalGoalsByTeamInfo: NHLTableInfo = {
  table: QueryTable.TotalGoalsByTeam,
  modal: Modal.FirstLastInput,
};

export const PlayerSeasonStatsInfo: NHLTableInfo = {
  table: QueryTable.PlayerSeasonStats,
  modal: Modal.FirstLastInput
};

export const TotalGAPInfo: NHLTableInfo = {
  table: QueryTable.TotalGAP,
  modal: Modal.FirstLastInput,
};

export const AvgShiftByPlayInfo: NHLTableInfo = {
  table: QueryTable.AvgShiftByPlay,
  modal: Modal.None,
};

export const AvgShiftByPeriodInfo: NHLTableInfo = {
  table: QueryTable.AvgShiftByPeriod,
  modal: Modal.None,
};

export const GoalsByVenueInfo: NHLTableInfo = {
  table: QueryTable.GoalsByVenue,
  modal: Modal.SeasonInput,
};

export const TopNoOfficialPenaltiesInfo: NHLTableInfo = {
  table: QueryTable.TopNoOfficialPenalties,
  modal: Modal.RowInput,
};

export const TopTeamsPlayedForInfo: NHLTableInfo = {
  table: QueryTable.TopTeamsPlayedFor,
  modal: Modal.RowInput,
};

export const TopPlayersPenaltiesInfo: NHLTableInfo = {
  table: QueryTable.TopPlayersPenalties,
  modal: Modal.RowInput,
};

export const TotalPlayoffWinsInfo: NHLTableInfo = {
  table: QueryTable.TotalPlayoffWins,
  modal: Modal.SeasonTeamInput,
};

export const PlayersScoredAgainstAllTeamsInfo: NHLTableInfo = {
  table: QueryTable.PlayersScoredAgainstAllTeams,
  modal: Modal.None,
};

export const Top25ByStatInfo: NHLTableInfo = {
  table: QueryTable.Top25ByStat,
  modal: Modal.SeasonInput,
};

export const AvgGoalsPerShotInfo: NHLTableInfo = {
  table: QueryTable.AvgGoalsPerShot,
  modal: Modal.FirstLastInput,
};

export const AllTeamsInfo: NHLTableInfo = {
  table: QueryTable.AllTeams,
  modal: Modal.None,
};

export const TeamHistoryInfo: NHLTableInfo = {
  table: QueryTable.TeamHistory,
  modal: Modal.FirstLastInput,
};

export const ScheduleInfo: NHLTableInfo = {
  table: QueryTable.Schedule,
  modal: Modal.SeasonTeamInput,
};
