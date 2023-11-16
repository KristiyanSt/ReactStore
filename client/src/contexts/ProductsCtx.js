import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext.js';
import productService from "../services/productService.js";
import productsReducer from "../reducers/productsReducer.js";
import { AlertContext } from "./AlertContext.js";


export const ProductsContext = createContext();

export default function ProductsProvider({ children }) {
    const navigate = useNavigate();
    const { setLoading, showMessage } = useContext(AlertContext);

    const { user } = useContext(AuthContext);
    const { products, dispatch } = useProducts();

    async function onEdit(productId, values) {
        //TODO handle 404 not found
        setLoading(true);
        try {
            const product = await productService.editProduct(productId, values, user.accessToken);
            dispatch({ type: 'EDIT_PRODUCT', payload: product });
            navigate('/products/details/' + productId);
        } catch (err) {
            showMessage(err.message, 'danger');
        } finally {
            setLoading(false);
        }
    }
    async function onDelete(id) {
        //TODO handle 404 not found
        setLoading(true);
        try {
            await productService.deleteProduct(id, user.accessToken);
            dispatch({ type: 'DELETE_PRODUCT', payload: id });
            navigate('/');

        } catch (err) {
            showMessage(err.message, 'danger');
        } finally {
            setLoading(false);
        }
    }
    async function onCreate(values) {
        setLoading(true);
        try {
            const result = await productService.createProduct(values, user);
            console.log(result)
            dispatch({ type: 'CREATE_PRODUCT', payload: result });
            navigate('/');
        } catch (err) {
            showMessage(err.message, 'danger');
            navigate('/login');
        } finally {
            setLoading(false);
        }
    }

    const context = {
        products,
        onEdit,
        onCreate,
        onDelete
    }

    return <ProductsContext.Provider value={context}>
        {children}
    </ProductsContext.Provider>
}

function useProducts() {

    const [products, dispatch] = useReducer(productsReducer, []);

    useEffect(() => {
        try {
            productService.getAll()
                .then(products => dispatch({ type: 'PRODUCTS_FETCH', payload: products }))
                .catch(err => {
                    console.log(err.message);
                })
        } catch (err) {
            console.log(err.message);
        }
    }, []);

    return { products, dispatch };
}


