import { Button, Modal } from "antd";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";

import { useCreateServiceMutation } from "../../../redux/features/admin/service.api";
import PHForm from "../../form/PHForm";
import { ServiceSchema } from "../../../schemas/serviceSchema";
import { PHInput, PHInputNumber } from "../../form/PHInput";

const AddServiceModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addService, { isLoading: addLoading }] = useCreateServiceMutation();

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating Service", { duration: 2000 });
        try {
            const newService = { ...data, isDeleted: false };
            console.log(newService);

            const res = await addService(newService).unwrap();
            console.log(res);
            toast.success("Service created successfully.", {
                id: toastId,
                duration: 2000,
            });

            setIsModalOpen(false);
        } catch (error) {
            toast.error("Failed to create service.", {
                id: toastId,
                duration: 2000,
            });
        }
    };
    return (
        <>
            <Button
                type="primary"
                size="large"
                onClick={() => setIsModalOpen((prev) => !prev)}
            >
                Add Service
            </Button>

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
                                loading={addLoading}
                            >
                                Create Service
                            </Button>
                        </div>
                    </PHForm>
                </div>
            </Modal>
        </>
    );
};

export default AddServiceModal;
