import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Row } from "react-bootstrap";
import { ProductsContext } from "../../contexts/ProductsCtx.js";
import { AuthContext } from "../../contexts/AuthContext.js";
import productService from "../../services/productService.js";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext.js";
import DeleteConfirm from "./DeleteConfirm.js";


export default function Details() {
    const { id } = useParams();

    const { user } = useContext(AuthContext);
    const { onDelete } = useContext(ProductsContext);
    const { increaseProductQuantity, getQuantityInCart } = useContext(ShoppingCartContext);

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [product, setProduct] = useState({});
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    useEffect(() => {
        productService.getProductById(id)
            .then(result => setProduct(result));
    }, []);

    const quantityInCart = getQuantityInCart(product._id);
    const productQuantity = product.quantity;
    
    const options = [];
    for (let i = 0; i < productQuantity - quantityInCart; i++) {
        options.push(<option key={i} value={i + 1}>{i + 1}</option>)
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Details</h1>
            {product &&
                <Card
                    style={{ width: '25rem', margin: "20px", display: "inline-block", position: 'center' }}>
                    {/* <Card.Header>{product.name}</Card.Header> */}
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Img variant="top" src={product.imageUrl} className="mb-2" />
                        {user &&
                            (user._id == product._ownerId ?
                                <Row>
                                    <Link as={Button} to={`/products/edit/${product._id}`} style={{ display: "inline-block", marginRight: "20px", fontSize: "25px" }}>Edit</Link>
                                    <Button as={Link} onClick={() => setIsConfirmOpen(true)} style={{ display: "inline-block", marginRight: "20px", fontSize: "25px" }}>Delete</Button>
                                </Row>
                                :
                                <Row>
                                    <Button onClick={() => increaseProductQuantity(product._id, selectedQuantity)}
                                        className="btn btn-success btn-block mb-2"
                                        disabled={productQuantity == quantityInCart}
                                    >{productQuantity == quantityInCart ? "No more products available" : "Add to cart"}
                                    </Button>
                                    <select
                                        className="mb-2"
                                        id="quantity"
                                        defaultValue="select-quantity"
                                        onChange={(e) => setSelectedQuantity(e.target.value)}>
                                        <option value="select-quantity" hidden>Select quantity</option>
                                        {options}
                                    </select>
                                    {quantityInCart > 0 &&
                                        <span className="fs-6 ms-2 text-success">{quantityInCart} added in cart</span>}
                                </Row>)
                        }
                    </Card.Body>
                </Card>}
            <DeleteConfirm
                isOpen={isConfirmOpen}
                onDelete={() => onDelete(product._id)}
                closeConfirm={() => setIsConfirmOpen(false)}
                product={product}
            />
        </div >
    )
}
