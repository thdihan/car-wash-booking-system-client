import { Button, Col, Modal, Row } from "antd";
import { PHInput } from "../form/PHInput";
import PHForm from "../form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
};
const AddServiceModal = ({ isModalOpen, setIsModalOpen }: TProps) => {
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleSubmit: SubmitHandler<FieldValues> = (data) => {
        try {
            const price = parseInt(data.price);
            const duration = parseInt(data.duration);
            const newService = { ...data, price, duration, isDeleted: false };
            console.log(newService);
        } catch (error) {
            toast.error("Failed to create service.");
        }
        console.log("Submitted");
    };
    return (
        <Modal
            title="Add Service"
            open={isModalOpen}
            onCancel={closeModal}
            okText="Create Service"
            cancelText="Cancel"
            footer={null}
        >
            <div className="flex flex-col">
                <PHForm onSubmit={handleSubmit}>
                    <PHInput name="name" label="Name" />
                    <PHInput name="description" label="Description" />
                    <PHInput name="price" label="Price" />
                    <PHInput name="duration" label="Duration (Min)" />
                    <div className="text-right">
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="large"
                            className="text-right"
                        >
                            Create Service
                        </Button>
                    </div>
                </PHForm>
            </div>
        </Modal>
    );
};

export default AddServiceModal;
