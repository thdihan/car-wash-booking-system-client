import Profile from "../pages/Profile";
import CreateBooking from "../pages/user/CreateBooking";
import UpcomingSlot from "../pages/user/UpcomingSlot";

export const UserPath = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <UpcomingSlot />,
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
                element: <UpcomingSlot />,
            },
        ],
    },
];
