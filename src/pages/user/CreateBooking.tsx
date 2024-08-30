import { useState } from "react";
import PHForm from "../../components/form/PHForm";
import PHSelect, { PHSelectOnChange } from "../../components/form/PHSelect";
import { useGetServicesQuery } from "../../redux/features/admin/service.api";
import { useGetSlotsQuery } from "../../redux/features/admin/slot.api";
import { PHInput, PHInputNumber } from "../../components/form/PHInput";
import { vehicleTypes } from "../../constant/vehicles";
import { Button } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useCreateBookingMutation } from "../../redux/features/user/booking.api";

const CreateBooking = () => {
    const [serviceId, setServiceId] = useState<string>("");
    const { data: serviceData, isFetching: serviceFetching } =
        useGetServicesQuery(undefined);

    const { data: slotData, isFetching: slotFetching } =
        useGetSlotsQuery(undefined);

    const [createBooking, { isLoading: bookingLoading }] =
        useCreateBookingMutation();

    const slotOptions = slotData?.data
        ?.filter(
            (slot) =>
                slot?.service?._id === serviceId &&
                slot?.isBooked === "available"
        )
        .map((slot) => ({
            label: `${slot.startTime} - ${slot.endTime}`,
            value: slot?._id,
        }));

    const serviceOptions = serviceData?.data?.map((service) => ({
        label: service.name,
        value: service._id,
    }));

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Booking Slot...", { duration: 2000 });
        try {
            const newBooking = { ...data, serviceId };
            console.log("New Booking : ", newBooking);
            const res = await createBooking(newBooking).unwrap();
            console.log("Booking Response : ", res);

            toast.success("Slot Booked Successfully", { id: toastId });
        } catch (error) {
            console.log(error);
            toast.error("Failed to book slot", { id: toastId });
        }
    };
    return (
        <div className="p-8 bg-white">
            <h3 className="text-xl mb-8">Slot Booking</h3>
            <PHForm onSubmit={handleSubmit}>
                <PHSelectOnChange
                    options={serviceOptions}
                    name="service"
                    label="Service"
                    onChange={(value) => {
                        console.log("Target Change : ", value);
                        setServiceId(value);
                    }}
                />
                <PHSelect options={slotOptions} name="slotId" label="Slot" />
                <PHSelect
                    name="vehicleType"
                    label="Vehicle Type"
                    options={vehicleTypes}
                />
                <PHInput name="vehicleBrand" label="Vehicle Brand" />
                <PHInput name="vehicleModel" label="Vehicle Model" />
                <PHInputNumber
                    name="manufacturingYear"
                    label="Manufacturing Year"
                />
                <PHInput name="registrationPlate" label="Registration Plate" />

                <Button
                    htmlType="submit"
                    size="large"
                    type="primary"
                    loading={bookingLoading}
                >
                    Book Slot
                </Button>
            </PHForm>
        </div>
    );
};

export default CreateBooking;
