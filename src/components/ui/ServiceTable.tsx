import { Table, TableColumnsType } from "antd";
import { TService } from "../../types/service.type";
import { useGetServicesQuery } from "../../redux/features/service/service.api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

type TTableData = Pick<
    TService,
    "_id" | "name" | "description" | "duration" | "price" | "isDeleted"
>;

type TProps = {
    setIsModalOpen: (value: boolean) => void;
    setEditServiceId: (value: string) => void;
};
const ServiceTable = ({ setIsModalOpen, setEditServiceId }: TProps) => {
    const { data: serviceData, isFetching } = useGetServicesQuery(undefined);

    const tableData = serviceData?.data?.filter(
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

    const onEdit = (id: string) => {
        setEditServiceId(id);
        setIsModalOpen(true);
        console.log("Edit", id);
    };

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
            render: (_, record) => (
                <div className="space-x-2">
                    <button
                        className="text-blue-500"
                        onClick={() => onEdit(record._id)}
                    >
                        <EditOutlined className="text-2xl" title="Edit" />
                    </button>
                    <button className="text-red-500">
                        <DeleteOutlined className="text-2xl" title="Delete" />
                    </button>
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
            />
        </div>
    );
};

export default ServiceTable;
