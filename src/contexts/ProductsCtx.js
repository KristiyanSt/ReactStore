import { createContext, useEffect, useState } from "react";
import { requestFactory } from "../request.js";
export const ProductsContext = createContext();

export default function ProductsProvider({children}) {
    const request = requestFactory();
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        request.get('/data/products')
            .then(result => setProducts(result));
    },[]);

    const context = {
        products ,
        setProducts
    }
    
    return <ProductsContext.Provider value={context}>
        {children}
    </ProductsContext.Provider>
}
