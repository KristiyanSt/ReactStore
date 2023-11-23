import { useContext } from "react"
import { ProductsContext } from "../../contexts/ProductsCtx.js"
import { AlertContext } from "../../contexts/AlertContext.js"
import useForm from "../../hooks/useForm.js"
import { Button, Form } from "react-bootstrap"
import { productFormGroups } from "../common/formGroups.js"
import { productValidator } from "../common/validators.js"
import FormGroup from "../common/FormGroup.js"
import { AuthContext } from "../../contexts/AuthContext.js"
import productService from "../../services/productService.js"
import { useNavigate } from "react-router-dom"


export default function Create() {

    const navigate = useNavigate();

    const { isLoading, setLoading, showMessage } = useContext(AlertContext);
    const { user, clearAuthFromLocalStorage} = useContext(AuthContext);

    const onCreate = async (values) => {
        setLoading(true);
        try {
            const response = await productService.createProduct(values, user);
            // if(products.length < 4) {
            //     dispatch({ type: 'CREATE_PRODUCT', payload: response });
            // }
            // setProductsCount(count => count + 1);
            // if (products.length == 4) {
            //     incrementPage(1);
            // } 
            //OR USE useSearchParams and increment page in navigate function
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
    const initialValues = { name: "", price: "", quantity: "", imageUrl: "" };

    const { values,
        validationErrors,
        onChange,
        onBlur,
        formHandler } = useForm(initialValues, onCreate, productValidator);

    const disabled = Object.values(validationErrors).some(x => x) ||
        Object.values(validationErrors).some(x => x === "") ||
        isLoading;

    return (
        <div>
            <h2 className="d-flex justify-content-center mt-4" >Create new product</h2>
            <div className="d-flex justify-content-center mt-4">
                <Form onSubmit={formHandler}>

                    {productFormGroups.map((el, i) => {
                        return <FormGroup
                            key={i}
                            el={el}
                            isInvalid={validationErrors[el.name]}
                            onBlur={onBlur}
                            onChange={onChange}
                            value={values[el.name]} />
                    })}

                    <Button disabled={disabled} variant="primary" type="submit">
                        {isLoading ? 'Loading...' : 'Create'}
                    </Button>
                </Form>
            </div>
        </div>
    )
}