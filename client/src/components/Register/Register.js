import { useContext } from "react"
import { Link } from "react-router-dom"
import { Button, Form } from "react-bootstrap"
import FormGroup from "../common/FormGroup.js"
import { AuthContext } from "../../contexts/AuthContext.js"
import { AlertContext } from "../../contexts/AlertContext.js"
import useForm from "../../hooks/useForm.js"
import useValidate from "../../hooks/useValidate.js"
import { registerGroups } from "../../common/formGroups.js"
import { registerValidator } from "../../common/validators.js"

export default function Register() {
    const { onRegister } = useContext(AuthContext);
    const { isLoading } = useContext(AlertContext);

    const initialValues = { email: "", username: "", password: "", confirmPassword: "" };

    const { values,
        onChange,
        formHandler } = useForm(initialValues, onRegister);

    const {
        validationErrors,
        onBlur
    } = useValidate(initialValues, values, registerValidator);

    const disabled = Object.values(validationErrors).some(x => x) ||
        Object.values(validationErrors).some(x => x === "") ||
        isLoading;

    return <div>
        <h2 className="d-flex justify-content-center mt-4">Register</h2>
        <div className="d-flex justify-content-center  mt-4">
            <Form onSubmit={formHandler}>

                {registerGroups.map((x, i) => <FormGroup key={i}
                    el={x}
                    isInvalid={validationErrors[x.name] == true}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={values[x.name]} />)}

                <Button
                    type="submit"
                    variant="primary"
                    disabled={disabled}>
                    {isLoading ? 'Loading...' : 'Register'}
                </Button>
                <p className="mt-3">Already have an account? <Link to="/login">Sign in here!</Link> </p>
            </Form>
        </div >
    </div>
}