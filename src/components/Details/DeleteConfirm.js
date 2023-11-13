import { Button, Modal } from "react-bootstrap";

export default function DeleteConfirm({ 
    isOpen, onDelete, closeConfirm, product
}) {

    return <Modal show={isOpen} fullscreen={'md'} onHide={closeConfirm}>
        <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete {product?.name} ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>You cannot reverse this operation!</Modal.Body>
        <Modal.Footer>
            <Button onClick={closeConfirm} variant="light">Close</Button>
            <Button onClick={onDelete} variant="danger">Delete</Button>
        </Modal.Footer>
    </Modal>
}