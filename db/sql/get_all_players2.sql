
CREATE OR REPLACE FUNCTION get_all_players2()
RETURNS TABLE (
    fname VARCHAR(30),
    lname VARCHAR(30),
    teamcity VARCHAR(30)
) AS $$
BEGIN
    RETURN QUERY

    SELECT firstname, lastname, city
    FROM players
    LEFT JOIN playsOn 
    ON players.playerid = playsOn.playerid
    LEFT JOIN teams
    ON playsOn.teamid = teams.teamid
    WHERE playsOn.enddate IS NULL; -- get plays current team
END;
$$ LANGUAGE plpgsql;
