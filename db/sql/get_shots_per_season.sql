CREATE OR REPLACE FUNCTION get_shots_per_season()
RETURNS TABLE (
    season VARCHAR(30),
    numShots BIGINT
) AS $$
BEGIN
    RETURN QUERY

    SELECT games.season, COUNT(*) as numS
    FROM games
    JOIN plays ON games.gameid = plays.gameid
    WHERE plays.playtype = 'Shot'
    GROUP BY games.season;
END;
$$ LANGUAGE plpgsql;