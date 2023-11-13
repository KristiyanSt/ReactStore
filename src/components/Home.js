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
        <div>
            <div style={{ marginLeft: '700px' }}>
                <input type="text" name="query" onChange={setParams} value={params.get('query')} /><button>search</button>
            </div>
            {products.length == 0 && <h3 className="d-flex justify-content-center"> There are no products!</h3>}
            {products &&
                <Row md={2} xs={1} lg={3} className="g-3">
                    {products.map(p => <Col key={p._id}><ProductCard product={p} /></Col>)}
                </Row>}
        </div >
    )
}