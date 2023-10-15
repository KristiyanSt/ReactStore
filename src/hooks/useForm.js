import { useState } from "react";

export default function useForm(initialValues ,onSubmit){
    const [values, setValues] = useState(initialValues);
    
    function onChange(e) {
        setValues(state => ({...state, [e.target.name]:e.target.value }));
    }
    function formHandler(e) {
        e.preventDefault();
        onSubmit(values);
    }
    function changeValues(values) {
        setValues(values);
    }
    return {
        values,
        onChange,
        formHandler,
        setValues
    }
}