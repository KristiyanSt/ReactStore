import { useEffect, useState } from "react";

import { request } from "../request.js";

import ProductCard from "./ProductCard.js";
import useProducts from "../hooks/useProducts.js";
import { Card, Placeholder } from "react-bootstrap";

export default function Home() {
    const { products } = useProducts();

    return (
        <div>
            <h1 className="d-flex justify-content-center" >Welcome to my store!</h1>

            {products.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
    )
}