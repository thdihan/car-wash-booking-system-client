import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { AdminPath } from "./admin.routes";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { routeGenerator } from "../utils/routesGenerator";
import { UserPath } from "./user.routes";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/admin",
        element: <App />,
        children: routeGenerator(AdminPath),
    },
    {
        path: "/user",
        element: <App />,
        children: routeGenerator(UserPath),
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

export default router;
