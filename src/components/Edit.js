import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../contexts/ProductsCtx.js";
import { Button, Form } from "react-bootstrap";
import useForm from "../hooks/useForm.js";
import productService from "../services/productService.js";
import { productValidator } from "./common/validators.js";
import { AlertContext } from "../contexts/AlertContext.js";
import FormGroup from "./common/FormGroup.js";
import { productFormGroups } from "./common/formGroups.js";

export default function Edit() {
    //TODO check if user is author of the record

    const { onEdit } = useContext(ProductsContext);
    const { isLoading } = useContext(AlertContext);

    const { id } = useParams();

    const initialValues = {
        name: "",
        brand: "",
        price: "",
        gender: "",
        imageUrl: "",
        type: "",
        material: ""
    };

    const { values,
        validationErrors,
        onChange,
        onBlur,
        formHandler,
        setValues } = useForm(initialValues, onEdit.bind(null, id), productValidator);

    useEffect(() => {
        productService.getProductById(id)
            .then(result => setValues({
                name: result.name,
                brand: result.brand,
                price: result.price,
                gender: result.gender,
                imageUrl: result.imageUrl,
                type: result.type,
                material: result.material
            }));
    }, []);

    const disabled = Object.values(validationErrors).some(x => x) ||
        isLoading;

    return (
        <div>
            <h2 className="d-flex justify-content-center" style={{ marginTop: "30px" }} >Edit product</h2>
            <div className="d-flex justify-content-center" style={{ marginTop: "30px" }} >
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
                        style={{ display: "inline-block" }}
                        variant="primary"
                        type="submit"
                        disabled={disabled}>
                        {isLoading ? 'Loading...' : 'Edit'}
                    </Button>
                </Form>
            </div>
        </div>);
}