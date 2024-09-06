import { useParams } from "react-router-dom";
import { useGetSingleServiceQuery } from "../redux/features/admin/service.api";
import { Button, Checkbox, DatePicker } from "antd";
import dayjs from "dayjs";
import { formatDate } from "../utils/formatDateAndTime";
import { useGetSlotsQuery } from "../redux/features/admin/slot.api";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const ServiceDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { data: serviceData, isFetching: serviceFetching } =
        useGetSingleServiceQuery(id);
    const { data: slotsData, isFetching: slotFetching } =
        useGetSlotsQuery(undefined);
    const [filteredSlots, setFilteredSlots] = useState<any[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>(
        formatDate(new Date(Date.now()).toDateString())
    );

    useEffect(() => {
        let tempSlots = [...(slotsData?.data || [])];
        if (slotsData) {
            tempSlots = tempSlots?.filter((slot) => slot.service._id === id);
        }

        if (selectedDate) {
            tempSlots = tempSlots?.filter((slot) => slot.date === selectedDate);
        }

        setFilteredSlots(tempSlots);
    }, [slotsData, selectedDate]);

    return (
        <div className="px-4 md:px-8 lg:px-16 py-8">
            {serviceFetching && <LoadingSpinner />}
            {!serviceFetching && (
                <>
                    <div>
                        <h1 className="text-3xl font-normal text-center">
                            {serviceData?.data?.name}
                        </h1>
                        <div className="flex justify-center space-x-2 mt-2">
                            <div className="size-3 bg-blue-500" />
                            <div className="size-3 bg-blue-500" />
                            <div className="size-3 bg-blue-500" />
                        </div>
                    </div>

                    <div className="text-center py-6">
                        <p>{serviceData?.data?.description}</p>
                    </div>

                    <div className="flex justify-center space-x-8">
                        <div className="flex space-x-2 items-center">
                            <h2 className="font-semibold  text-blue-500">
                                Price:
                            </h2>
                            <p>{serviceData?.data?.price} tk</p>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <h2 className=" font-semibold text-blue-500">
                                Duration:
                            </h2>
                            <p>{serviceData?.data?.duration} mins</p>
                        </div>
                    </div>

                    <div className="w-1/2 mx-auto py-8">
                        <div className="flex justify-between">
                            <h2 className="text-xl">Available Slots</h2>
                            <DatePicker
                                defaultValue={dayjs(
                                    formatDate(
                                        new Date(Date.now()).toDateString()
                                    ),
                                    "YYYY-MM-DD"
                                )}
                                size="large"
                                format={"YYYY-MM-DD"}
                                onChange={(date) => {
                                    setSelectedDate(
                                        formatDate(date?.toString())
                                    );
                                }}
                            />
                        </div>

                        {slotFetching && <LoadingSpinner />}
                        {!slotFetching && (
                            <>
                                <div className="flex flex-col space-y-2 py-2">
                                    {filteredSlots?.map((slot) => (
                                        <Checkbox
                                            disabled={
                                                slot.isBooked == "booked" ||
                                                slot.isBooked == "cancelled"
                                            }
                                            className="border-2 p-2 rounded-md font-semibold"
                                        >
                                            {slot.date} : ({slot.startTime} -{" "}
                                            {slot.endTime})
                                        </Checkbox>
                                    ))}
                                </div>

                                {filteredSlots.length > 0 && (
                                    <div className="text-end">
                                        <Button type="primary">
                                            Book this service
                                        </Button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default ServiceDetails;
