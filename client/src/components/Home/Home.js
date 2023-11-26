import { Link } from "react-router-dom";
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
                    <h3>Passion</h3>
                    <p>Meeting your needs is our driving force in manufacturing well-crafted furniture.</p>
                    <p>Our history becomes in late 90s in a small production warehouse in Petrich, Bulgaria and since then we have been dedicated in this industry with over 900 clients over the country.</p>
                </div>
                <div className="col-sm-4">
                    <h3>Mission</h3>
                    <p>Making our clients create their dream home is our mission through all these years of manufacturing.</p>
                    <p>We stick to your needs and fulfill your ideas.</p>
                </div>
                <div className="col-sm-4">
                    <h3>Quality</h3>
                    <p>We make sure to work with best quality materials and resources supplied only from Bulgaria.</p>
                    <p>Every centemeter of the surface of our products is carefully examined from our quality-control staff.</p>
                </div>
            </div>
        </div>
    </>
}