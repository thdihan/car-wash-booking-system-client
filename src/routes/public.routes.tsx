import Booking from "../pages/Booking";
import Compare from "../pages/Compare";
import Error404 from "../pages/Error404";
import Fail from "../pages/Fail";
import Home from "../pages/Home";
import PaymentSuccess from "../pages/PaymentSuccess";
import Review from "../pages/Review";
import ServiceDetails from "../pages/ServiceDetails";
import Services from "../pages/Services";

export const PublicPath = [
    {
        name: "Home",
        path: "/",
        element: <Home />,
    },
    {
        name: "Review",
        path: "/reviews",
        element: <Review />,
    },
    {
        name: "Service",
        path: "/services",
        element: <Services />,
    },
    {
        name: "Service",
        path: "/services/:id",
        element: <ServiceDetails />,
    },
    {
        name: "Booking",
        path: "/booking",
        element: <Booking />,
    },
    {
        name: "Success",
        path: "/success",
        element: <PaymentSuccess />,
    },
    {
        name: "Fail",
        path: "/fail",
        element: <Fail />,
    },
    {
        name: "Compare",
        path: "/compare",
        element: <Compare />,
    },
    {
        name: "Error",
        path: "/*",
        element: <Error404 />,
    },
];
