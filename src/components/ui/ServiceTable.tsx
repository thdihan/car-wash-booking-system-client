import { Table, TableColumnsType } from "antd";
import { TService } from "../../types/service.type";
import { useGetServicesQuery } from "../../redux/features/service/service.api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

type TTableData = Pick<
    TService,
    "name" | "description" | "duration" | "price" | "isDeleted"
>;
const ServiceTable = () => {
    const { data: serviceData, isFetching } = useGetServicesQuery(undefined);

    const tableData = serviceData?.data?.filter(
        ({ _id, name, description, duration, price, isDeleted }) => {
            if (isDeleted === false) {
                return {
                    key: _id,
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
            key: "action",
            render: () => (
                <div className="space-x-2">
                    <button className="text-blue-500">
                        <EditOutlined className="text-2xl" title="Edit" />
                    </button>
                    <button className="text-red-500">
                        <DeleteOutlined className="text-2xl" title="Delete" />
                    </button>
                </div>
            ),
        },
    ];

    const onChange = () => {};
    return (
        <div>
            <Table
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
                onChange={onChange}
            />
        </div>
    );
};

export default ServiceTable;
