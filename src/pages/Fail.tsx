import { Button } from "antd";
import { TiCancel } from "react-icons/ti";
import { Link } from "react-router-dom";

const Fail = () => {
    return (
        <div className="px-4 md:px-8 lg:px-16 py-8">
            <div className="text-center flex justify-center items-center flex-col">
                <TiCancel className="text-4xl text-center text-red-500 border-2 border-red-500 rounded-full" />

                <h1 className="text-3xl font-normal text-center ml-4 py-4">
                    Payment Failed
                </h1>

                {/* // Back to home */}
                <Link to="/" className="py-4">
                    <Button>Back to Home</Button>
                </Link>
            </div>
        </div>
    );
};

export default Fail;
