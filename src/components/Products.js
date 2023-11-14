import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../contexts/ProductsCtx.js";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard.js";
import { Stack } from "react-bootstrap";


export default function Products() {
    const { products, setParameters } = useContext(ProductsContext);

    // const initialValues = { type: "", material: "" };
    const [params, setSearchParams] = useSearchParams();
    const [formValues, setFormValues] = useState(Object.fromEntries(params));

    useEffect(() => {
        if (Object.values(formValues).length != 0) {
            setSearchParams(formValues);
            setParameters(formValues);
        }
    }, [formValues]);

    function onChange(e) {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }

    function onClick() {
        const name = formValues.name;
        setFormValues({ ...formValues, 'name': name });
    }
    return <div class="jumbotron ms-2" >
        <h1>Bootstrap Tutorial</h1>
        <p>Bootstrap is the most popular HTML, CSS...</p>
    </div>

}