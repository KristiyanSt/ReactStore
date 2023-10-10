import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.js";
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

export default function Navigation() {
    const { isAuthenticated, user } = useContext(AuthContext);

    return (
        <Navbar sticky="top" bg="light" data-bs-theme="light">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand >Store</Navbar.Brand>
                </LinkContainer>
                <Nav >
                    {!isAuthenticated &&
                        (<>
                            <LinkContainer to="/register">
                                <Nav.Link>Register</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        </>)}
                    {isAuthenticated &&
                        (<>
                            <LinkContainer to="/">
                                <Nav.Link>Welcome {user.email}</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/create">
                                <Nav.Link>Create product</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/">
                                <Nav.Link>Logout</Nav.Link>
                            </LinkContainer>
                        </>)}
                </Nav>
            </Container>
        </Navbar>
    )

}