import { Col } from "antd";
import { TService } from "../../../types";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

const ServiceCard = ({ service }: { service: TService }) => {
    const navigate = useNavigate();
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
                    <h2
                        onClick={() => navigate(`/services/${service._id}`)}
                        className="font-medium text-lg cursor-pointer"
                    >
                        {service.name}
                    </h2>
                    <p className="text-gray-700">
                        {_.truncate(service.description, { length: 60 })}
                    </p>
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
