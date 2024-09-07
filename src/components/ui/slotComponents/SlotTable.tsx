import { Select, Table, TableColumnsType, Tag } from "antd";

import { TSlot } from "../../../types/slot.type";

import { useUpdateSlotMutation } from "../../../redux/features/admin/slot.api";
import { TService } from "../../../types";

type TTableData = {
    key: string;
    service: TService;
    date: string;
    startTime: string;
    endTime: string;
    isBooked: string;
};

type TProps = {
    slotData: TSlot[] | undefined;
    isFetching: boolean;
};

const SlotTable = ({ slotData, isFetching }: TProps) => {
    const [updateSlot] = useUpdateSlotMutation();

    const tableData = slotData?.map(
        ({ _id, service, date, startTime, endTime, isBooked }) => {
            return {
                key: _id,
                service: service,
                date,
                startTime,
                endTime,
                isBooked,
            };
        }
    );

    const statusOption = [
        {
            label: "Available",
            value: "available",
        },
        {
            label: "Cancelled",
            value: "cancelled",
        },
    ];
    const handleSubmit = async (item: TTableData) => {
        // console.log(item);
        try {
            const updatedSlot = {
                service: item.service?._id,
                date: item.date,
                startTime: item.startTime,
                endTime: item.endTime,
                isBooked: item.isBooked,
            };

            const res = await updateSlot({
                id: item.key,
                data: updatedSlot,
            }).unwrap();

            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Service",
            key: "service",
            render: (item) => item?.service?.name,
        },
        {
            title: "Date",
            key: "date",
            dataIndex: "date",
        },
        {
            title: "Start Time",
            key: "startTime",
            dataIndex: "startTime",
        },
        {
            title: "End Time",
            key: "endTime",
            dataIndex: "endTime",
        },
        {
            title: "Status",
            key: "isBooked",
            render: (item) =>
                item?.isBooked === "booked" ? (
                    <Tag color="green">Booked</Tag>
                ) : item?.isBooked === "available" ? (
                    <Tag color="blue">Available</Tag>
                ) : (
                    <Tag color="red">Cancelled</Tag>
                ),
        },
        {
            title: "Update Status",
            key: "x",
            render: (item) => (
                <div className="space-x-2">
                    <Select
                        size="large"
                        style={{ width: "100%" }}
                        options={statusOption}
                        placeholder="Change Status"
                        disabled={item?.isBooked === "booked"}
                        defaultValue={item?.isBooked}
                        onChange={(value) => {
                            handleSubmit({ ...item, isBooked: value });
                        }}
                    />
                </div>
            ),
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

export default SlotTable;
