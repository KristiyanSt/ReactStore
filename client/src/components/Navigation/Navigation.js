import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext.js"
import { Container, Nav, Navbar } from 'react-bootstrap'
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext.js"
import { GuestNav } from "./GuestNav.js"
import { UserNav } from "./UserNav.js"
import { Link } from "react-router-dom"


export default function Navigation() {

    const { user } = useContext(AuthContext);
    const { showCart, cartQuantity } = useContext(ShoppingCartContext);

    return <Navbar bg="white" data-bs-theme="light" className="shadow-sm sticky-top mb-3">
        <Container>
            <Navbar.Brand as={Link} to="/">ReactStore</Navbar.Brand>
            <Nav>
                {!user && <GuestNav />}
                {user && <UserNav showCart={showCart} cartQuantity={cartQuantity}/>}
            </Nav>
        </Container>
    </Navbar>

}