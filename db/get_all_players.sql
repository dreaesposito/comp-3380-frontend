CREATE OR REPLACE FUNCTION get_all_players()
RETURNS jsonb
AS $$
DECLARE
  result jsonb;
BEGIN
  SELECT json_agg(sub)
  INTO result
  FROM (
    SELECT firstname, lastname, city AS team
    FROM players
    LEFT JOIN playsOn 
      ON players.playerid = playsOn.playerid
    LEFT JOIN teams
      ON playsOn.teamid = teams.teamid
    WHERE playsOn.enddate IS NULL
    AND firstname IS NOT NULL
    AND lastname IS NOT NULL
    AND city IS NOT NULL
  ) AS sub;

  RETURN result;
END;
$$ LANGUAGE plpgsql;
