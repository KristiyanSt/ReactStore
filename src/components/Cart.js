import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.js";
import productService from "../services/productService.js";
import { Card, CloseButton } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Cart() {
    const { user } = useContext(AuthContext);

    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        if (user.cart) {
            productService.getAll()
                .then(products => setCartProducts(products.filter(x => user.cart.includes(x._id))))
        }
    }, []);

    return (
        <>
            {cartProducts.map(product => <Card key={product._id} style={{ width: '18rem', margin: "20px", display: "block" }}>
                <CloseButton aria-label="Hide" />
                <Card.Img variant="top" src={product.imageUrl} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                        Type: {product.type}
                        <br></br>
                        Price: ${product.price}
                    </Card.Text>
                    {/* <Button reloadDocument href="/details">Active</Button> */}
                    <Link variant="primary">Remove</Link>
                </Card.Body>
            </Card>)}
        </>
    )
}