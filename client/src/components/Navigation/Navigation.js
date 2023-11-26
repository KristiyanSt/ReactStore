import { useContext } from "react"
import { Link } from "react-router-dom"
import { Container, Nav, Navbar } from 'react-bootstrap'
import { AuthContext } from "../../contexts/AuthContext.js"
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext.js"
import { GuestNav } from "./GuestNav.js"
import { UserNav } from "./UserNav.js"


export default function Navigation() {

    const { user } = useContext(AuthContext);
    const { showCart, cartQuantity } = useContext(ShoppingCartContext);

    return <Navbar bg="white" data-bs-theme="light" className="shadow-sm sticky-top mb-3">
        <Container>
            <Navbar.Brand as={Link} to="/">ReactStore</Navbar.Brand>
            <Nav>
                <Nav.Link as={Link} to="/products">Products</Nav.Link>
                {!user && <GuestNav />}
                {user && <UserNav 
                showCart={showCart} 
                cartQuantity={cartQuantity} 
                isAdmin={user.roles?.includes('admin')}/>}
            </Nav>
        </Container>
    </Navbar>

}