import { Button, Modal } from "antd";

import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { TService } from "../../../types";

import PHForm from "../../form/PHForm";

import PHSelect from "../../form/PHSelect";
import { useGetServicesQuery } from "../../../redux/features/admin/service.api";
import PHDatePicker from "../../form/PHDatePicker";
import PHTimePicker from "../../form/PHTimePicker";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useCreateSlotMutation } from "../../../redux/features/admin/slot.api";
import { formatDate, formatTime } from "../../../utils/formatDateAndTime";
import { zodResolver } from "@hookform/resolvers/zod";
import { SlotSchema } from "../../../schemas/slotSchema";

const AddSlotModal = ({ updateMode = false }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [defaultValues, setDefaultValues] = useState<Partial<TService>>({});

    const { data: serviceData, isFetching: serviceFetching } =
        useGetServicesQuery(undefined);

    const [addSlot] = useCreateSlotMutation();

    const serviceOptions = serviceData?.data
        ?.filter((service) => {
            if (service.isDeleted === false) return true;
        })
        .map((service) => {
            return {
                label: service.name,
                value: service._id,
            };
        });

    console.log("serviceOptions", serviceOptions);

    // console.log("data", serviceData);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log("Slot Data : ", data);

        const toastId = toast.loading("Creating Slot", { duration: 2000 });
        try {
            const date = formatDate(data.date);
            const startTime = formatTime(data.startTime);
            const endTime = formatTime(data.endTime);

            const newSlot = { ...data, date, startTime, endTime };
            const res = await addSlot(newSlot).unwrap();
            console.log(res);

            toast.success("Slot created successfully.", {
                id: toastId,
                duration: 2000,
            });
            setIsModalOpen(false);
        } catch (error) {
            console.log(error);
            toast.error("Failed to create slot.", {
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
                    Add Slot
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
                        // resolver={zodResolver(SlotSchema)}
                        // initialValues={defaultValues}
                        defaultValues={defaultValues}
                    >
                        <PHSelect
                            name="service"
                            label="Service"
                            options={serviceOptions}
                        />

                        <PHDatePicker name="date" label="Date" />
                        <PHTimePicker name="startTime" label="Start Time" />
                        <PHTimePicker name="endTime" label="End Time" />

                        <div className="text-right">
                            <Button
                                htmlType="submit"
                                type="primary"
                                size="large"
                                className="text-right"
                            >
                                Create Slot
                            </Button>
                        </div>
                    </PHForm>
                </div>
            </Modal>
        </>
    );
};

export default AddSlotModal;
