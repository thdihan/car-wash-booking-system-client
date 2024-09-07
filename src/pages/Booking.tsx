import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetSingleServiceQuery } from "../redux/features/admin/service.api";
import { useGetSlotsQuery } from "../redux/features/admin/slot.api";
import { useEffect, useState } from "react";
import PHForm from "../components/form/PHForm";
import { PHInput, PHInputNumber } from "../components/form/PHInput";
import { Button } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useCreateBookingMutation } from "../redux/features/user/booking.api";
import { vehicleTypes } from "../constant/vehicles";
import PHSelect from "../components/form/PHSelect";

const Booking = () => {
    const [queryParameters] = useSearchParams();
    const [createBooking, { isLoading: bookingLoading }] =
        useCreateBookingMutation();
    const navigate = useNavigate();

    const { data: serviceData, isFetching: serviceFetching } =
        useGetSingleServiceQuery(queryParameters.get("serviceId") || "");
    const { data: slotsData, isFetching: slotFetching } =
        useGetSlotsQuery(undefined);

    const [slots, setSlots] = useState<any[]>();
    useEffect(() => {
        let tempSlots = [...(slotsData?.data || [])];
        if (slotsData) {
            tempSlots = tempSlots?.filter(
                (slot) => slot.service._id === queryParameters.get("serviceId")
            );
            tempSlots = tempSlots?.filter((slot) =>
                queryParameters.get("slotId")?.includes(slot._id)
            );
        }
        setSlots(tempSlots);
    }, [slotsData]);

    // console.log("Slot Data : ", queryParameters.get("slotId"));

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        const toastId = toast.loading("Booking Slot...", { duration: 2000 });
        try {
            const newBooking = {
                ...data,
                serviceId: queryParameters.get("serviceId"),
                slotId: [...(queryParameters.get("slotId") || "").split(",")],
            };
            console.log("New Booking : ", newBooking);
            const res = await createBooking(newBooking).unwrap();
            console.log("Booking Response : ", res);
            toast.success("Slot Booked Successfully", { id: toastId });
            // navigate("/user/dashboard");
        } catch (error) {
            console.log(error);
            toast.error("Failed to book slot", { id: toastId });
        }
    };
    return (
        <div className="px-4 md:px-8 lg:px-16 py-8">
            <h1 className="text-3xl font-normal text-center">Booking</h1>
            <div className="flex justify-center space-x-2 mt-2">
                <div className="size-3 bg-blue-500" />
                <div className="size-3 bg-blue-500" />
                <div className="size-3 bg-blue-500" />
            </div>
            <div className="text-center py-6">
                <p>Book your slot now</p>
            </div>

            <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-4">
                <div className="flex-1 flex flex-col">
                    <h2 className="  text-xl">{serviceData?.data?.name}</h2>
                    <div className="space-y-2">
                        <p className="">Selected Slots</p>
                        {slots?.map((slot) => (
                            <p className="border-2 border-blue-200 bg-blue-100 p-2 rounded-lg">
                                {slot.date} : ({slot.startTime} - {slot.endTime}
                                )
                            </p>
                        ))}
                    </div>
                </div>
                <div className="flex-1">
                    <PHForm onSubmit={handleSubmit}>
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
                        <PHInput
                            name="registrationPlate"
                            label="Registration Plate"
                        />

                        <Button
                            htmlType="submit"
                            size="large"
                            type="primary"
                            // loading={bookingLoading}
                        >
                            Book Slot
                        </Button>
                    </PHForm>
                </div>
            </div>
        </div>
    );
};

export default Booking;
