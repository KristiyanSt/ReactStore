import { createContext, useContext, useEffect, useReducer, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext.js';
import productService from "../services/productService.js";
import productsReducer from "../reducers/productsReducer.js";
import { AlertContext } from "./AlertContext.js"

const pageSize = 4;
export const ProductsContext = createContext();

export default function ProductsProvider({ children }) {
    const navigate = useNavigate();
    const { setLoading, showMessage } = useContext(AlertContext);

    const { user, clearLocalStorage } = useContext(AuthContext);
    const { products, dispatch, setPage, page, productsCount, setProductsCount } = useProducts();

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
            const response = await productService.createProduct(values, user);
            if(products.length < 4) {
                dispatch({ type: 'CREATE_PRODUCT', payload: response });
            }
            setProductsCount(count => count + 1);
            navigate(`/products/details/${response._id}`);
        } catch (err) {
            if (err.status == 403) {
                clearLocalStorage();
                showMessage('Invalid credentials, please log in !', 'danger');
            }
            navigate('/login');
        } finally {
            setLoading(false);
        }
    }

    const context = {
        products,
        onEdit,
        onCreate,
        onDelete,
        setPage,
        page,
        productsCount
    }

    return <ProductsContext.Provider value={context}>
        {children}
    </ProductsContext.Provider>
}

function useProducts() {

    const [products, dispatch] = useReducer(productsReducer, []);
    // const [products,setProducts]= useState([]);
    const [page, setPage] = useState(0);
    const [productsCount, setProductsCount] = useState(0);

    useEffect(() => {

        productService.getAll(page,pageSize)
            .then(products => {
                // setProducts(products);
                dispatch({ type: 'PRODUCTS_FETCH', payload: products })
            })
            .catch(err => {
                console.log(err.message);
            });

        productService.getProductsCount()
            .then(count => setProductsCount(count))
            .catch(err => {
                console.log(err.message);
            });

    }, [page]);

    return { products, dispatch, setPage, page, productsCount };
}


