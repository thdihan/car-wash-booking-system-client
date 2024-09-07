import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleServiceQuery } from "../redux/features/admin/service.api";
import { Button, Checkbox, DatePicker } from "antd";
import dayjs from "dayjs";
import { formatDate } from "../utils/formatDateAndTime";
import { useGetSlotsQuery } from "../redux/features/admin/slot.api";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { toast } from "sonner";
import _ from "lodash";
import { TSlot } from "../types/slot.type";

const ServiceDetails = () => {
    const navigate = useNavigate();
    const user = useAppSelector(selectCurrentUser);

    const { id } = useParams<{ id: string }>();
    const { data: serviceData, isFetching: serviceFetching } =
        useGetSingleServiceQuery(id);
    const { data: slotsData, isFetching: slotFetching } =
        useGetSlotsQuery(undefined);
    const [filteredSlots, setFilteredSlots] = useState<any[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>(
        formatDate(new Date(Date.now()).toDateString())
    );

    const [slotOptions, setSlotOptions] = useState<any[]>([]);

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

    const isDisabled = (slots: TSlot[]) =>
        slots?.some(
            (slot) =>
                slot.isBooked === "booked" || slot.isBooked === "cancelled"
        );

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

                    <div className="w-full lg:w-1/2 mx-auto py-8">
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
                                            key={slot._id}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    console.log(
                                                        e.target.checked
                                                    );
                                                    setSlotOptions([
                                                        ...slotOptions,
                                                        slot._id,
                                                    ]);
                                                } else {
                                                    setSlotOptions(
                                                        slotOptions.filter(
                                                            (slotId) =>
                                                                slotId !==
                                                                slot._id
                                                        )
                                                    );
                                                }
                                            }}
                                        >
                                            {slot.date} : ({slot.startTime} -{" "}
                                            {slot.endTime})
                                        </Checkbox>
                                    ))}
                                </div>

                                {filteredSlots.length > 0 && (
                                    <div className="text-end">
                                        <Button
                                            disabled={isDisabled(filteredSlots)}
                                            onClick={() =>
                                                user?.role === "user"
                                                    ? navigate(
                                                          `/booking/?serviceId=${id}&slotId=${slotOptions}`
                                                      )
                                                    : toast.error(
                                                          `${
                                                              user
                                                                  ? "You are an " +
                                                                    _.capitalize(
                                                                        user?.role
                                                                    ) +
                                                                    ":"
                                                                  : ""
                                                          }  You need to login as a user to book a slot`
                                                      )
                                            }
                                            type="primary"
                                        >
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
