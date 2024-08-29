import AdminDashboard from "../pages/admin/AdminDashboard";
import Profile from "../pages/Profile";

export const UserPath = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <AdminDashboard />,
    },

    {
        name: "Profile",
        path: "profile",
        element: <Profile />,
    },
];
