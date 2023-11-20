import { useContext, useState } from "react"
import { ProductsContext } from "../../contexts/ProductsCtx.js"
import { Col, Row } from "react-bootstrap"
import ProductCard from "./ProductCard.js";
import Pagination from 'react-bootstrap/Pagination';

export default function Products() {

    const { products, setPage, page, productsCount } = useContext(ProductsContext);

    const pages = Math.ceil(productsCount / 4);

    return <div>
        {products.length == 0
            ? <span className="d-flex justify-content-center
                     fw-bold mt-4">
                Currently there are no products to display!
            </span>

            : <>
                <Row xs={2} md={3} lg={4} className="g-2">
                    {products.map(p => <Col
                        key={p._id}>
                        <ProductCard product={p} />
                    </Col>)}
                </Row>
                <Pagination>
                    {page !== 0
                        && <Pagination.Item onClick={() => setPage(page - 1)} >Prev</Pagination.Item>}

                    <Pagination.Item active>{page + 1} </Pagination.Item>

                    {page + 1 < pages
                        && <Pagination.Item onClick={() => setPage(page + 1)}>Next</Pagination.Item>}
                </Pagination>
            </>
        }
    </div>
}