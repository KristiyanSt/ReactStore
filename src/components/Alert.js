import { useContext } from "react";
import { AlertContext } from "../contexts/AlertContext.js"
import { Alert as AlertBS } from "react-bootstrap";

export default function Alert() {
    const { showAlert, messageInfo } = useContext(AlertContext);

    return showAlert ?
        <AlertBS variant={messageInfo.type} dismissible style={{ position: 'absolute',
        top: '100px',
        bottom: '550px',
        right: '100px',
        marginLeft: '600px', width: '400px' }}>
            <AlertBS.Heading>{messageInfo.message}</AlertBS.Heading>
            {/* <p>
                Change this and that and try again. Duis mollis, est non commodo
            </p> */}
        </AlertBS >
        : null

}
