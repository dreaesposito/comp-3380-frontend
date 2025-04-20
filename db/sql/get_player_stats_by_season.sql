CREATE OR REPLACE FUNCTION get_player_stats_by_season(
    fname TEXT,
    lname TEXT
)
RETURNS TABLE (
    season VARCHAR(10),
    team VARCHAR(30),
    gamesPlayed BIGINT,
    numGoalz BIGINT,
    numAssistz BIGINT,
    numPointz BIGINT,
    plusMinuz BIGINT
) AS $$
DECLARE
  player_id INT;
BEGIN
    SELECT playerid INTO player_id
    FROM players
    WHERE firstname = fname 
    AND lastname = lname;

    RETURN QUERY
    WITH seasonGoals AS (
        SELECT games.season, COUNT(*) as numGoals
        FROM plays
        JOIN games ON plays.gameID = games.gameID
        WHERE plays.playType = 'Goal'
          and playerid = player_id
        GROUP BY games.season
    ),
    seasonAssists AS (
        SELECT games.season, COUNT(*) as numAssists
        FROM assists
        JOIN plays ON assists.playID = plays.playID
        JOIN games ON games.gameID = plays.gameID
        WHERE assists.playerID = player_id
        GROUP BY games.season
    ),
    teamRanks AS (
        TODO
    ),
    seasonOther AS (
        SELECT games.season, 
               teams.teamname, 
               SUM(playsIn.plusMinus) as plusMinus, 
               COUNT(DISTINCT games.gameID) as numGames
        FROM playsIn
        JOIN games ON games.gameID = playsIn.gameID
        LEFT JOIN playsOn 
          ON playsOn.playerID = playsIn.playerID
          AND playsOn.startdate <= games.datetime::date
          AND (playsOn.enddate IS NULL OR playsOn.enddate >= games.datetime::date)
        LEFT JOIN teams ON playsOn.teamID = teams.teamID
        WHERE playsIn.playerID = player_id
        GROUP BY games.season, teams.teamname
    ),
    totals AS (
        SELECT 
            seasonGoals.season AS seasonYears,
            teamname,
            numGames,
            numGoals, 
            numAssists, 
            numGoals + numAssists AS numPoints, 
            plusMinus
        FROM seasonGoals
        JOIN seasonAssists ON seasonGoals.season = seasonAssists.season
        JOIN seasonOther ON seasonGoals.season = seasonOther.season
    )
    SELECT 
        seasonYears,
        teamname,
        numGames,
        numGoals, 
        numAssists, 
        numPoints, 
        plusMinus
    FROM totals;
END;
$$ LANGUAGE plpgsql;
