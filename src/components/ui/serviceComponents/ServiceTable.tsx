import { Table, TableColumnsType } from "antd";

import DeleteServiceModal from "./DeleteServiceModal";
import { TService } from "../../../types";
import UpdateServiceModal from "./UpdateServiceModal";

type TTableData = Pick<
    TService,
    "_id" | "name" | "description" | "duration" | "price" | "isDeleted"
>;

type TProps = {
    serviceData: TService[] | undefined;
    isFetching: boolean;
};
const ServiceTable = ({ serviceData, isFetching }: TProps) => {
    const tableData = serviceData?.filter(
        ({ _id, name, description, duration, price, isDeleted }) => {
            if (isDeleted === false) {
                return {
                    _id,
                    name,
                    description,
                    duration,
                    price,
                };
            }
        }
    );

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Name",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "Description",
            key: "description",
            dataIndex: "description",
        },
        {
            title: "Duration",
            key: "duration",
            dataIndex: "duration",
        },
        {
            title: "Price",
            key: "price",
            dataIndex: "price",
        },
        {
            title: "Action",
            key: "x",
            render: (item) => (
                <div className="space-x-2">
                    <UpdateServiceModal item={item} />
                    <DeleteServiceModal item={item} />
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

export default ServiceTable;
