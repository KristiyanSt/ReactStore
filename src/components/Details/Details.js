import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Row } from "react-bootstrap";
import { ProductsContext } from "../../contexts/ProductsCtx.js";
import { AuthContext } from "../../contexts/AuthContext.js";
import productService from "../../services/productService.js";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext.js";
import DeleteConfirm from "./DeleteConfirm.js";
import { Rating } from 'react-simple-star-rating'
import ratingService from "../../services/ratingService.js";

export default function Details() {
    const { id } = useParams();

    const { user } = useContext(AuthContext);
    const { onDelete } = useContext(ProductsContext);
    const { increaseProductQuantity, decreaseProductQuantity, getQuantityInCart } = useContext(ShoppingCartContext);

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [product, setProduct] = useState(null);
    const [rating, setRating] = useState(null);

    useEffect(() => {
        // handle unauthorized
        if (product == null) {
            productService.getProductById(id)
                .then(setProduct);
            ratingService.getUserRating(id, user._id)
                .then(data => {
                    if (data.length !== 0) {
                        setRating(data.rating);
                    }
                });
        }

        if (rating == null) {
            ratingService.rateProduct(product._id, rating, user.accessToken)
                .then(setRating)
        }

    }, [rating]);

    // useEffect(() => {
    // }, [rating]);



    const onRatingClick = (rating) => {
        setRating(rating);
    }
    const quantityInCart = getQuantityInCart(product?._id);
    return (
        <div className="d-flex justify-content-center">
            {product &&
                <Card className="w-25 mt-4 h-100" style={{ width: '700px' }}>
                    <Card.Img
                        className="mb-2"
                        variant="top"
                        src={product.imageUrl}
                        height="200px"
                        style={{ objectFit: "cover" }} />
                    <Card.Body className="d-flex flex-column">
                        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                            <span className="fs-2">{product.name} </span>
                            <span className="ms-2 text-muted">${product.price}</span>
                        </Card.Title>
                        {user &&
                            (user._id == product._ownerId ?
                                <Row>
                                    <Button as={Link} to={`/products/edit/${product._id}`} style={{ display: "inline-block", marginRight: "20px", fontSize: "25px" }}>Edit</Button>
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
                    <div className="container-fluid mb-2" >
                        <span className="fs-5">Rate this product :</span>
                        <div>
                            <Rating
                                allowFraction
                                size={20}
                                onClick={onRatingClick}
                                readonly={!!rating}
                                initialValue={rating || 0}
                            />
                        </div>
                    </div>
                </Card>}
            <div>
                <div className="shadow-lg p-4 mb-4 bg-white">Large shadow</div>
                <div className="shadow-lg p-4 mb-4 bg-white">Large shadow</div>
                <div className="shadow-lg p-4 mb-4 bg-white">Large shadow</div>
                <div className="shadow-lg p-4 mb-4 bg-white">Large shadow</div>
                <div className="shadow-lg p-4 mb-4 bg-white">Large shadow</div>
            </div>
            <DeleteConfirm
                isOpen={isConfirmOpen}
                onDelete={() => onDelete(product?._id)}
                closeConfirm={() => setIsConfirmOpen(false)}
                product={product}
            />
        </div >
    )
}
