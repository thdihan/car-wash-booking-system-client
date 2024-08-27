import { Button, Col, Modal, Row } from "antd";
import { PHInput, PHInputNumber } from "../form/PHInput";
import PHForm from "../form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { ServiceSchema } from "../../schemas/serviceSchema";
import {
    useCreateServiceMutation,
    useGetSingleServiceQuery,
} from "../../redux/features/service/service.api";
import { TService } from "../../types";

type TProps = {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    editServiceId?: string;
};
const AddServiceModal = ({
    isModalOpen,
    setIsModalOpen,
    editServiceId,
}: TProps) => {
    const [addService, { isLoading }] = useCreateServiceMutation();

    const { data: serviceData, isFetching } =
        useGetSingleServiceQuery(editServiceId);

    console.log("data", serviceData);

    const defaultData = serviceData?.data;

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating Service", { duration: 2000 });
        try {
            const newService = { ...data, isDeleted: false };
            console.log(newService);
            let res;

            res = await addService(newService).unwrap();
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
                    defaultValues={defaultData}
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
                            loading={isLoading}
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
