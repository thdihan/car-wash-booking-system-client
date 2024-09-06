import Home from "../pages/Home";
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
];
