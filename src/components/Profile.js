import { useContext, useEffect, useState } from "react"
import { requester } from "../request.js"
import { AuthContext } from "../contexts/AuthContext.js";

const request = requester();

export default function Profile() {
    const { user } = useContext(AuthContext);

    console.log(user);

    return (<div>
        <h3 className="d-flex justify-content-center" style={{ marginTop: "30px" }} >Profile information</h3>
        <p>{user.email}</p>
    </div>
    )
}