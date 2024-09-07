import { Button, Modal } from "antd";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { TService } from "../../../types";
import { useUpdateServiceMutation } from "../../../redux/features/admin/service.api";
import PHForm from "../../form/PHForm";
import { ServiceSchema } from "../../../schemas/serviceSchema";
import { PHInputNumberUpdate, PHInputUpdate } from "../../form/PHInput";

type TProps = {
    item: Partial<TService>;
};
const UpdateServiceModal = ({ item }: TProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [updateService, { isLoading: updateLoading }] =
        useUpdateServiceMutation();

    console.log("item", item);

    const [defaultValues, setDefaultValues] = useState<Partial<TService>>({});

    useEffect(() => {
        setDefaultValues(item);
    }, [item]);

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

            res = await updateService({
                id: item._id,
                payload: newService,
            }).unwrap();

            console.log(res);
            toast.success("Service created successfully.", {
                id: toastId,
                duration: 2000,
            });

            setIsModalOpen(false);
            setDefaultValues({});
        } catch (error) {
            toast.error("Failed to create service.", {
                id: toastId,
                duration: 2000,
            });
        }
    };
    return (
        <>
            <EditOutlined
                className="text-2xl"
                title="Edit"
                onClick={showModal}
            />

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
                        initialValues={defaultValues}
                        defaultValues={defaultValues}
                    >
                        <PHInputUpdate name="name" label="Name" />
                        <PHInputUpdate name="description" label="Description" />
                        <PHInputNumberUpdate name="price" label="Price" />
                        <PHInputNumberUpdate
                            name="duration"
                            label="Duration (Min)"
                        />
                        <div className="text-right">
                            <Button
                                htmlType="submit"
                                type="primary"
                                size="large"
                                className="text-right"
                                loading={updateLoading}
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

export default UpdateServiceModal;
