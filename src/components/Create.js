import { Button, Form } from "react-bootstrap";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm.js";
import { requestFactory } from "../request.js";
import { AuthContext } from "../contexts/AuthContext.js";
import { ProductsContext } from "../contexts/ProductsCtx.js";

const request = requestFactory();

export default function Create() {
    const navigate = useNavigate();
    const {setProducts } = useContext(ProductsContext);
    const { userState } = useContext(AuthContext);

    async function onSubmit(values) {
        const result = await request.post('/data/products', values, userState.accessToken);
        setProducts(state => [...state, result]);
        navigate('/');
    }
    const { values, onChange, formHandler } = useForm(
        { name: "", price: "", type: "", imageUrl: "" },
        onSubmit
    );
    return (
        <div>
            <h2 className="d-flex justify-content-center" style={{ marginTop: "30px" }} >Create product</h2>
            <div className="d-flex justify-content-center" style={{ marginTop: "30px" }} >
                <Form onSubmit={formHandler}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Product name</Form.Label>
                        <Form.Control type="text" name="name" onChange={onChange}
                            placeholder="Enter product's name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" name="price" onChange={onChange}
                            placeholder="Enter product's price" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="type">
                        <Form.Label>Type</Form.Label>
                        <Form.Control type="text" name="type" onChange={onChange}
                            placeholder="Enter type of the product" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="imageUrl">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control type="text" name="imageUrl" onChange={onChange}
                            placeholder="Enter image url" />
                    </Form.Group>
                    <Button style={{ display: "inline-block" }} variant="primary" type="submit">
                        Create
                    </Button>
                </Form>
            </div>
        </div>
    )
}