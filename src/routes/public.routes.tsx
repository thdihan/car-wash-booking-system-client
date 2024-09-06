import Home from "../pages/Home";
import Review from "../pages/Review";
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
];
