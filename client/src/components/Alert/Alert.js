import { useContext } from "react"
import { AlertContext } from "../../contexts/AlertContext.js"
import { Alert as AlertBS } from "react-bootstrap"
import styles from './Alert.module.css'

export default function Alert() {
    const { showAlert, messageInfo } = useContext(AlertContext);

    return showAlert
        ? <AlertBS
            className={styles.alert}
            dismissible
            variant={messageInfo.type}>
            <AlertBS.Heading>
                {messageInfo.message}
            </AlertBS.Heading>
        </AlertBS >
        : null

}
