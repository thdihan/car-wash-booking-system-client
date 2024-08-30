import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import UserHeader from "./UserHeader";
import AdminHeader from "./AdminHeader";

const { Content } = Layout;

const MainLayout = () => {
    const user = useAppSelector(selectCurrentUser);
    return (
        <Layout style={{ height: "100%" }}>
            <Sidebar />

            <Layout>
                {user?.role === "admin" ? <AdminHeader /> : <UserHeader />}
                <Content style={{ margin: "24px 16px 0" }}>
                    <div className="py-[24px] px-[5px] lg:p-[24px]">
                        <Outlet />.
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
