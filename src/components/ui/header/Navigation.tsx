import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";
import { navItems } from "./navItems";
import { HashLink } from "react-router-hash-link";

const Navigation = () => {
    const [navOpen, setNavOpen] = useState(false);
    return (
        <nav className="">
            <div className="py-2 lg:hidden">
                <BiMenu
                    className="text-3xl cursor-pointer"
                    onClick={() => setNavOpen((prev) => !prev)}
                />
            </div>
            <ul
                className={`flex justify-center flex-col visible  lg:flex-row z-10 lg:z-0 relative ${
                    navOpen ? "lg:visible" : "hidden lg:flex"
                }`}
            >
                {navItems.map((item, index) => (
                    <li
                        key={index}
                        className="inline-block px-6 py-3 hover:bg-blue-500 hover:text-white transition-all"
                        onClick={() => setNavOpen((prev) => !prev)}
                    >
                        {item.path.startsWith("/#") ? (
                            <HashLink
                                smooth
                                to={item?.path}
                                className="font-normal"
                            >
                                {item.name}
                            </HashLink>
                        ) : (
                            <Link to={item?.path} className="font-normal">
                                {item.name}
                            </Link>
                        )}
                        {/* <Link to={item?.path} className="text-md font-medium">
                            {item.name}
                        </Link> */}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navigation;
