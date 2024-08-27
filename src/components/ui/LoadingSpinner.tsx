import { Spin } from "antd";

const LoadingSpinner = () => {
    return (
        <Spin tip="Loading" size="large">
            <div
                style={{
                    padding: 50,
                    background: "rgba(0, 0, 0, 0.05)",
                    borderRadius: 4,
                }}
            />
        </Spin>
    );
};

export default LoadingSpinner;
