import { useEffect, useState } from "react";
import { request } from "../request.js";

export default function useProducts () {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        request('/data/products')
            .then(data => setProducts(data));
    }, [])

    return {
        products,
        setProducts
    }
}