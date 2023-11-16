import { useState } from "react";

export default function useForm(initialValues, onSubmit, validator) {
    const [values, setValues] = useState(initialValues);
    const [validationErrors, setValidationErrors] = useState(initialValues);

    function onChange(e) {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    }
    function onBlur(e) {
        const validation = validator[e.target.name];

        if (!validation(e.target.value, values)) {
            setValidationErrors(state => ({ ...state, [e.target.name]: true }))
        } else {
            setValidationErrors(state => ({ ...state, [e.target.name]: false }))
        }

        if (initialValues.hasOwnProperty('confirmPassword')) {

            if (e.target.name == "password") {

                if (e.target.value != values.confirmPassword && values.confirmPassword != "") {
                    setValidationErrors(state => ({ ...state, confirmPassword: true }))
                }
            }
        }
    }
    function formHandler(e) {
        e.preventDefault();
        onSubmit(values);
    }

    return {
        values,
        validationErrors,
        onChange,
        onBlur,
        formHandler,
        setValues
    }
}
