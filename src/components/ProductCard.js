import { Card, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductCard({
    product
}) {
    return (<Card style={{ width: '18rem', margin: "20px", display: "inline-block" }}>
        <Card.Img variant="top" src={product.imageUrl} />
        <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
                Type: {product.type}
                <br></br>
                Price: ${product.price}
            </Card.Text>
            {/* <Button reloadDocument href="/details">Active</Button> */}
            <Link to={`/products/details/${product._id}`} variant="primary">Details</Link>
        </Card.Body>
    </Card>)
}