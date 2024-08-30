import { Outlet } from "react-router-dom";
import Header from "../ui/header/Header";
import Hero from "../ui/hero/Hero";

const HomeLayout = () => {
    return (
        <>
            <Header />
            <Hero />
            <Outlet />
        </>
    );
};

export default HomeLayout;
