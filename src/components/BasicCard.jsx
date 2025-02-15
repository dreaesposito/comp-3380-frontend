import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// Component made from smaller bootstrap components, which can be imported and used anywhere

function BasicCard() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=595&height=400&name=image8-2.jpg" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Example Card with a button
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default BasicCard; // alternative type of syntax to export the component