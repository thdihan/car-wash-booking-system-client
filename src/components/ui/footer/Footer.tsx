import Calendar from "react-calendar";
import { navItems } from "../header/navItems";
import { Link } from "react-router-dom";
import {
    ImFacebook2,
    ImInstagram,
    ImLinkedin2,
    ImMail2,
    ImTwitter,
} from "react-icons/im";
import { HashLink } from "react-router-hash-link";

const Footer = () => {
    // const [value, setValue] = useState(new Date());
    const value = new Date();
    return (
        <div className="bg-black">
            <div className="container mx-auto flex w-full flex-col lg:items-center space-y-10 p-10 lg:text-left lg:max-w-[1200px] lg:flex-row lg:justify-between lg:space-x-16 lg:space-y-0">
                <div className="flex-1 space-y-5 text-white text-center">
                    <h2 className="text-2xl font-semibold lg:text-left">
                        Fitness Shop
                    </h2>
                    <address className="text-center lg:text-left">
                        Apt. 955 118 Abbott Shore, <br /> New Berniece, HI{" "}
                        <br />
                        34986-8246
                    </address>
                </div>

                <div className="flex flex-1 justify-center space-x-8 items-center">
                    <ul className="text-left">
                        {navItems.map((nav, index) => (
                            <li key={index}>
                                {nav.path.startsWith("/#") ? (
                                    <HashLink
                                        smooth
                                        to={nav?.path}
                                        className="block py-1 text-white"
                                    >
                                        {nav.name}
                                    </HashLink>
                                ) : (
                                    <Link
                                        to={nav?.path}
                                        className="block py-1 text-white"
                                    >
                                        {nav.name}
                                    </Link>
                                )}
                                {/* <Link
                                    to={nav?.path}
                                    className="block py-1 text-white"
                                >
                                    {nav.name}
                                </Link> */}
                            </li>
                        ))}
                    </ul>

                    <div className="text-white space-y-2">
                        <h2>Connect with us</h2>
                        <div className="text-white flex text-xl space-x-2">
                            <ImFacebook2 />
                            <ImTwitter />
                            <ImMail2 />
                            <ImInstagram />
                            <ImLinkedin2 />
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <Calendar value={value} className={`text-white`} />
                </div>
            </div>
        </div>
    );
};

export default Footer;
