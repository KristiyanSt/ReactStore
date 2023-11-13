import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductCard({
    product
}) {
    return (<Card className="h-100"style={{ width: '18rem', margin: "20px", display: "inline-block" }}>
        <Card.Img
            variant="top"
            src={product.imageUrl}
            height="200px"
            style={{ objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column">
            <Card.Title 
            className="d-flex justify-content-between align-items-baseline mb-4">
                <span className="fs-4">{product.name}</span>
                <span className="fs-6 ms-2 text-muted">${product.price}</span>
                </Card.Title>
            {/* <Button reloadDocument href="/details">Active</Button> */}
            <Link to={`/products/details/${product._id}`} variant="primary">Details</Link>
        </Card.Body>
    </Card>)
}