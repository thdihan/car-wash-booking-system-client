import { Row } from "antd";
import { useGetServicesQuery } from "../../../redux/features/admin/service.api";
import LoadingSpinner from "../LoadingSpinner";
import ServiceCard from "./ServiceCard";
import { Link } from "react-router-dom";
import { BiSolidRightArrow } from "react-icons/bi";

const ServiceSection = () => {
    const { data: serviceData, isFetching } = useGetServicesQuery(undefined);
    console.log("Service Data", serviceData);
    return (
        <div id="services" className="px-4 md:px-8 lg:px-16 py-6">
            <div>
                <h1 className="text-3xl font-normal text-center">
                    Our Services
                </h1>
                <div className="flex justify-center space-x-2 mt-2">
                    <div className="size-3 bg-blue-500" />
                    <div className="size-3 bg-blue-500" />
                    <div className="size-3 bg-blue-500" />
                </div>
            </div>

            <div className="py-8">
                <div className="text-end text-blue-600 font-semibold py-2 flex justify-end items-center space-x-2">
                    <Link to="/services">All Services</Link>{" "}
                    <BiSolidRightArrow />
                </div>
                {isFetching && <LoadingSpinner />}
                {!isFetching && (
                    <Row
                        gutter={[
                            { xs: 8, sm: 16, md: 24, lg: 32 },
                            { xs: 8, sm: 16, md: 24, lg: 32 },
                        ]}
                    >
                        {serviceData?.data?.slice(-8).map((service, index) => (
                            <ServiceCard service={service} key={index} />
                        ))}
                    </Row>
                )}
            </div>
        </div>
    );
};

export default ServiceSection;
