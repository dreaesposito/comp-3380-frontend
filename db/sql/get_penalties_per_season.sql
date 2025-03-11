CREATE OR REPLACE FUNCTION get_penalties_per_season()
RETURNS TABLE (
    season VARCHAR(30),
    numPenalties BIGINT
) AS $$
BEGIN
    RETURN QUERY

    SELECT games.season, COUNT(*) as numP
    FROM games
    JOIN plays ON games.gameid = plays.gameid
    WHERE plays.playtype = 'Penalty'
    GROUP BY games.season;
END;
$$ LANGUAGE plpgsql;
