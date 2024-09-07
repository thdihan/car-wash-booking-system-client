import { Button, Table, TableColumnsType } from "antd";
import { TCustomer } from "../../types/user.type";
import _ from "lodash";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { useUpdateProfileMutation } from "../../redux/features/user/userManagement.api";

type TTableData = {
    key: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    role?: string;
};
const UserTable = ({
    userData,
    isFetching,
}: {
    userData: TCustomer[];
    isFetching: boolean;
}) => {
    const user = useAppSelector(selectCurrentUser);
    const [updateProfile] = useUpdateProfileMutation();
    const tableData = userData
        ?.filter(({ email }) => email !== user?.email)
        .map(({ _id, name, email, phone, address, role }) => {
            return {
                key: _id,
                name,
                email,
                phone,
                address,
                role,
            };
        });

    const handleSubmit = async (data: TTableData) => {
        console.log(data);
        const toastId = toast.loading("Updating user...", {
            duration: 2000,
        });

        try {
            const newUserData = {
                id: data?.key,
                payload: {
                    ...data,
                    role: data.role == "admin" ? "user" : "admin",
                },
            };
            console.log(newUserData);
            const res = await updateProfile(newUserData).unwrap();

            console.log(res);
            toast.success("User updated successfully", {
                id: toastId,
                duration: 2000,
            });
            // navigate("/admin/profile");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update user", {
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
            title: "Role",
            key: "role",
            render: (item) => _.capitalize(item.role),
        },
        {
            title: "Email",
            key: "email",
            dataIndex: "email",
        },
        {
            title: "Phone",
            key: "phone",
            dataIndex: "phone",
        },
        {
            title: "Address",
            key: "address",
            dataIndex: "address",
        },
        {
            title: "Change Role",
            key: "role",
            render: (item) => (
                <div className="space-x-2">
                    <Button type="primary" onClick={() => handleSubmit(item)}>
                        Make{" "}
                        {_.capitalize(item.role == "admin" ? "user" : "admin")}
                    </Button>
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

export default UserTable;
