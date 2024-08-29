import { Card, Col, Row } from "antd";
import { useGetMyBookingsQuery } from "../../redux/features/user/booking.api";
import { TBooking } from "../../types/booking.type";
import Countdown from "react-countdown";

const UpcomingSlot = () => {
    const { data: bookingData, isFetching } = useGetMyBookingsQuery(undefined);
    console.log("bookingData", bookingData);
    return (
        <div>
            <div>
                <h3 className="text-xl">Upcoming Slots</h3>
            </div>

            <div>
                <Row gutter={16}>
                    {bookingData?.data?.map((booking: TBooking) => (
                        <Col span={8}>
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
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default UpcomingSlot;
