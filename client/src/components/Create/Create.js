import { useContext } from "react"
import { AlertContext } from "../../contexts/AlertContext.js"
import useForm from "../../hooks/useForm.js"
import { Button, Form } from "react-bootstrap"
import { productFormGroups } from "../common/formGroups.js"
import { productValidator } from "../common/validators.js"
import FormGroup from "../common/FormGroup.js"
import { AuthContext } from "../../contexts/AuthContext.js"
import productService from "../../services/productService.js"
import { useNavigate } from "react-router-dom"
import useValidate from "../../hooks/useValidate.js"


export default function Create() {

    const navigate = useNavigate();

    const { isLoading, setLoading, showMessage } = useContext(AlertContext);
    const { user, clearAuthFromLocalStorage } = useContext(AuthContext);

    const onCreate = async (values) => {
        try {
            setLoading(true);
            const response = await productService.createProduct(values, user);
            // if(products.length < 4) {
            //     dispatch({ type: 'CREATE_PRODUCT', payload: response });
            // }
            // setProductsCount(count => count + 1);
            // if (products.length == 4) {
            //     incrementPage(1);
            // } 
            //OR USE useSearchParams and increment page in navigate function
            return navigate(`/products`);
        } catch (err) {
            if (err.status == 403) {
                clearAuthFromLocalStorage();
                showMessage('Invalid credentials, please log in !', 'danger');
                return navigate('/login');
            }
            showMessage(err.message);
            return navigate('/');
        } finally {
            setLoading(false);
        }
    }
    const initialValues = { name: "", price: "", quantity: "", imageUrl: "" };

    const { values,
        onChange,
        formHandler } = useForm(initialValues, onCreate);

    const {
        validationErrors,
        onBlur
    } = useValidate(initialValues, values, productValidator);

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