import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { AdminPath } from "../../routes/admin.routes";

import { UserPath } from "../../routes/user.routes";
import { sideBarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { Layout, Menu } from "antd";
const { Sider } = Layout;
import _ from "lodash";

const userRole = {
    ADMIN: "admin",
    USER: "user",
};
const Sidebar = () => {
    const role = useAppSelector(selectCurrentUser)?.role;
    let sideBarItems;

    switch (role) {
        case userRole.ADMIN:
            sideBarItems = sideBarItemsGenerator(AdminPath, userRole.ADMIN);
            break;
        case userRole.USER:
            sideBarItems = sideBarItemsGenerator(UserPath, userRole.USER);
            break;
        default:
            break;
    }
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
            style={{ height: "100vh", position: "sticky", top: 0, left: 0 }}
        >
            <div
                style={{
                    color: "white",
                    display: "flex",
                    height: "4rem",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h1 className="text-xl">{_.capitalize(role)} Dashboard</h1>
            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["4"]}
                items={sideBarItems}
            />
        </Sider>
    );
};

export default Sidebar;
