import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Form } from "react-bootstrap"
import FormGroup from "../common/FormGroup.js"
import { AlertContext } from "../../contexts/AlertContext.js"
import { AuthContext } from "../../contexts/AuthContext.js"
import useForm from "../../hooks/useForm.js"
import useValidate from "../../hooks/useValidate.js"
import productService from "../../services/productService.js"
import { productFormGroups } from "../../common/formGroups.js"
import { productValidator } from "../../common/validators.js"

export default function Edit() {
    const navigate = useNavigate();

    const { isLoading, setLoading, showMessage } = useContext(AlertContext);
    const { user, clearAuthFromLocalStorage } = useContext(AuthContext);
    const { id } = useParams();

    const onEdit = async (values) => {
        try {
            setLoading(true);
            const edited = await productService.editProduct(id, values, user.accessToken);
            showMessage(`Successfully edited ${edited.name}`);
            return navigate(-1);
        } catch (err) {
            if (err.status === 403) {
                clearAuthFromLocalStorage();
                navigate('/login');
                return showMessage('Invalid credentials, please log in', 'danger');
            } else if (err.status === 404) {
                return navigate('/not-found');
            }
            return showMessage(err.message, 'danger');
        } finally {
            setLoading(false);
        }
    }

    const initialValues = {
        name: "",
        price: "",
        imageUrl: "",
        quantity: ""
    };

    const { values,
        onChange,
        formHandler,
        setValues } = useForm(initialValues, onEdit);

    const {
        validationErrors,
        onBlur
    } = useValidate(initialValues, values, productValidator);

    useEffect(() => {
        productService.getProductById(id)
            .then(result => {
                if (user._id !== result._ownerId) {
                    throw new Error('You are unauthorized')
                }
                return setValues({
                    name: result.name,
                    price: result.price,
                    imageUrl: result.imageUrl,
                    quantity: result.quantity
                });
            })
            .catch((err) => {
                if (err.status === 404) {
                    return navigate('/not-found')
                }
                showMessage(err.message, 'danger');
                return navigate('/');

            });
    }, [id]);

    const disabled = Object.values(validationErrors).some(x => x) ||
        isLoading;

    return <div>
        <h2 className="d-flex justify-content-center mt-4">Edit product</h2>
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

                <Button
                    variant="primary"
                    type="submit"
                    disabled={disabled}>
                    {isLoading ? 'Loading...' : 'Edit'}
                </Button>
            </Form>
        </div>
    </div>
}