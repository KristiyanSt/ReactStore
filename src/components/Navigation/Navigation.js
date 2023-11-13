import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext.js"
import { Container, Nav, Navbar } from 'react-bootstrap'
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext.js"
import { GuestNav } from "./GuestNav.js"
import { UserNav } from "./UserNav.js"


export default function Navigation() {

    const { user } = useContext(AuthContext);
    const { showCart } = useContext(ShoppingCartContext);

    return <Navbar bg="light" data-bs-theme="light" className="shadow-sm sticky-top mb-3">
        <Container>
            <Navbar.Brand >OnProcess</Navbar.Brand>
            <Nav>
                {!user && <GuestNav />}
                {user && <UserNav showCart={showCart} />}
            </Nav>
        </Container>
    </Navbar>

}