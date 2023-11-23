import { Link } from "react-router-dom";
import styles from './Home.module.css'
import { Button } from "react-bootstrap";

export default function Home() {
    return <>
        <div className="container-fluid p-5 bg-primary text-white text-center">
            <h1>Welcome to our furniture house!</h1>
            <p>Here you can find best quality furniture!</p>
            <Button as={Link} to="/products" className="bg-white text-primary">Start browsing now!</Button>
        </div>
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-4">
                    <h3>Column 1</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
                </div>
                <div className="col-sm-4">
                    <h3>Column 2</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
                </div>
                <div className="col-sm-4">
                    <h3>Column 3</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
                </div>
            </div>
        </div>
    </>
}