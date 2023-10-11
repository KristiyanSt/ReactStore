import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap"
import { AuthContext } from "../contexts/AuthContext.js";
import useForm from "../hooks/useForm.js"
import { useContext } from "react";



export default function Login() {
    const { onLogin } = useContext(AuthContext);
    const { values, onChange, formHandler } = useForm({ email: "", password: "" }, onLogin);

    return (
        <div>
            <h2 className="d-flex justify-content-center" style={{ marginTop: "30px" }}>Login</h2>
            <div className="d-flex justify-content-center" style={{ marginTop: "30px" }}>
                <Form onSubmit={formHandler}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={onChange} type="email" name="email" placeholder="Enter email"></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={onChange} type="password" name="password" placeholder="Enter password"></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary" >Submit</Button>
                    <p style={{ marginTop: "15px" }} >Don't have an account? <Link to="/register">Sign up here!</Link> </p>
                </Form>
            </div >
        </div>
    )
}