import { Children } from "react";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Profile from "../pages/Profile";
import CreateBooking from "../pages/user/CreateBooking";

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

    {
        name: "Booking Management",
        children: [
            {
                name: "Create Bookings",
                path: "create-booking",
                element: <CreateBooking />,
            },
            {
                name: "Past Bookings",
                path: "create-booking",
                element: <CreateBooking />,
            },
            {
                name: "Upcoming Bookings",
                path: "dashboard",
                element: <CreateBooking />,
            },
        ],
    },
];
