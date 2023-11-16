import { Form } from "react-bootstrap";

export default function FormGroup({
    el, isInvalid, onChange, onBlur, value
}) {

    return <Form.Group className="mb-3" controlId={el.controlId}>
        <Form.Label>{el.label}</Form.Label>
        <Form.Control onChange={onChange}
            isInvalid={isInvalid}
            onBlur={onBlur}
            value={value}
            type={el.type}
            name={el.name}
            placeholder={el.placeholder}>
        </Form.Control>
        <Form.Control.Feedback type="invalid">{el.feedback}</Form.Control.Feedback>
    </Form.Group>
}