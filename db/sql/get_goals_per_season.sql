CREATE OR REPLACE FUNCTION get_goals_per_season()
RETURNS TABLE (
    season VARCHAR(30),
    numGoals BIGINT
) AS $$
BEGIN
    RETURN QUERY

    SELECT games.season, COUNT(*) as numG
    FROM games
    JOIN plays ON games.gameid = plays.gameid
    WHERE plays.playtype = 'Goal'
    GROUP BY games.season;
END;
$$ LANGUAGE plpgsql;