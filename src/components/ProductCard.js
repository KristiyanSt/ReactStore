import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductCard({
    product
}) {
    return <Card>
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
            <Link className="stretched-link" to={`/products/details/${product._id}`}></Link>
        </Card.Body>
    </Card>
}