import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requestFactory } from "../request.js";
import { ProductsContext } from "../contexts/ProductsCtx.js";
import { Button, Form } from "react-bootstrap";
import useForm from "../hooks/useForm.js";

export default function Edit() {
    //TODO check if user is author of the record

    const request = requestFactory();
    const { onEdit } = useContext(ProductsContext);
    const { id } = useParams();

    const initialValues = {
        name: "",
        price: "",
        type: "",
        imageUr: ""
    }

    const { values, onChange, formHandler, setValues } = useForm(initialValues, onEdit);

    useEffect(() => {
        request.get('/data/products/' + id)
            .then(result => setValues(result));
    }, []);

    return (
        <div>
            <h2 className="d-flex justify-content-center" style={{ marginTop: "30px" }} >Edit product</h2>
            <div className="d-flex justify-content-center" style={{ marginTop: "30px" }} >
                <Form onSubmit={formHandler}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Product name</Form.Label>
                        <Form.Control value={values.name} type="text" name="name" onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control value={values.price} type="number" name="price" onChange={onChange}
                            placeholder="Enter product's price" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="type">
                        <Form.Label>Type</Form.Label>
                        <Form.Control value={values.type} type="text" name="type" onChange={onChange}
                            placeholder="Enter type of the product" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="imageUrl">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control value={values.imageUrl} type="text" name="imageUrl" onChange={onChange}
                            placeholder="Enter image url" />
                    </Form.Group>
                    <Button style={{ display: "inline-block" }} variant="primary" type="submit">
                        Edit
                    </Button>
                </Form>
            </div>
        </div>);
}