import { useEffect, useState } from "react";
import BookingTable from "../../components/ui/bookingComponents/BookingTable";
import { useGetBookingsQuery } from "../../redux/features/user/booking.api";
import { TBooking } from "../../types/booking.type";

const UserBooking = () => {
    const { data: bookingData, isFetching } = useGetBookingsQuery(undefined);
    console.log("Booking Data: ", bookingData);

    const [pastBooking, setPastBooking] = useState<TBooking[]>();

    useEffect(() => {
        if (bookingData?.data) {
            const allData = [...bookingData?.data];
            const tempData = allData?.sort((a: TBooking, b: TBooking) => {
                console.log(a.slotId[0], b.slotId[0]);
                return (
                    new Date(
                        `${a.slotId[0]?.date}T${a.slotId[0]?.startTime}`
                    ).getTime() -
                    new Date(
                        `${b.slotId[0]?.date}T${b.slotId[0]?.startTime}`
                    ).getTime()
                );
            });
            setPastBooking(tempData);
        }
        // setPastBooking(bookingData?.data);
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

export default UserBooking;
