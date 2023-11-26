import { Route, Routes } from "react-router-dom"

import Home from "../components/Home/Home.js"
import Login from "../components/Login/Login.js"
import Register from "../components/Register/Register.js"
import Products from "../components/Products/Products.js"
import Details from "../components/Details/Details.js"
import PrivateRoute from "../components/PrivateRoute/PrivateRoute.js"
import Create from "../components/Create/Create.js"
import Edit from "../components/Edit/Edit.js"
import Logout from "../components/Logout/Logout.js"
import NotFound from "../components/NotFound.js/NotFound.js"



export default function RoutesWrapper() {
    return <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/details/:id" element={<Details />} />
        <Route element={<PrivateRoute />} >
            <Route path="/products/create" element={<Create />} />
            <Route path="/products/edit/:id" element={<Edit />} />
            <Route path='/logout' element={<Logout />} />
        </Route>
        <Route path="*" element={<NotFound />}></Route>
    </Routes>
}