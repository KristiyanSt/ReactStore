import { useContext } from "react"
import { ProductsContext } from "../../contexts/ProductsCtx.js"
import { AlertContext } from "../../contexts/AlertContext.js"
import useForm from "../../hooks/useForm.js"
import { Button, Form } from "react-bootstrap"
import { productFormGroups } from "../common/formGroups.js"
import { productValidator } from "../common/validators.js"
import FormGroup from "../common/FormGroup.js"


export default function Create() {

    const { onCreate } = useContext(ProductsContext);
    const { isLoading } = useContext(AlertContext);

    const initialValues = { name: "", price: "", quantity: "", imageUrl: ""};

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
                            value={values[el.name]} /> })}

                    <Button disabled={disabled} variant="primary" type="submit">
                        {isLoading ? 'Loading...' : 'Create'}
                    </Button>
                </Form>
            </div>
        </div>
    )
}