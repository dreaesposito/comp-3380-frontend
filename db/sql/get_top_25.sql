CREATE OR REPLACE FUNCTION get_top_25(
    season_param TEXT,
    stat TEXT DEFAULT 'p'
)
RETURNS TABLE (
    pid INT,
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    numGoalz BIGINT,
    numAssistz BIGINT,
    numPointz BIGINT,
    plusMinuz BIGINT
) AS $$
BEGIN
    RETURN QUERY
    WITH allGoals AS (
        SELECT playerID, COUNT(*) as numGoals
        FROM plays
        JOIN games ON plays.gameID = games.gameID
        WHERE plays.playType = 'Goal'
          AND games.season = season_param
        GROUP BY playerID
    ),
    allAssists AS (
        SELECT assists.playerID, COUNT(*) as numAssists
        FROM assists
        JOIN plays ON assists.playID = plays.playID
        JOIN games ON games.gameID = plays.gameID
        WHERE games.season = season_param
        GROUP BY assists.playerID
    ),
    totalPlusMinus AS (
        SELECT playsIn.playerID, SUM(playsIn.plusMinus) as plusMinus
        FROM playsIn
        JOIN games ON games.gameID = playsIn.gameID
        WHERE games.season = season_param
        GROUP BY playsIn.playerID
    ),
    totals AS (
        SELECT 
            allAssists.playerID,
            numGoals, 
            numAssists, 
            numGoals + numAssists AS numPoints, 
            plusMinus
        FROM allGoals
        JOIN allAssists ON allGoals.playerID = allAssists.playerID
        JOIN totalPlusMinus ON allGoals.playerID = totalPlusMinus.playerID
    )
    SELECT 
        players.playerID,
        players.firstName, 
        players.lastName, 
        numGoals, 
        numAssists, 
        numPoints, 
        plusMinus
    FROM totals
    JOIN players ON totals.playerID = players.playerID
    ORDER BY 
        CASE
            WHEN stat = 'pm' THEN plusMinus
            WHEN stat = 'g' THEN numGoals
            WHEN stat = 'a' THEN numAssists
            ELSE numPoints 
        END DESC
    LIMIT 25;
END;
$$ LANGUAGE plpgsql;
