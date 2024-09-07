import { Table, TableColumnsType } from "antd";
import { TBooking } from "../../../types/booking.type";
import _ from "lodash";

type TTableData = {
    key: string;
    service: string;
    slot: string[];
    vehicleType: string;
    vehicleModel: string;
    vehicleBrand: string;
    registrationPlate: string;
};

type TProps = {
    bookingData: TBooking[] | undefined;
    isFetching: boolean;
};
const BookingTable = ({ bookingData, isFetching }: TProps) => {
    console.log("BOOKING DATA", bookingData);
    const tableData = bookingData?.map(
        ({
            _id,
            serviceId,
            slotId,
            vehicleType,
            vehicleModel,
            vehicleBrand,
            registrationPlate,
        }) => {
            const slot = slotId?.reduce((acc: string[], item) => {
                const temp = `${item.date} : ${item.startTime} - ${item.endTime}`;
                acc.push(temp);
                return acc;
            }, []);
            return {
                key: _id,
                service: serviceId.name,
                slot,
                vehicleType,
                vehicleModel,
                vehicleBrand,
                registrationPlate,
            };
        }
    );

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
        {
            title: "Vehicle Type",
            key: "vehicleType",
            render: (item) => _.capitalize(item.vehicleType),
        },
        {
            title: "Vehicle Model",
            key: "vehicleModel",
            dataIndex: "vehicleModel",
        },
        {
            title: "Vehicle Brand",
            key: "vehicleBrand",
            dataIndex: "vehicleBrand",
        },
        {
            title: "Registration Plate",
            key: "registrationPlate",
            dataIndex: "registrationPlate",
        },
    ];
    return (
        <div>
            <Table
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
                scroll={{ x: 1200 }}
            />
        </div>
    );
};

export default BookingTable;
