import { Card, Col, Row } from "antd";
import { useGetMyBookingsQuery } from "../../redux/features/user/booking.api";
import { TBooking } from "../../types/booking.type";
import Countdown from "react-countdown";
import _ from "lodash";
import { useEffect, useState } from "react";
import { TSlot } from "../../types/slot.type";

const UpcomingSlot = () => {
    const { data: bookingData } = useGetMyBookingsQuery(undefined);

    const [upcomingBooking, setUpcomingBooking] = useState<TBooking[]>();

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
    return (
        <div>
            <div>
                <h3 className="text-xl">Upcoming Slots</h3>
            </div>

            <div className="my-8">
                <Row gutter={16}>
                    {upcomingBooking?.map((booking: TBooking) => (
                        <Col
                            span={24}
                            md={{ span: "12" }}
                            lg={{ span: "8" }}
                            className="mb-4 md:mb-0 lg:mb-0"
                        >
                            <Card
                                title={booking?.serviceId?.name}
                                bordered={false}
                            >
                                <div className="text-center font-semibold bg-blue-300 p-2 rounded-md">
                                    <Countdown
                                        date={
                                            new Date(
                                                `${booking?.slotId[0].date}T${booking?.slotId[0].startTime}`
                                            )
                                        }
                                        className="text-xl "
                                    />
                                </div>
                                <table className="w-full my-4 py-4">
                                    <tr>
                                        <td className="font-semibold border-2 p-2">
                                            Slots:
                                        </td>
                                        <td className="font-semibold border-2 p-2">
                                            {booking?.slotId?.map((slot) => (
                                                <p>
                                                    {slot.date} {": "}
                                                    {slot.startTime} -{" "}
                                                    {slot.endTime}
                                                </p>
                                            ))}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold border-2 p-2">
                                            Vehicle Type:
                                        </td>
                                        <td className="font-semibold border-2 p-2">
                                            {_.capitalize(booking?.vehicleType)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold border-2 p-2">
                                            Vehicle Brand:
                                        </td>
                                        <td className="font-semibold border-2 p-2">
                                            {_.capitalize(
                                                booking?.vehicleBrand
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold border-2 p-2">
                                            Vehicle Model:
                                        </td>
                                        <td className="font-semibold border-2 p-2">
                                            {_.capitalize(
                                                booking?.vehicleModel
                                            )}
                                        </td>
                                    </tr>
                                </table>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default UpcomingSlot;
