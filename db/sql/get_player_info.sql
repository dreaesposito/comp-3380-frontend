CREATE OR REPLACE FUNCTION get_player_info(
    pID INT
)
RETURNS TABLE (
    fn VARCHAR(30),
    ln VARCHAR(30),
    nat VARCHAR(30),
    bd DATE,
    h VARCHAR(30),
    w INT,
    pt VARCHAR(30),
    img VARCHAR(255)
) AS $$
BEGIN
    RETURN QUERY

    SELECT firstname,
    lastname,
    nationality,
    birthDate,
    height,
    weight,
    playerType,
    imglink
    FROM players
    WHERE playerID = pID;
END;
$$ LANGUAGE plpgsql;
