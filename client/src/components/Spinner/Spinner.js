import { Spinner as SpinnerBS}  from 'react-bootstrap'
import { AlertContext } from '../../contexts/AlertContext.js'
import { useContext, useEffect, useState } from 'react'

export default function Spinner() {
    const [show, setShow] = useState(false);
    const {isLoading} = useContext(AlertContext);
    useEffect(() => {
        setShow(isLoading)
    },[isLoading])
    return <SpinnerBS show={show} animation="border" style={{
                    
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'inherit',
        backgroundColor: 'white',
      
    }}/>
}