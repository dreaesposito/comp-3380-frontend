import {Card, Button} from 'react-bootstrap'
import PropTypes from "prop-types";

const ProfileCard = ({user}) => {
    const {name, bio, profileImage, socialLinks} = user

    const imageStyle = {width: '75px', height: '75px', textAlign: 'center'}

    // explicitly defining prop values for good coding practices ;)
    ProfileCard.propTypes = {
        user: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string.isRequired,
            profileImage: PropTypes.string.isRequired,
            socialLinks: PropTypes.shape({
                github: PropTypes.string.isRequired,
                linkedin: PropTypes.string.isRequired,
            })
        })
    }

    return (
        <Card style={{width: '18rem', margin: '20px auto'}} className='bg-light border-gray-200'>
            <div className='text-center'>
                <Card.Img variant="top" src={profileImage} alt={`${name}'s profile`} style={imageStyle} className='rounded-circle mt-4' />
            </div>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{bio}</Card.Text>
                <div className="d-flex justify-content-around">
                    {socialLinks.github && (
                        <Button variant="outline-dark" href={socialLinks.github} target="_blank">
                            <i className="bi bi-github h3"></i>
                        </Button>
                    )}
                    {socialLinks.linkedin && (
                        <Button variant="outline-primary" href={socialLinks.linkedin} target="_blank">
                            <i className="bi bi-linkedin h3"></i>
                        </Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    )
}

export default ProfileCard