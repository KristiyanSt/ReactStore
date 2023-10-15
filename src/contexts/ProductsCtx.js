import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext.js';
import productService from "../services/productService.js";

export const ProductsContext = createContext();

export default function ProductsProvider({ children }) {
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        productService.getAll()
            .then(result => setProducts(result));

    }, []);

    async function onEdit(values) {
        //TODO check if id could be used inside ProductsCtx but not passed as params
        const product = await productService.editProduct(values._id, values, user.accessToken);
        setProducts(state => state.map(x => x._id == values._id ? product : x));
        navigate('/products/details/' + values._id);
    }
    async function onDelete(id) {
        await productService.deleteProduct(id, user.accessToken);
        setProducts(state => state.filter(x => x._id !== id));
        navigate('/');
    }
    async function onCreate(values) {
        const product = await productService.createProduct(values, user.accessToken);
        setProducts(state => [...state, product]);
        navigate('/');
    }
    async function setProductDetails(id, setProduct) {
        //TODO maybe it is better to do the request in create component since this function does getting and setting features
        const product = await productService.getProduct(id);
        setProduct(product);
    }
    async function onCartAdd(userId) {
        
    }

    const context = {
        products,
        onEdit,
        onCreate,
        onDelete,
        setProductDetails
    }

    return <ProductsContext.Provider value={context}>
        {children}
    </ProductsContext.Provider>
}
