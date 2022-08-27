import { Nav, Navbar, Button, Container } from 'react-bootstrap';
import learnItLogo from '../../assets/logo.svg';
import logoutIcon from '../../assets/logout.svg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

function NavbarMenu() {
    const {
        authState: {
            user: { username },
        },
        logoutUser,
    } = useContext(AuthContext);

    const logout = () => logoutUser();

    return (
        <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
            <Container fluid>
                <Navbar.Brand className="font-weight-bolder text-white">
                    <img src={learnItLogo} alt="learnitlogo" width="32" height="32" className="me-2" />
                    LearnIt
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="font-weight-bolder text-white" to="/dashboard" as={Link}>
                            Dashboard
                        </Nav.Link>
                        <Nav.Link className="font-weight-bolder text-white" to="/about" as={Link}>
                            About
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link className="font-weight-bolder text-white" disabled>
                            Welcome {username}
                        </Nav.Link>
                        <Button variant="secondary" className="font-weight-bolder text-white" onClick={logout}>
                            <img src={logoutIcon} alt="logouticon" width="32" height="32" className="me-2" />
                            Log out
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarMenu;
