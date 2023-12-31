import { useContext, useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import { useSearchParams } from "react-router-dom"
import Pagination from 'react-bootstrap/Pagination'
import ProductCard from "./ProductCard.js"
import { AlertContext } from "../../contexts/AlertContext.js"
import productService from "../../services/productService.js"
import { PRODUCTS_PAGE_SIZE } from "../../constants/constants.js"


export default function Products() {
    const { showMessage } = useContext(AlertContext);

    const [products, setProducts] = useState(null);
    const [productsCount, setProductsCount] = useState(null);
    const [pages, setPages] = useState(0);

    const [params, setSearchParams] = useSearchParams({ page: 1 });
    const page = Number(params.get('page')) - 1;

    useEffect(() => {
        const productsPromise = productService.getAll(page);
        const productsCountPromise = productService.getProductsCount();

        Promise.all([productsPromise, productsCountPromise])
            .then(([products, productsCount]) => {
                setProducts(products);
                setProductsCount(productsCount)
            })
            .catch((err) => {
                showMessage(err.message, 'danger');
            });
    }, [page]);

    useEffect(() => {
        setPages(Math.ceil(productsCount / PRODUCTS_PAGE_SIZE));
    }, [productsCount]);

    if (!products) {
        return null;
    }
    if (products.length == 0) {
        return <span className="d-flex justify-content-center fw-bold mt-4">
            Currently there are no products to display!
        </span>
    }
    return <div>
        <Row xs={2} md={3} lg={4} className="g-2">
            {products.map(p => <Col
                key={p._id}>
                <ProductCard product={p} />
            </Col>)}
        </Row>
        <Pagination className="float-end mt-3 me-4" variant="dark">
            {page !== 0
                && <Pagination.Item onClick={() => setSearchParams({ page: Number(params.get('page')) - 1 })} >Previous</Pagination.Item>}
            {Array.from({ length: pages }).map((page, index) => {
                return <Pagination.Item
                    key={index}
                    active={index + 1 == Number(params.get('page'))}
                    onClick={() => setSearchParams({ page: index + 1 })} >
                    {index + 1}
                </Pagination.Item>
            })}
            {page + 1 < pages
                && <Pagination.Item onClick={() => setSearchParams({ page: Number(params.get('page')) + 1 })}>Next</Pagination.Item>}
        </Pagination>
    </div>
}