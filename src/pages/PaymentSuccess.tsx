import { Button } from "antd";
import { TiTick } from "react-icons/ti";
import { Link, useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
    const [queryParameters] = useSearchParams();

    return (
        <div className="px-4 md:px-8 lg:px-16 py-8">
            <div className="text-center flex justify-center items-center flex-col">
                <TiTick className="text-4xl text-center text-green-500 border-2 border-green-500 rounded-full" />

                <h1 className="text-3xl font-normal text-center ml-4 py-4">
                    Payment Successful
                </h1>
                <p>TXID : {queryParameters.get("txid")}</p>

                {/* // Back to home */}
                <Link to="/" className="py-4">
                    <Button>Back to Home</Button>
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
