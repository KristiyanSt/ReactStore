import { Link } from "react-router-dom"
import { Card } from "react-bootstrap"

export default function ProductCard({
    product
}) {

    return <Card>
        <Card.Img
            variant="top"
            src={product.imageUrl}
            height="300px"
            style={{ objectFit: "contain" }}
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