import { Button, Col } from "antd";
import { TService } from "../../../types";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
    addService,
    selectCompareServices,
} from "../../../redux/features/compareSlice";
import { toast } from "sonner";

const ServiceCard = ({ service }: { service: TService }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const services = useAppSelector(selectCompareServices);

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
                <div className="space-x-2 flex">
                    <Button
                        onClick={() => {
                            if (services.length < 2) {
                                dispatch(addService(service));
                                toast.success("Service added to compare", {
                                    duration: 2000,
                                });
                            } else {
                                toast.error("You can only compare 2 services", {
                                    duration: 2000,
                                });
                            }
                        }}
                    >
                        Add to Compare
                    </Button>
                    <Button type="primary">View Details</Button>
                </div>
            </div>
        </Col>
    );
};

export default ServiceCard;
