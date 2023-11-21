import { useContext, useEffect, useState } from "react"
import { ProductsContext } from "../../contexts/ProductsCtx.js"
import { Col, Row } from "react-bootstrap"
import ProductCard from "./ProductCard.js";
import Pagination from 'react-bootstrap/Pagination';
import productService from "../../services/productService.js";
import { useSearchParams } from "react-router-dom";

const pageSize = 4;

export default function Products() {

    const { products,
        setProducts,
        page,
        setPage,
        pages,
        offset,
        setProductsCount,
        incrementPage,
        decrementPage } = useContext(ProductsContext);

    // const pages = Math.ceil(productsCount / pageSize);

    const [params, setSearchParams] = useSearchParams();
    useEffect(() => {
        setPage(Number(params.get('page')) || 0)
    }, [])
    console.log(params.get('page'))

    useEffect(() => {
        productService.getAll(offset)
            .then(products => {
                setProducts(products);
            })
            .catch(err => {
                console.log(err.message);
            });

        productService.getProductsCount()
            .then(count => setProductsCount(count))
            .catch(err => {
                console.log(err.message);
            });

    }, [offset]);

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
                        && <Pagination.Item onClick={() => setSearchParams({ page: page - 1 })} >Prev</Pagination.Item>}

                    <Pagination.Item active>{page + 1} </Pagination.Item>

                    {page + 1 < pages
                        && <Pagination.Item onClick={() => setSearchParams({ page: page + 1 })}>Next</Pagination.Item>}
                </Pagination>
            </>
        }
    </div>
}