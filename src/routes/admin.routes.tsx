import AdminDashboard from "../pages/admin/AdminDashboard";
import Services from "../pages/admin/servicesManagement/Services";
import Slots from "../pages/admin/slotManagement/Slots";
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
];
