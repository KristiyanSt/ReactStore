import { useContext } from "react";
import ProductCard from "./ProductCard.js";
import { ProductsContext } from "../contexts/ProductsCtx.js";
import { useSearchParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

export default function Home() {
    const { products } = useContext(ProductsContext);

    const [params, setSearchParams] = useSearchParams({ query: "", });

    const setParams = (e) => {
        setSearchParams({ [e.target.name]: e.target.value })
    }

    return (
            // {/* <div style={{ marginLeft: '700px' }}>
            //     <input type="text" name="query" onChange={setParams} value={params.get('query')} /><button>search</button>
            // </div> */}
        <div className="d-flex justify-content-center">
            {products.length == 0 && <span style={{fontSize: '25px'}} className="d-flex justify-content-center fw-bold mt-4">Currently there are no products to display!</span>}
            {products &&
                <Row xs={2} md={3} lg={4} className="g-2">
                    {products.map(p => <Col key={p._id}><ProductCard product={p} /></Col>)}
                </Row>}
        </div>
    )
}