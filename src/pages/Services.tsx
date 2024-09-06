import { Row } from "antd";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ServiceCard from "../components/ui/services/ServiceCard";
import { useGetServicesQuery } from "../redux/features/admin/service.api";
import Filter from "../components/ui/services/Filter";
import { useEffect, useState } from "react";
const Services = () => {
    const { data: serviceData, isFetching } = useGetServicesQuery(undefined);
    const [filteredData, setFilteredData] = useState(serviceData?.data);

    const [searchQuery, setSearchQuery] = useState("");
    const [sortFilter, setSortFilter] = useState("");
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [durationFilter, setDurationFilter] = useState("");

    useEffect(() => {
        let filteredData = [...(serviceData?.data || [])];
        if (searchQuery.length > 0) {
            filteredData = filteredData?.filter((service) =>
                service.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (sortFilter === "low") {
            filteredData = filteredData?.sort((a, b) => a.price - b.price);
        } else if (sortFilter === "high") {
            filteredData = filteredData?.sort((a, b) => b.price - a.price);
        }

        if (priceRange[0] > 0 || priceRange[1] < 1000) {
            filteredData = filteredData?.filter(
                (service) =>
                    service.price >= priceRange[0] &&
                    service.price <= priceRange[1]
            );
        }

        if (durationFilter === "low") {
            filteredData = filteredData?.sort(
                (a, b) => a.duration - b.duration
            );
        } else if (durationFilter === "high") {
            filteredData = filteredData?.sort(
                (a, b) => b.duration - a.duration
            );
        }

        setFilteredData(filteredData);
    }, [searchQuery, sortFilter, serviceData, priceRange, durationFilter]);

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
                <div>
                    <Filter
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        sortFilter={sortFilter}
                        setSortFilter={setSortFilter}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        durationFilter={durationFilter}
                        setDurationFilter={setDurationFilter}
                    />
                </div>
                {isFetching && <LoadingSpinner />}
                {!isFetching && (
                    <Row
                        gutter={[
                            { xs: 8, sm: 16, md: 24, lg: 32 },
                            { xs: 8, sm: 16, md: 24, lg: 32 },
                        ]}
                    >
                        {filteredData?.map((service, index) => (
                            <ServiceCard service={service} key={index} />
                        ))}
                    </Row>
                )}
            </div>
        </div>
    );
};

export default Services;
