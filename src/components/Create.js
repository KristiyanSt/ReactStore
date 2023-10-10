import { Button, Form } from "react-bootstrap";
import useForm from "../hooks/useForm.js";
import { request } from "../request.js";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.js";
import useProducts from "../hooks/useProducts.js";
import { useNavigate } from "react-router-dom";

export default function Create() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { setProducts } = useProducts();

    async function onSubmit(values) {
        const result = await request('/data/products', values, 'post', user.accessToken);
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