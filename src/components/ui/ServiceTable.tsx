import { Spin, Table, TableColumnsType } from "antd";
import { TService } from "../../types/service.type";

import AddServiceModal from "./AddServiceModal";
import { DeleteOutlined } from "@ant-design/icons";
import { useUpdateServiceMutation } from "../../redux/features/service/service.api";
import { toast } from "sonner";

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

    const handleDelete = (item: TService) => {
        const toastId = toast.loading("Deleting Service", { duration: 2000 });
        try {
            updateService({
                id: item._id,
                payload: { ...item, isDeleted: true },
            }).unwrap();
            toast.success("Service deleted successfully.", {
                id: toastId,
                duration: 2000,
            });
        } catch (error) {
            toast.error("Failed to delete service.", {
                id: toastId,
                duration: 2000,
            });
        }
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
            key: "x",
            render: (item) => (
                <div className="space-x-2">
                    <AddServiceModal item={item} updateMode={true} />
                    <button className="text-red-500">
                        {updateLoading ? (
                            <Spin size="small" />
                        ) : (
                            <DeleteOutlined
                                className="text-2xl"
                                title="Delete"
                                onClick={() => handleDelete(item)}
                            />
                        )}
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
