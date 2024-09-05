import { Col } from "antd";
import { TService } from "../../../types";

const ServiceCard = ({ service }: { service: TService }) => {
    return (
        <Col className="gutter-row" span={24} lg={{ span: "6" }}>
            <div className="rounded-lg shadow-lg border-2  p-8 space-y-4">
                <div className="rounded-lg">
                    <img
                        className="w-full rounded-xl"
                        src={service.image}
                        alt=""
                    />
                </div>
                <div className="text-center  space-y-2">
                    <h2 className="font-medium text-lg">{service.name}</h2>
                    <p className="text-gray-700">{service.description}</p>
                    <p className="flex justify-evenly  text-blue-500 font-semibold ">
                        <span>Price: {service.price} tk</span>
                        <span>Duration: {service.duration} min</span>
                    </p>
                </div>
            </div>
        </Col>
    );
};

export default ServiceCard;
