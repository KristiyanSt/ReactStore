import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { AlertContext } from "../../contexts/AlertContext.js";

export default function DeleteConfirm({ 
    isOpen, onDelete, closeConfirm, product
}) {
    const { isLoading } = useContext(AlertContext);

    return <Modal show={isOpen} fullscreen={'md'} onHide={closeConfirm}>
        <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete {product?.name} ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>You cannot reverse this operation!</Modal.Body>
        <Modal.Footer>
            <Button onClick={closeConfirm} variant="light">Close</Button>
            <Button onClick={onDelete} variant="danger">{isLoading ? 'Loading...' : 'Delete'}</Button>
        </Modal.Footer>
    </Modal>
}