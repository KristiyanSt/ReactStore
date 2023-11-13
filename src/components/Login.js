import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap"
import { AuthContext } from "../contexts/AuthContext.js";
import useForm from "../hooks/useForm.js"
import { useContext } from "react";
import FormGroup from "./common/FormGroup.js";
import { loginGroups } from "./common/formGroups.js";
import { AlertContext } from "../contexts/AlertContext.js";
import { loginValidator } from "./common/validators.js";

export default function Login() {
    const { onLogin } = useContext(AuthContext);
    const { isLoading } = useContext(AlertContext);

    const initialValues = { email: "", password: "" };

    const { values,
        validationErrors,
        onChange,
        onBlur,
        formHandler } = useForm(initialValues, onLogin, loginValidator);

    const disabled = Object.values(validationErrors).some(x => x) ||
        Object.values(validationErrors).some(x => x === "") ||
        isLoading;

    return (
        <div>
            <h2 className="d-flex justify-content-center" style={{ marginTop: "30px" }}>Login</h2>
            <div className="d-flex justify-content-center" style={{ marginTop: "30px" }}>
                <Form onSubmit={formHandler}>

                    {loginGroups.map((x, i) => <FormGroup key={i}
                        el={x}
                        isInvalid={validationErrors[x.name]}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={values[x.name]} />)}

                    <Button type="submit"
                        variant="primary"
                        disabled={disabled}>
                        {isLoading ? 'Loading...' : 'Login'}
                    </Button>
                    <p style={{ marginTop: "15px" }} >Don't have an account? <Link to="/register">Sign up here!</Link> </p>
                </Form>
            </div >
        </div >
    )
}