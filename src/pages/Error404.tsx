import { Button } from "antd";
import { RiErrorWarningFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Error404 = () => {
    return (
        <div className="px-4 md:px-8 lg:px-16 py-8">
            <div className="text-center flex justify-center items-center flex-col">
                <RiErrorWarningFill className="text-5xl text-gray-500" />
                <h1 className="text-3xl font-normal text-center ml-4 py-4 text-gray-500">
                    404 - Page Not Found
                </h1>

                <p className="text-gray-500">
                    The page you are looking for might have been removed, had
                    its name changed or is temporarily unavailable.
                </p>

                <Link to="/" className="py-4">
                    <Button type="primary">Back to Home</Button>
                </Link>
            </div>
        </div>
    );
};

export default Error404;
