import { Button } from "antd";
import Logo from "./Logo";
import Navigation from "./Navigation";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
    logout,
    selectCurrentUser,
} from "../../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const user = useAppSelector(selectCurrentUser);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleNavigation = (navigateTo: string) => {
        switch (navigateTo) {
            case "login":
                navigate("/login");
                break;
            case "signup":
                navigate("/register");
                break;
            case "logout":
                dispatch(logout());
                break;
            case "dashboard":
                navigate(`/${user?.role}`);
                break;
        }
    };
    return (
        <div className="bg-white">
            <div className="flex flex-col lg:flex-row lg:justify-between items-center py-6 border-b-2 border-grey-300 px-8 lg:px-16 space-y-0">
                <Logo />
                {user && (
                    <div className="space-x-2">
                        <Button
                            type="primary"
                            className="m-0"
                            onClick={() => handleNavigation("dashboard")}
                        >
                            Dashboard
                        </Button>
                        <Button onClick={() => handleNavigation("logout")}>
                            Logout
                        </Button>
                    </div>
                )}
                {!user && (
                    <div className="space-x-2">
                        <Button
                            type="primary"
                            className="m-0"
                            onClick={() => handleNavigation("login")}
                        >
                            Login
                        </Button>
                        <Button onClick={() => handleNavigation("signup")}>
                            Signup
                        </Button>
                    </div>
                )}
            </div>
            <div className="px-4 md:px-8 lg:px-16 border-b-2 border-grey-300">
                <Navigation />
            </div>
        </div>
    );
};

export default Header;
