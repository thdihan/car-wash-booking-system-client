import { Table, TableColumnsType } from "antd";
import { TBooking } from "../../../types/booking.type";

type TTableData = {
    key: string;
    service: string;
    slot: string[];
};

type TProps = {
    bookingData: TBooking[] | undefined;
    isFetching: boolean;
};
const BookingTable = ({ bookingData, isFetching }: TProps) => {
    console.log("BOOKING DATA", bookingData);
    const tableData = bookingData?.map(({ _id, serviceId, slotId }) => {
        const slot = slotId?.reduce((acc: string[], item) => {
            const temp = `${item.date} : ${item.startTime} - ${item.endTime}`;
            acc.push(temp);
            return acc;
        }, []);
        return {
            key: _id,
            service: serviceId.name,
            slot,
        };
    });

    console.log(tableData);

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Service",
            key: "service",
            dataIndex: "service",
        },

        {
            title: "Slots",
            key: "slot",
            render: (item) => {
                console.log("ITEM", item);
                return item.slot.map((s: string) => <p>{s}</p>);
                return;
            },
        },
    ];
    return (
        <div>
            <Table
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
            />
        </div>
    );
};

export default BookingTable;
