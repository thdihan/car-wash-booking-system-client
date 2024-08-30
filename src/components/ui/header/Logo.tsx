import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <div>
            <Link to="/" className="text-3xl font-bold tracking-wide">
                <span className="text-blue-500">CWBS</span> Workshop
            </Link>
        </div>
    );
};

export default Logo;
