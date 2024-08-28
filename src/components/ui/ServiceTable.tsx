import { Spin, Table, TableColumnsType } from "antd";
import { TService } from "../../types/service.type";

import AddServiceModal from "./AddServiceModal";
import { DeleteOutlined } from "@ant-design/icons";
import { useUpdateServiceMutation } from "../../redux/features/service/service.api";
import { toast } from "sonner";
import DeleteServiceModal from "./DeleteServiceModal";

type TTableData = Pick<
    TService,
    "_id" | "name" | "description" | "duration" | "price" | "isDeleted"
>;

type TProps = {
    serviceData: TService[] | undefined;
    isFetching: boolean;
};
const ServiceTable = ({ serviceData, isFetching }: TProps) => {
    const [updateService, { isLoading: updateLoading }] =
        useUpdateServiceMutation();
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
                    <AddServiceModal item={item} updateMode={true} />
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
            />
        </div>
    );
};

export default ServiceTable;
