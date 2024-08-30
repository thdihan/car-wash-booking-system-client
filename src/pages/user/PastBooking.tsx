import { useEffect, useState } from "react";
import BookingTable from "../../components/ui/bookingComponents/BookingTable";
import { useGetMyBookingsQuery } from "../../redux/features/user/booking.api";
import { TBooking } from "../../types/booking.type";
import { TSlot } from "../../types/slot.type";

const PastBooking = () => {
    const { data: bookingData, isFetching } = useGetMyBookingsQuery(undefined);

    const [pastBooking, setPastBooking] = useState<TBooking[]>();

    useEffect(() => {
        if (bookingData?.data.length > 0) {
            const tempBooking = bookingData?.data?.reduce(
                (acc: TBooking[], item: TBooking) => {
                    const slotId = item.slotId.reduce((acc: TSlot[], slot) => {
                        if (
                            new Date(`${slot.date}T${slot.startTime}`) <
                            new Date(Date.now())
                        )
                            acc.push(slot);
                        return acc;
                    }, []);

                    if (slotId.length > 0) {
                        const booking = { ...item, slotId };
                        acc.push(booking);
                    }
                    return acc;
                },
                []
            );

            setPastBooking(tempBooking);
            console.log("Modified Booking: ", tempBooking);
        }
    }, [bookingData?.data]);
    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <h1 className="text-xl ">Past Booking</h1>
            </div>

            {/* Services Table */}
            <div>
                <BookingTable
                    bookingData={pastBooking}
                    isFetching={isFetching}
                />
            </div>
        </div>
    );
};

export default PastBooking;
