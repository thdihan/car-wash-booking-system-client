import { Button } from "antd";
import { Header } from "antd/es/layout/layout";
import { useAppDispatch } from "../../redux/hooks";
import { useGetMyBookingsQuery } from "../../redux/features/user/booking.api";
import { useEffect, useState } from "react";
import { TBooking } from "../../types/booking.type";
import { TSlot } from "../../types/slot.type";
import { ClockCircleOutlined } from "@ant-design/icons";
import Countdown from "react-countdown";
import { logout } from "../../redux/features/auth/authSlice";

const UserHeader = () => {
    const dispatch = useAppDispatch();

    const { data: bookingData, isFetching } = useGetMyBookingsQuery(undefined);
    const [upcomingBooking, setUpcomingBooking] = useState<TBooking[]>([]);

    useEffect(() => {
        if (bookingData?.data.length > 0) {
            const tempBooking = bookingData?.data
                ?.reduce((acc: TBooking[], item: TBooking) => {
                    const slotId = item.slotId.reduce((acc: TSlot[], slot) => {
                        if (
                            new Date(`${slot.date}T${slot.startTime}`) >
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
                }, [])
                .sort(
                    (a: TBooking, b: TBooking) =>
                        new Date(
                            `${a.slotId[0].date}T${a.slotId[0].startTime}`
                        ).getTime() -
                        new Date(
                            `${b.slotId[0].date}T${b.slotId[0].startTime}`
                        ).getTime()
                );

            setUpcomingBooking(tempBooking);
            console.log("Modified Booking: ", tempBooking);
        }
    }, [bookingData?.data]);
    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <Header
            className={`flex ${
                upcomingBooking.length > 0 ? "justify-between" : "justify-end"
            }  items-center p-2`}
        >
            {!isFetching && upcomingBooking.length > 0 && (
                <div className="flex item-center space-x-4 justify-center  px-4 py-1 rounded-xl w-full">
                    <h3 className="text-white text-lg  text-center">
                        Next Slot
                    </h3>
                    <ClockCircleOutlined className="text-white text-lg" />
                    <Countdown
                        date={
                            new Date(
                                `${upcomingBooking[0]?.slotId[0].date}T${upcomingBooking[0]?.slotId[0].startTime}`
                            )
                        }
                        className="text-lg text-white"
                    />
                </div>
            )}
            <div className=" text-end">
                <Button onClick={handleLogout}>Logout</Button>
            </div>
        </Header>
    );
};

export default UserHeader;
