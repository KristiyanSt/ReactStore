import { useContext, useEffect, useState } from "react"
import { requestFactory } from "../request.js"
import { AuthContext } from "../contexts/AuthContext.js";

const request = requestFactory();

export default function Profile() {
    const {user } = useContext(AuthContext);
    const [currentUser,setCurrentUser] = useState({});
    useEffect(() => { 
        request.get('/users/me', null, user.accessToken)
            .then(result => setCurrentUser(result))
    },[])

    console.log(currentUser);

    return <h3 className="d-flex justify-content-center" style={{ marginTop: "30px" }} >Profile information</h3>
}