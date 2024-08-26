import { Button, Col, Modal, Row } from "antd";
import { PHInput, PHInputNumber } from "../form/PHInput";
import PHForm from "../form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { ServiceSchema } from "../../schemas/serviceSchema";

type TProps = {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
};
const AddServiceModal = ({ isModalOpen, setIsModalOpen }: TProps) => {
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleSubmit: SubmitHandler<FieldValues> = (data) => {
        const toastId = toast.loading("Creating Service", { duration: 2000 });
        try {
            const newService = { ...data, isDeleted: false };
            console.log(newService);
        } catch (error) {
            toast.error("Failed to create service.", {
                id: toastId,
                duration: 2000,
            });
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
                <PHForm
                    onSubmit={handleSubmit}
                    resolver={zodResolver(ServiceSchema)}
                >
                    <PHInput name="name" label="Name" />
                    <PHInput name="description" label="Description" />
                    <PHInputNumber name="price" label="Price" />
                    <PHInputNumber name="duration" label="Duration (Min)" />
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
