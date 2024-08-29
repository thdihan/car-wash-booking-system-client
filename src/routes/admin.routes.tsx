import AdminDashboard from "../pages/admin/AdminDashboard";
import Services from "../pages/admin/servicesManagement/Services";
import Slots from "../pages/admin/slotManagement/Slots";
import Profile from "../pages/Profile";
import UpdateProfile from "../pages/UpdateProfile";
export const AdminPath = [
    {
        name: "Dashboard",
        path: "/admin",
        element: <AdminDashboard />,
    },
    {
        name: "Service Management",
        path: "services",
        element: <Services />,
    },
    {
        name: "Slot Management",
        path: "slots",
        element: <Slots />,
    },
    {
        name: "Profile",
        path: "profile",
        element: <Profile />,
    },
    {
        name: "Update Profile",
        path: "update-profile",
        element: <UpdateProfile />,
    },
];
