import {Container, Row} from "react-bootstrap"
import {supabase} from "../api/supabaseClient"
import {useState, useEffect} from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Spinner,
    getKeyValue,
    Button, AccordionItem, Accordion
} from "@heroui/react";

const Bruh = () => {
    const defaultContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    return (
        <Accordion>
            <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
                {defaultContent}
            </AccordionItem>
            <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
                {defaultContent}
            </AccordionItem>
            <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
                {defaultContent}
            </AccordionItem>
        </Accordion>
    );
}


const HeroUITable = () => {

    const [players, setPlayers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getPlayers()
    }, [])

    async function getPlayers() {
        try {
            setIsLoading(true)
            const {data: tableData} = await supabase.from("players").select("*")
            setPlayers(tableData)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Table
            isHeaderSticky
            aria-label="Example table with infinite pagination"
            classNames={{
                base: "max-h-[520px] overflow-scroll",
                table: "min-h-[400px]",
            }}
        >
            <TableHeader>
                <TableColumn key="firstname">First</TableColumn>
                <TableColumn key="lastname">Last</TableColumn>
                <TableColumn key="height">Height</TableColumn>
                <TableColumn key="nationality">Nationality</TableColumn>
            </TableHeader>
            <TableBody
                isLoading={isLoading}
                items={players}
                loadingContent={<Spinner color="white"/>}
            >
                {(item) => (
                    <TableRow key={item.playerid}>
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

const AllPlayersPage = () => {
    return (
        <Container fluid="sm" className="mt-4">
            <Row>
                <HeroUITable/>
                <Button>hello</Button>
                <Bruh></Bruh>

                {/* Overlay while loading */}
                {/*{loading && (*/}
                {/*    <div className="overlay d-flex justify-content-center align-items-center">*/}
                {/*        <BSpinner animation="border" size="xl" variant="secondary"/>*/}
                {/*    </div>*/}
                {/*)}*/}
            </Row>
        </Container>
    )
}


export default AllPlayersPage