CREATE OR REPLACE FUNCTION get_players(
    name TEXT
)
RETURNS TABLE (
    fname VARCHAR(30),
    lname VARCHAR(30)
) AS $$
BEGIN
    RETURN QUERY

    SELECT firstname,
           lastname
    FROM players
    WHERE firstname LIKE name
    OR lastname LIKE name
    LIMIT 10;
END;
$$ LANGUAGE plpgsql;
