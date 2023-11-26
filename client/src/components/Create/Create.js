import { useContext } from "react"
import { Button, Form } from "react-bootstrap"
import FormGroup from "../common/FormGroup.js"
import { AlertContext } from "../../contexts/AlertContext.js"
import { AuthContext } from "../../contexts/AuthContext.js"
import { useNavigate } from "react-router-dom"
import useForm from "../../hooks/useForm.js"
import useValidate from "../../hooks/useValidate.js"
import productService from "../../services/productService.js"
import { productFormGroups } from "../../common/formGroups.js"
import { productValidator } from "../../common/validators.js"


export default function Create() {

    const navigate = useNavigate();

    const { isLoading, setLoading, showMessage } = useContext(AlertContext);
    const { user, clearAuthFromLocalStorage } = useContext(AuthContext);

    const onCreate = async (values) => {
        try {
            setLoading(true);
            const response = await productService.createProduct(values, user);
            return navigate(`/products`);
        } catch (err) {
            if (err.status == 403) {
                clearAuthFromLocalStorage();
                showMessage('Invalid credentials, please log in !', 'danger');
                return navigate('/login');
            } else if(err.status === 401) {
                showMessage('You don\'t have permission for this action !','danger')
                return navigate('/');
            }
            showMessage(err.message,'danger');
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