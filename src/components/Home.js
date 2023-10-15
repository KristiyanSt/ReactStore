import { useContext } from "react";
import ProductCard from "./ProductCard.js";
import { ProductsContext } from "../contexts/ProductsCtx.js";

export default function Home() {
    const { products} = useContext(ProductsContext);

    return (
        <div>
            <h1 className="d-flex justify-content-center" >Welcome to my store!</h1>
            {products.length == 0 && <h3 className="d-flex justify-content-center"> There are no products!</h3>}
            {products && products.map(p => <ProductCard key={p._id} product={p} />)}
        </div >
    )
}