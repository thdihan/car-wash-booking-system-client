import { Button, Col, Modal, Row, Spin } from "antd";
import { PHInput, PHInputNumber } from "../form/PHInput";
import PHForm from "../form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { ServiceSchema } from "../../schemas/serviceSchema";
import {
    useCreateServiceMutation,
    useUpdateServiceMutation,
} from "../../redux/features/service/service.api";
import { TService } from "../../types";

import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";

type TProps = {
    item: Partial<TService>;
    updateMode?: boolean;
};
const AddServiceModal = ({ item, updateMode = false }: TProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addService, { isLoading: addLoading }] = useCreateServiceMutation();
    const [updateService, { isLoading: updateLoading }] =
        useUpdateServiceMutation();

    // console.log("data", serviceData);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating Service", { duration: 2000 });
        try {
            const newService = { ...data, isDeleted: false };
            console.log(newService);
            let res;

            if (updateMode) {
                res = await updateService({
                    id: item._id,
                    payload: newService,
                }).unwrap();
            } else res = await addService(newService).unwrap();
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
            {updateMode ? (
                <EditOutlined
                    className="text-2xl"
                    title="Edit"
                    onClick={showModal}
                />
            ) : (
                <Button
                    type="primary"
                    size="large"
                    onClick={() => setIsModalOpen((prev) => !prev)}
                >
                    Add Service
                </Button>
            )}

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
                        defaultValues={item}
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
                                loading={addLoading || updateLoading}
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
