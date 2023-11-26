import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

export function GuestNav() {
    return <>
        <Nav.Link as={Link} to="/register">Register</Nav.Link>
        <Nav.Link as={Link} to="/login">Login</Nav.Link>
    </>
}