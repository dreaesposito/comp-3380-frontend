import {Container, Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'

const NotFoundPage = () => {
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(-1) // Go back to the previous page
    }

    return (
        <Container className="mt-5 text-center">
            <div className="p-5 bg-light rounded-3">
                <h1 className="display-4">404 - Page Not Found</h1>
                <p className="lead">The page you are looking for does not exist.</p>
                <hr className="my-4"/>
                <p>You can go back to the previous page or return to the homepage.</p>
                <Button variant="secondary m-1" onClick={handleGoBack}>
                    Go Back
                </Button>
                <Button as={Link} to="/" variant="success m-1">
                    Go to Homepage
                </Button>
            </div>
        </Container>
    );
};

export default NotFoundPage;