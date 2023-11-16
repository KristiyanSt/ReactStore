import { useContext } from "react"
import { ProductsContext } from "../../contexts/ProductsCtx.js"
import { Col, Row } from "react-bootstrap"
import ProductCard from "./ProductCard.js";


export default function Products() {
    const { products } = useContext(ProductsContext);

    return <div >
            {products.length == 0
                && <span className="d-flex justify-content-center
                     fw-bold mt-4">
                    Currently there are no products to display!
                </span>}
            {products &&
                <Row xs={2} md={3} lg={4} className="g-2">
                    {products.map(p => <Col
                        key={p._id}>
                        <ProductCard product={p} />
                    </Col>)}
                </Row>}
        </div>
}