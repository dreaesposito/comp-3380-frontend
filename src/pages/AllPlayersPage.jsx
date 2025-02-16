import {Container, Row, Spinner, Table} from "react-bootstrap"
import {supabase} from "../api/supabaseClient"
import {useState, useEffect} from "react";


const AllPlayersPage = () => {
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getPlayers()
    }, [])

    async function getPlayers() {
        try {
            setLoading(true)
            const {data: tableData} = await supabase.from("players").select("*")
            setPlayers(tableData)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container fluid="sm" className="mt-4">
            <Row>
                <Table striped hover responsive="sm" borderless>
                    <thead>
                    <tr style={{color: 'orange'}}>
                        <th>First</th>
                        <th>Last</th>
                        <th>Nationality</th>
                        <th>DOB</th>
                        <th>Height</th>
                    </tr>
                    </thead>
                    <tbody>
                    {players.map((row) => (
                        <tr key={row.playerid}>
                            <td key={row.firstname}>{row.firstname}</td>
                            <td key={row.lastname}>{row.lastname}</td>
                            <td key={row.nationality}>{row.nationality}</td>
                            <td key={row.birthdate}>{row.birthdate}</td>
                            <td key={row.height}>{row.height}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>

                {/* Overlay while loading */}
                {loading && (
                    <div className="overlay d-flex justify-content-center align-items-center">
                        <Spinner animation="border" size="xl" variant="secondary" />
                    </div>
                )}
            </Row>
        </Container>
    )
}


export default AllPlayersPage