import { Button } from "antd";
import heroImg from "../../../assets/hero.svg";

const Hero = () => {
    return (
        <div className="">
            <div className="flex flex-col lg:flex-row item-center justify-between space-x-4 py-16  px-4 md:px-8 lg:px-16 bg-[#efeeee]">
                <div className="flex flex-col justify-center lg:items-start space-y-8">
                    <h2 className="text-4xl lg:text-6xl font-semibold text-center lg:text-start  text-gray-800">
                        Book you services <br /> with suitable slots.
                    </h2>
                    <p className="text-center lg:text-start">
                        Book the best car wash and detailing services with us.{" "}
                        <br />
                        We offer a range of packages to keep your vehicle
                        looking its best. <br /> Schedule your appointment today
                        and drive clean!
                    </p>
                    <Button type="primary" size="large" className="font-bold">
                        Get Services Now!
                    </Button>
                </div>

                <img
                    src={heroImg}
                    alt=""
                    className="w-full lg:w-[50%] mt-8 md:mt-0 lg:mt-0"
                />
            </div>
        </div>
    );
};

export default Hero;
