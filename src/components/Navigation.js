import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.js";
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

export default function Navigation() {

    const { user, onLogout } = useContext(AuthContext);

    return (
        <Navbar sticky="top" bg="light" data-bs-theme="light">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand >Store</Navbar.Brand>
                </LinkContainer>
                <Nav >
                    {!user.accessToken &&
                        (<>
                            <LinkContainer to="/register">
                                <Nav.Link>Register</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        </>)}
                    {user.accessToken &&
                        (<>
                            <LinkContainer to="/profile">
                                <Nav.Link>My Profile</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/cart">
                                <Nav.Link>Cart</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/create">
                                <Nav.Link>Create ad</Nav.Link>
                            </LinkContainer>
                            {/* <LinkContainer to="/"> */}
                                <Nav.Link onClick={onLogout}>Logout</Nav.Link>
                            {/* </LinkContainer> */}
                        </>)}
                </Nav>
            </Container>
        </Navbar>
    )

}