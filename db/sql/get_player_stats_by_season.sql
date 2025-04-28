CREATE OR REPLACE FUNCTION get_player_stats_by_season(
    fname TEXT,
    lname TEXT
)
RETURNS TABLE (
    pid INT,
    season VARCHAR(10),
    team VARCHAR(30),
    teamStartDate DATE,
    gamesPlayed BIGINT,
    numGoalz BIGINT,
    numPenaltiez BIGINT,
    numShotz BIGINT,
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
    AND lastname = lname
    LIMIT 1;

    RETURN QUERY
    WITH seasonGoals AS (
        SELECT games.season, COUNT(*) as numGoals
        FROM plays
        JOIN games ON plays.gameID = games.gameID
        WHERE plays.playType = 'Goal'
          and playerid = player_id
        GROUP BY games.season
    ),
    seasonPenalties AS (
        SELECT games.season, COUNT(*) as numPenalties
        FROM plays
        JOIN games ON plays.gameID = games.gameID
        WHERE plays.playType = 'Penalty'
          and playerid = player_id
        GROUP BY games.season
    ),
    seasonShots AS (
        SELECT games.season, COUNT(*) as numShots
        FROM plays
        JOIN games ON plays.gameID = games.gameID
        WHERE plays.playType = 'Shot'
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
    seasonOther AS (
        SELECT games.season, 
               teams.teamname, 
               playsOn.startDate,
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
        GROUP BY games.season, teams.teamname, playsOn.startDate
    ),
    totals AS (
        SELECT 
            seasonGoals.season AS seasonYears,
            teamname,
            startDate,
            numGames,
            numGoals,
            numPenalties,
            numShots,
            numAssists, 
            numGoals + numAssists AS numPoints, 
            plusMinus
        FROM seasonGoals 
        JOIN seasonPenalties ON seasonGoals.season = seasonPenalties.season
        JOIN seasonShots ON seasonGoals.season = seasonShots.season
        JOIN seasonAssists ON seasonGoals.season = seasonAssists.season
        JOIN seasonOther ON seasonGoals.season = seasonOther.season
    )
    SELECT 
        player_id,
        seasonYears,
        teamname,
        startDate,
        numGames,
        numGoals,
        numPenalties,
        numShots,
        numAssists, 
        numPoints, 
        plusMinus
    FROM totals
    ORDER BY seasonYears ASC, startDate ASC;
END;
$$ LANGUAGE plpgsql;
