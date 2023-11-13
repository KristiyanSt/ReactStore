import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.js";
import useForm from "../hooks/useForm.js"

import FormGroup from "./common/FormGroup.js";
import { registerGroups } from "./common/formGroups.js";
import { AlertContext } from "../contexts/AlertContext.js";
import { registerValidator } from "./common/validators.js";

export default function Register() {
    const { onRegister } = useContext(AuthContext);
    const { isLoading } = useContext(AlertContext);

    const initialValues = { email: "", username: "", city: "", password: "", confirmPassword: "" };

    const { values, 
        validationErrors, 
        onChange, 
        onBlur, 
        formHandler } = useForm(initialValues, onRegister, registerValidator);

    const disabled = Object.values(validationErrors).some(x => x) ||
        Object.values(validationErrors).some(x => x === "") || 
        isLoading;
        
    return (
        <div>
            <h2 className="d-flex justify-content-center" style={{ marginTop: "30px" }}>Register</h2>
            <div className="d-flex justify-content-center" style={{ marginTop: "30px" }}>
                <Form onSubmit={formHandler}>

                    {registerGroups.map((x,i) => <FormGroup key={i} 
                        el={x}
                        isInvalid={validationErrors[x.name] == true}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={values[x.name]} />)}

                    <Button type="submit"
                        variant="primary"
                        disabled={disabled}>
                        {isLoading ? 'Loading...' : 'Register'}
                    </Button>
                    <p style={{ marginTop: "15px" }}>Already have an account? <Link to="/login">Sign in here!</Link> </p>
                </Form>
            </div >
        </div>
    )
}