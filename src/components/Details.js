import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Modal, Placeholder } from "react-bootstrap";
import { ProductsContext } from "../contexts/ProductsCtx.js";
import { AuthContext } from "../contexts/AuthContext.js";


export default function Details() {
    const { id } = useParams();
    const { setProductDetails, onDelete } = useContext(ProductsContext);

    const { user } = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);
    const [product, setProduct] = useState();

    useEffect(() => {
        setProductDetails(id, setProduct);
    }, []);

    return (
        <div>

            <Modal show={showModal} fullscreen={'md'} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete {product?.name} ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>You cannot reverse this operation!</Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowModal(false)} variant="secondary">Close</Button>
                    <Button onClick={() => onDelete(id)} variant="danger">Delete</Button>
                </Modal.Footer>
            </Modal>

            <h1 style={{ textAlign: "center" }}>Details</h1>
            {product && <Card className="text-center d-flex justify-content-center" style={{ width: '25rem', margin: "20px", display: "inline-block", position: 'center' }}>
                {/* <Card.Header>{product.name}</Card.Header> */}
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Img variant="top" src={product.imageUrl} />
                    <Card.Text>
                        Type: {product.type}
                        <br></br>
                        Price: ${product.price}
                    </Card.Text>
                    {user._id == product._ownerId
                        ? <>
                            <Link to={`/products/edit/${product._id}`} style={{ display: "inline-block", marginRight: "20px", fontSize: "25px" }}>Edit</Link>
                            <Link onClick={() => setShowModal(true)} style={{ display: "inline-block", marginRight: "20px", fontSize: "25px" }}>Delete</Link>
                        </>
                        : <Link onClick={() => user.addToCart(product._id)} style={{ display: "inline-block", marginRight: "20px", fontSize: "25px" }}>Add to cart</Link>}
                </Card.Body>
                <Card.Footer className="text-muted">Uploaded on {new Date(product._createdOn).toLocaleDateString()}</Card.Footer>
            </Card>}

        </div >
    )
}