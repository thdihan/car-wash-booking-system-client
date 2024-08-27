import { Button } from "antd";
import { useState } from "react";
import AddServiceModal from "../../../components/ui/AddServiceModal";

const Services = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div>
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
            <AddServiceModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />

            {/* Services Table */}
        </div>
    );
};

export default Services;
