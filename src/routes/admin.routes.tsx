import AllUsers from "../pages/admin/AllUsers";
import Services from "../pages/admin/servicesManagement/Services";
import Slots from "../pages/admin/slotManagement/Slots";
import UserBooking from "../pages/admin/UserBooking";
import Profile from "../pages/Profile";
import UpdateProfile from "../pages/UpdateProfile";
export const AdminPath = [
    {
        name: "Dashboard",
        path: "/admin",
        element: <Profile />,
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
        name: "Bookings",
        path: "bookings",
        element: <UserBooking />,
    },
    {
        name: "Users",
        path: "all-users",
        element: <AllUsers />,
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
