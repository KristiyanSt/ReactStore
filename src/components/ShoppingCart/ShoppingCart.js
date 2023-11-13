import { useContext, useEffect } from "react"
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext.js";
import { Button, Card, Offcanvas } from "react-bootstrap";
import { ProductsContext } from "../../contexts/ProductsCtx.js";
import CartItem from "./CartItem.js";


export default function ShoppingCart() {
    const { products } = useContext(ProductsContext);

    const {
        cart,
        closeCart,
        isOpen,
        decreaseProductQuantity,
        removeFromCart
    } = useContext(ShoppingCartContext);

    const cartItems = products.filter(item => {
        return cart.some(x => x.productId == item._id)
    });

    const total = cartItems.reduce((acc, item) => {
        return acc += Number(item.price) * Number(item.quantity)
    }, 0);


    return <Offcanvas show={isOpen} onHide={closeCart} placement={'end'} >
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {cartItems.length == 0 && <p>Your cart is empty!</p>}
            {cartItems && cartItems.map(p => <CartItem
                key={p._id}
                product={p}
                quantity={cart.find(x => x.productId == p._id).quantity}
                removeFromCart={removeFromCart} />)}
            Total: {total}
        </Offcanvas.Body>
    </Offcanvas>
}


