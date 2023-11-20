import { Link } from "react-router-dom";

export default function Home() {
    return <div className="jumbotron">
        <h1>Welcome to our store</h1>
        <Link to="/products">Start shopping now</Link>
    </div>
}