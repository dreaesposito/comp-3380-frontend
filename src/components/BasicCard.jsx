import { useNavigate } from 'react-router-dom'
import { Panel } from 'primereact/panel'

import './BasicCard.css' // Import the CSS file for hover effect



const BasicCard = ({ title, text, link }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(link); // Navigate to the specified link
    }

    return (
        <Panel className="hover-card" header={title} onClick={handleClick}>
            {/*<Card.Header><h2>{title}</h2></Card.Header>*/}
            {/*<Card.Body>*/}
            {/*    <Card.Text>{text}</Card.Text>*/}
            {/*</Card.Body>*/}
            {/*<Button type="button" label="Button 3" className="p-button-help"></Button>*/}
        </Panel>
    )
}

export default BasicCard;