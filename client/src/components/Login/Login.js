import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext.js"
import { AlertContext } from "../../contexts/AlertContext.js"
import { Form, Button } from "react-bootstrap"
import useForm from "../../hooks/useForm.js"
import FormGroup from "../common/FormGroup.js"
import { loginGroups } from "../common/formGroups.js"
import { loginValidator } from "../common/validators.js"
import useValidate from "../../hooks/useValidate.js"

export default function Login() {
    const { onLogin } = useContext(AuthContext);
    const { isLoading } = useContext(AlertContext);

    const initialValues = { email: "", password: "" };

    const { values,
        onChange,
        formHandler } = useForm(initialValues, onLogin);
    const {
        validationErrors,
        onBlur
    } = useValidate(initialValues, values, loginValidator);

    const disabled = Object.values(validationErrors).some(x => x) ||
        Object.values(validationErrors).some(x => x === "") ||
        isLoading;

    return <div>
            <h2 className="d-flex justify-content-center mt-4">Login</h2>
            <div className="d-flex justify-content-center mt-4">
                <Form onSubmit={formHandler}>

                    {loginGroups.map((x, i) => <FormGroup key={i}
                        el={x}
                        isInvalid={validationErrors[x.name]}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={values[x.name]} />)}

                    <Button 
                        type="submit"
                        variant="primary"
                        disabled={disabled}>
                        {isLoading ? 'Loading...' : 'Login'}
                    </Button>
                    <p className="mt-3">Don't have an account? <Link to="/register">Sign up here!</Link> </p>
                </Form>
            </div >
        </div >
}