CREATE OR REPLACE FUNCTION get_players(
    str TEXT
)
RETURNS TABLE (
    fn VARCHAR(30),
    ln VARCHAR(30)
) AS $$
BEGIN
    RETURN QUERY

    SELECT firstname,
    lastname
    FROM players
    WHERE firstname LIKE str
    OR lastname LIKE str
    LIMIT 10;
END;
$$ LANGUAGE plpgsql;
