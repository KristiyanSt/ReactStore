import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, Card } from "react-bootstrap"
import { Rating } from 'react-simple-star-rating'
import DeleteConfirm from "./DeleteConfirm.js"
import { AuthContext } from "../../contexts/AuthContext.js"
import { AlertContext } from "../../contexts/AlertContext.js"
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext.js"
import productService from "../../services/productService.js"
import ratingService from "../../services/ratingService.js"

export default function Details() {
    const navigate = useNavigate();
    const { id } = useParams();

    const { setLoading, showMessage } = useContext(AlertContext);

    const { user, clearAuthFromLocalStorage } = useContext(AuthContext);
    const { increaseProductQuantity,
        decreaseProductQuantity,
        getQuantityInCart } = useContext(ShoppingCartContext);

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [product, setProduct] = useState(null);
    const [rating, setRating] = useState(null);

    const onDelete = async (id) => {
        try {
            setLoading(true);
            await productService.deleteProduct(id, user.accessToken);
            return navigate(-1);
        } catch (err) {
            if (err.status === 403) {
                clearAuthFromLocalStorage();
                navigate('/login');
                return showMessage('Invalid credentials, please log in', 'danger');
            } else if (err.status === 404) {
                return navigate('/not-found')
            }
            return showMessage(err.message);

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        //TODO LOADING
        productService.getProductById(id)
            .then(setProduct)
            .catch((err) => {
                if (err.status === 404) {
                    return navigate('/not-found')
                }
                showMessage(err.message,'danger')
            });
    }, [id]);

    useEffect(() => {
        if (product) {
            if (user && product._ownerId !== user._id) {
                ratingService.getUserRating(id, user?._id)
                    .then((ratingData) => {
                        if (ratingData.length !== 0) {
                            setRating(ratingData[0].rating);
                        }
                    }).catch((err) => {
                        showMessage(err.message, 'danger');
                    });
            }
        }
    }, [product])

    const onRatingClick = (rating) => {
        ratingService.rateProduct(product._id, rating, user.accessToken)
            .then(data => {
                return setRating(data.rating);
            }).catch((err) => {
                if (err.status == 403) {
                    clearAuthFromLocalStorage();
                    navigate('/login');
                    return showMessage('Invalid credentials, please log in', 'danger');
                }
                return showMessage(err.message);
            });
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
                                <div className="d-flex align-items-center
                                flex-column" style={{ gap: '.5rem' }}>
                                    <div className="d-flex align-items-center 
                                                justify-content-center" style={{ gap: '.5rem' }}>
                                        <Button as={Link} to={`/products/edit/${product._id}`} variant="success">Edit</Button>
                                        <Button as={Link} onClick={() => setIsConfirmOpen(true)} variant="danger">Delete</Button>
                                    </div>
                                </div>
                                :
                                <div>
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
                                            {product.quantity == quantityInCart && <span className="text-danger fw-bold">No more products available</span>}
                                            <span className="fs-5 ms-2 text-success fw-bold">{quantityInCart} added in cart</span>
                                        </div>}
                                </div>)
                        }
                    </Card.Body>
                    {user &&
                        (user._id !== product._ownerId
                            ? <div className="container-fluid mb-2" >
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
                            : null)}
                </Card>

            }
            <DeleteConfirm
                isOpen={isConfirmOpen}
                onDelete={() => onDelete(product?._id)}
                closeConfirm={() => setIsConfirmOpen(false)}
                product={product}
            />
        </div >
    )
}
