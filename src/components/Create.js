import { Button, Form } from "react-bootstrap";
import { useContext } from "react";
import useForm from "../hooks/useForm.js";
import { ProductsContext } from "../contexts/ProductsCtx.js";
import { productFormGroups } from "./common/formGroups.js";
import { productValidator } from "./common/validators.js";
import { AlertContext } from "../contexts/AlertContext.js";
import FormGroup from "./common/FormGroup.js";


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
            <h2 className="d-flex justify-content-center" style={{ marginTop: "30px" }} >Create new product</h2>
            <div className="d-flex justify-content-center" style={{ marginTop: "30px" }} >
                <Form onSubmit={formHandler}>

                    {productFormGroups.map((el, i) => {
                        return <FormGroup
                            key={i}
                            el={el}
                            isInvalid={validationErrors[el.name]}
                            onBlur={onBlur}
                            onChange={onChange}
                            value={values[el.name]} /> })}

                    <Button disabled={disabled} style={{ display: "inline-block" }} variant="primary" type="submit">
                        {isLoading ? 'Loading...' : 'Create'}
                    </Button>
                </Form>
            </div>
        </div>
    )
}