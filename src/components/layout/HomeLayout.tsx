import { Outlet, useLocation } from "react-router-dom";
import Header from "../ui/header/Header";
import Footer from "../ui/footer/Footer";
import ScrollToTop from "react-scroll-to-top";
import { useEffect } from "react";

const HomeLayout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <>
            <Header />
            <Outlet />
            <ScrollToTop smooth />
            <Footer />
        </>
    );
};

export default HomeLayout;
