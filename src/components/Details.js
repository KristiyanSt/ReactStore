import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { request } from "../request.js";
import { Button, Card, Placeholder } from "react-bootstrap";


export default function Details() {
    const { id } = useParams();

    const [product, setProduct] = useState();

    useEffect(() => {
        request(`/data/products/${id}`)
            .then(product => setProduct(product));
    }, []);
    
    return (
        <div>
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
                        <Link to={`/products/edit/${product._id}`} style={{display:"inline-block", marginRight: "20px",  fontSize: "25px"}}>Edit</Link>
                        <Link to={`/products/delete/${product._id}`} style={{display:"inline-block", marginRight: "20px", fontSize: "25px"}}>Delete</Link>
                    </Card.Body>
                    <Card.Footer className="text-muted">Uploaded on {new Date(product._createdOn).toLocaleDateString()}</Card.Footer>
                </Card>}
        </div >
    )
}