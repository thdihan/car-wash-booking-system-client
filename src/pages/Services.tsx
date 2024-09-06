import { Row } from "antd";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ServiceCard from "../components/ui/services/ServiceCard";
import { useGetServicesQuery } from "../redux/features/admin/service.api";
const Services = () => {
    const { data: serviceData, isFetching } = useGetServicesQuery(undefined);
    return (
        <div className="py-8 px-4 md:px-8 lg:px-16">
            <div>
                <h1 className="text-3xl font-normal text-center">Services</h1>
                <div className="flex justify-center space-x-2 mt-2">
                    <div className="size-3 bg-blue-500" />
                    <div className="size-3 bg-blue-500" />
                    <div className="size-3 bg-blue-500" />
                </div>
            </div>

            <div className="py-8">
                {isFetching && <LoadingSpinner />}
                {!isFetching && (
                    <Row
                        gutter={[
                            { xs: 8, sm: 16, md: 24, lg: 32 },
                            { xs: 8, sm: 16, md: 24, lg: 32 },
                        ]}
                    >
                        {serviceData?.data?.map((service, index) => (
                            <ServiceCard service={service} key={index} />
                        ))}
                    </Row>
                )}
            </div>
        </div>
    );
};

export default Services;
