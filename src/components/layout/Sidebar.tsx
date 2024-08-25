import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { AdminPath } from "../../routes/admin.routes";
import { StudentPath } from "../../routes/student.routes";
import { sideBarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { Layout, Menu } from "antd";
const { Sider } = Layout;

const userRole = {
    SUPERADMIN: "superAdmin",
    ADMIN: "admin",
    FACULTY: "faculty",
    STUDENT: "student",
};
const Sidebar = () => {
    const role = useAppSelector(selectCurrentUser)?.role;
    let sideBarItems;

    switch (role) {
        case userRole.SUPERADMIN:
            sideBarItems = sideBarItemsGenerator(AdminPath, userRole.ADMIN);
            break;
        case userRole.ADMIN:
            sideBarItems = sideBarItemsGenerator(AdminPath, userRole.ADMIN);
            break;
        case userRole.FACULTY:
            sideBarItems = sideBarItemsGenerator(AdminPath, userRole.FACULTY);
            break;
        case userRole.STUDENT:
            sideBarItems = sideBarItemsGenerator(StudentPath, userRole.STUDENT);
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
                <h1>Ph University</h1>
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
