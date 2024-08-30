import { Button } from "antd";
import { Header } from "antd/es/layout/layout";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";

const AdminHeader = () => {
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <Header className="flex justify-end items-center p-2">
            <div className=" text-end">
                <Button onClick={handleLogout}>Logout</Button>
            </div>
        </Header>
    );
};

export default AdminHeader;
