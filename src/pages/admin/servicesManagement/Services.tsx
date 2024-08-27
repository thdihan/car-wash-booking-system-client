import { Button } from "antd";
import { useState } from "react";
import AddServiceModal from "../../../components/ui/AddServiceModal";
import ServiceTable from "../../../components/ui/ServiceTable";

const Services = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="space-y-4">
            {/* Service Header  */}
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold">Available Services</h1>
                <Button
                    type="primary"
                    size="large"
                    onClick={() => setIsModalOpen((prev) => !prev)}
                >
                    Add Service
                </Button>
            </div>

            {/* Add Service Modal  */}
            <div>
                <AddServiceModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            </div>

            {/* Services Table */}
            <div>
                <ServiceTable />
            </div>
        </div>
    );
};

export default Services;
