import { useContext } from "react"
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext.js";
import { Offcanvas, Stack } from "react-bootstrap";
import { ProductsContext } from "../../contexts/ProductsCtx.js";
import CartItem from "./CartItem.js";


export default function ShoppingCart() {
    const { products } = useContext(ProductsContext);
    const {
        cart,
        isOpen,
        closeCart,
        removeFromCart
    } = useContext(ShoppingCartContext);

    const total = cart.reduce((acc, x) => {
        const product = products.find(p => p._id == x.productId);
        return acc += Number(product?.price) * x.quantity
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
                            {...p}
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


