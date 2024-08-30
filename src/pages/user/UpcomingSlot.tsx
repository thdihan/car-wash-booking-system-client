import { Card, Col, Row } from "antd";
import { useGetMyBookingsQuery } from "../../redux/features/user/booking.api";
import { TBooking } from "../../types/booking.type";
import Countdown from "react-countdown";
import _ from "lodash";

const UpcomingSlot = () => {
    const { data: bookingData, isFetching } = useGetMyBookingsQuery(undefined);
    console.log("bookingData", bookingData);
    return (
        <div>
            <div>
                <h3 className="text-xl">Upcoming Slots</h3>
            </div>

            <div className="my-8">
                <Row gutter={16}>
                    {bookingData?.data?.map((booking: TBooking) => (
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
                                                `${booking?.slotId.date}T${booking?.slotId.startTime}`
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
                                            {booking?.slotId.date} {": "}
                                            {booking?.slotId.startTime} -{" "}
                                            {booking?.slotId.endTime}
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
