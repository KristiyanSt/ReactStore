import { useContext, useEffect, useState } from "react"
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext.js"
import { Offcanvas, Stack } from "react-bootstrap"
import CartItem from "./CartItem.js"
import productService from "../../services/productService.js"


export default function ShoppingCart() {
    const [cartProducts, setCartProducts] = useState([]);

    const {
        cart,
        isOpen,
        closeCart,
        removeFromCart
    } = useContext(ShoppingCartContext);

    useEffect(() => {
        if(cart.length !== 0) {
            productService.getProductsByIds(cart.map(x => `"${x.productId}"`))
            .then(setCartProducts);
        }
    },[cart]);


    const total = cart.reduce((acc, x) => {
        const product = cartProducts.find(p => p._id == x.productId);
        return acc += Number(product?.price || 0) * x.quantity
    }, 0);

    return <Offcanvas show={isOpen} onHide={closeCart} placement={'end'} >
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            {cart.length > 0
                ? <>
                    <Stack gap={3} className="d-flex align-items-center">
                        {cart.map(p => <CartItem
                            key={p.productId}
                            quantity={p.quantity}
                            product={cartProducts.find(x=> x._id == p.productId)}
                            removeFromCart={removeFromCart}
                        />)}
                        <div className="ms-auto fw-bold fs-4 total">
                            Total: ${total}
                        </div>
                    </Stack>
                </>
                : <span className="fw-bold">Your cart is empty!</span>}
        </Offcanvas.Body>
    </Offcanvas>
}


