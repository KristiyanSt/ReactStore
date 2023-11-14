import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Row, Col } from "react-bootstrap";
import { ProductsContext } from "../../contexts/ProductsCtx.js";
import { AuthContext } from "../../contexts/AuthContext.js";
import productService from "../../services/productService.js";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext.js";
import DeleteConfirm from "./DeleteConfirm.js";


export default function Details() {
    const { id } = useParams();

    const { user } = useContext(AuthContext);
    const { onDelete } = useContext(ProductsContext);
    const { increaseProductQuantity, decreaseProductQuantity, getQuantityInCart } = useContext(ShoppingCartContext);

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
        <div className="d-flex justify-content-center">
            {product &&
                <Card className="w-25 mt-4 h-100" style={{width: '700px'}}>
                    <Card.Img
                        className="mb-2"
                        variant="top"
                        src={product.imageUrl} />
                    <Card.Body className="d-flex flex-column">
                        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                            <span className="fs-2">{product.name} </span>
                            <span className="ms-2 text-muted">${product.price}</span>
                        </Card.Title>
                        {user &&
                            (user._id == product._ownerId ?
                                <Row>
                                    <Link as={Button} to={`/products/edit/${product._id}`} style={{ display: "inline-block", marginRight: "20px", fontSize: "25px" }}>Edit</Link>
                                    <Button as={Link} onClick={() => setIsConfirmOpen(true)} style={{ display: "inline-block", marginRight: "20px", fontSize: "25px" }}>Delete</Button>
                                </Row>
                                :
                                <Row>
                                    {quantityInCart == 0
                                        ? <div className="mt-auto">
                                            <Button
                                                variant="success"
                                                className="w-100"
                                                onClick={() => increaseProductQuantity(product._id)}
                                            >+ Add to cart
                                            </Button>
                                        </div>
                                        : <div className="d-flex align-items-center
                                             flex-column" style={{ gap: '.5rem' }}>
                                            <div className="d-flex align-items-center 
                                                justify-content-center" style={{ gap: '.5rem' }}>
                                                <Button 
                                                variant="success" 
                                                disabled={product.quantity == quantityInCart}
                                                onClick={() => increaseProductQuantity(product._id)}
                                                >+
                                                </Button>
                                                <Button 
                                                variant="danger"
                                                onClick={() => decreaseProductQuantity(product._id)}
                                                 >-
                                                 </Button>
                                            </div>
                                            {product.quantity == quantityInCart && <span className="text-danger">No more products available</span>}
                                            <span className="fs-6 ms-2 text-success">{quantityInCart} added in cart</span>
                                        </div>}
                                </Row>)
                        }
                    </Card.Body>
                    <div>Reviews</div>
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
