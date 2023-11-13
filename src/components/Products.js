import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../contexts/ProductsCtx.js";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard.js";


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
    return <div>
        <form>
            <div style={{ marginLeft: '700px' }}>
                <input type="text" name="name" onChange={onChange} value={params.get('name')} />
                <button onClick={onClick}>search</button>
            </div>
            <div>
                <label htmlFor="gender">Choose gender:</label>
                <select name="gender" id="gender" onChange={onChange} value={params.get('gender') || "Men"}>
                    <option value="male">Men</option>
                    <option value="female">Women</option>
                </select>
            </div>
            <div>
                <label htmlFor="type">Choose type:</label>
                <select name="type" id="type" onChange={onChange} value={params.get('type') || "Lifestyle"}>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Sport">Sport</option>
                    <option value="Classic">Classic</option>
                </select>
            </div>
            <div>
                <label htmlFor="material">Choose material:</label>
                <select name="material" id="material" onChange={onChange} value={params.get('material') || 'Leather'}>
                    <option value="leather">Leather</option>
                    <option value="textile">Textile</option>
                    <option value="synthetic">Synthetic</option>
                </select>
            </div>
        </form>
        {products && products.map(p => <ProductCard key={p._id} product={p} />)}
    </div>

}