import { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../contexts/AuthContext.js'
import productService from "../services/productService.js"
import { AlertContext } from "./AlertContext.js"
import { usePage } from "../hooks/usePage.js"

const pageSize = 4;
export const ProductsContext = createContext();

export default function ProductsProvider({ children }) {
    const navigate = useNavigate();
    const { setLoading, showMessage } = useContext(AlertContext);
    const { user, clearAuthFromLocalStorage } = useContext(AuthContext);
    // const { products, dispatch, setPage, page, productsCount, setProductsCount } = useProducts();
    
    const [products, setProducts] = useState([]);
    const {
        page,
        pages,
        setPage,
        offset,
        setProductsCount,
        incrementPage,
        decrementPage
    } = usePage(4);


    // const [page, setPage] = useState(0);
    // const [productsCount, setProductsCount] = useState(0);

    async function onEdit(id, values) {
        //TODO handle 404 not found
        try {
            setLoading(true);
            const edited = await productService.editProduct(id, values, user.accessToken);
            // dispatch({ type: 'EDIT_PRODUCT', payload: product });
            showMessage(`Successfully edited ${edited.name}`);
            navigate('/products');
        } catch (err) {
            showMessage(err.message, 'danger');
        } finally {
            setLoading(false);
        }
    }
    async function onDelete(id) {
        //TODO handle 404 not found

        try {
            setLoading(true);
            await productService.deleteProduct(id, user.accessToken);
            // dispatch({ type: 'DELETE_PRODUCT', payload: id });
            if (products.length === 1) {
                decrementPage(1);
            }
            navigate('/products');
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
            // if(products.length < 4) {
            //     dispatch({ type: 'CREATE_PRODUCT', payload: response });
            // }
            // setProductsCount(count => count + 1);
            if (products.length == 4) {
                incrementPage(1);
            } //OR USE useSearchParams and increment page in navigate function
            navigate(`/products`);
        } catch (err) {
            console.log(err);
            if (err.status == 403) {
                clearAuthFromLocalStorage();
                showMessage('Invalid credentials, please log in !', 'danger');
            }
            navigate('/login');
        } finally {
            setLoading(false);
        }
    }

    const context = {
        products,
        setProducts,
        onEdit,
        onCreate,
        onDelete,
        page,
        setPage,
        pages,
        offset,
        setProductsCount,
        incrementPage,
        decrementPage
    }

    return <ProductsContext.Provider value={context}>
        {children}
    </ProductsContext.Provider>
}

