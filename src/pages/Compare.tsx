import {
    removeService,
    selectCompareServices,
} from "../redux/features/compareSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RxCross2 } from "react-icons/rx";

const Compare = () => {
    const services = useAppSelector(selectCompareServices);
    const dispatch = useAppDispatch();
    console.log(services);
    return (
        <div className="px-4 md:px-8 lg:px-16 py-8">
            <div>
                <h1 className="text-3xl font-normal text-center">Compare</h1>
                <div className="flex justify-center space-x-2 mt-2">
                    <div className="size-3 bg-blue-500" />
                    <div className="size-3 bg-blue-500" />
                    <div className="size-3 bg-blue-500" />
                </div>
            </div>

            {services.length === 0 && (
                <h1 className="text-xl text-center text-gray-500 py-8">
                    No services added to compare
                </h1>
            )}
            <div className="py-8 flex space-x-4">
                {services.map((service) => (
                    <div className="flex-1 max-w-[50%] shadow-lg border-2 p-4 rounded-lg relative">
                        <RxCross2
                            className="absolute top-2 right-2 cursor-pointer hover:text-blue-500"
                            onClick={() => {
                                dispatch(removeService(service._id));
                            }}
                        />
                        <h1 className="text-xl text-center">{service.name}</h1>
                        <div className="py-4 flex flex-col justify-center items-center lg:justify-evenly lg:flex-row">
                            <p>
                                <span className="text-blue-600 font-semibold">
                                    Duration:{" "}
                                </span>
                                <span>{service.duration}</span>
                            </p>
                            <p>
                                <span className="text-blue-600 font-semibold">
                                    Price:{" "}
                                </span>
                                <span>{service.price}</span>
                            </p>
                        </div>

                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Compare;
