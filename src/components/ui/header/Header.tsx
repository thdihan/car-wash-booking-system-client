import { Button } from "antd";
import Logo from "./Logo";
import Navigation from "./Navigation";

const Header = () => {
    return (
        <div className="bg-white">
            <div className="flex flex-col lg:flex-row lg:justify-between items-center py-6 border-b-2 border-grey-300 px-8 lg:px-16 space-y-0">
                <Logo />
                <Button type="primary" size="large" className="m-0">
                    Dashboard
                </Button>
            </div>
            <div className="px-4 md:px-8 lg:px-16 border-b-2 border-grey-300">
                <Navigation />
            </div>
        </div>
    );
};

export default Header;
