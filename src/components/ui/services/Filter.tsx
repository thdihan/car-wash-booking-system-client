import { Button, Modal } from "antd";
import { useState } from "react";
import { TbAdjustmentsHorizontal } from "react-icons/tb";

import { RxCross1 } from "react-icons/rx";

type TProps = {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    sortFilter: string;
    setSortFilter: (value: string) => void;
    priceRange: number[];
    setPriceRange: (value: number[]) => void;
    durationFilter: string;
    setDurationFilter: (value: string) => void;
};
const Filter = (props: TProps) => {
    const {
        searchQuery,
        setSearchQuery,
        sortFilter,
        setSortFilter,
        priceRange,
        setPriceRange,
        durationFilter,
        setDurationFilter,
    } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onReset = () => {
        setIsModalOpen(false);
        setSortFilter("");
        setPriceRange([0, 1000]);
        setDurationFilter("");
        setSearchQuery("");
    };
    return (
        <div className="py-6 flex space-x-3 ">
            <div className="w-full relative">
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Search by Name"
                    className="w-full border-2 focus:outline-2 focus:outline-[#FF5252] py-2 rounded-lg px-4 border-gray-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery.length > 0 && (
                    <RxCross1
                        onClick={() => setSearchQuery("")}
                        className="absolute top-[32%] right-[1%] cursor-pointer"
                    />
                )}
            </div>
            <Button
                onClick={showModal}
                className="py-5 px-3 border-gray-400 border-2 text-2xl"
            >
                <TbAdjustmentsHorizontal />
            </Button>
            <Modal
                title="Filter"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div>
                    <Button onClick={onReset}>Clear Filter</Button>
                </div>
                <div className="mt-3">
                    <h3 className="font-semibold">Sort By Price</h3>
                    <form>
                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="price"
                                id="lowToHigh"
                                checked={sortFilter === "low"}
                                value="low"
                                onChange={() => setSortFilter("low")}
                            />
                            <label htmlFor="lowToHigh">Low to High</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="price"
                                id="highToLow"
                                value="high"
                                checked={sortFilter === "high"}
                                onChange={() => setSortFilter("high")}
                            />
                            <label htmlFor="lowToHigh">High to Low</label>
                        </div>
                    </form>
                </div>

                <div className="mt-6">
                    <h3 className="font-semibold">Price Range</h3>
                    <form className="flex space-x-3 items-center">
                        <div className="space-x-2">
                            <label htmlFor="min">Min</label>
                            <input
                                type="number"
                                name=""
                                id="min"
                                className="p-1 border-2 border-gray-400 w-20 rounded-md"
                                min={0}
                                max={priceRange[1]}
                                value={priceRange[0]}
                                onChange={(e) =>
                                    setPriceRange([
                                        Number(e.target.value),
                                        priceRange[1],
                                    ])
                                }
                            />
                        </div>
                        <div className="align-middle">-</div>
                        <div className="space-x-2">
                            <label htmlFor="max">Max</label>
                            <input
                                type="number"
                                name=""
                                id="max"
                                className="p-1 border-2 border-gray-400 w-20 rounded-md"
                                min={priceRange[0]}
                                value={priceRange[1]}
                                onChange={(e) =>
                                    setPriceRange([
                                        priceRange[0],
                                        Number(e.target.value),
                                    ])
                                }
                            />
                        </div>
                    </form>
                </div>
                <div className="mt-6">
                    <h3 className="font-semibold">Duration</h3>
                    <form>
                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="price"
                                id="lowToHigh"
                                checked={durationFilter === "low"}
                                value="low"
                                onChange={() => setDurationFilter("low")}
                            />
                            <label htmlFor="lowToHigh">Low to High</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="price"
                                id="highToLow"
                                value="high"
                                checked={durationFilter === "high"}
                                onChange={() => setDurationFilter("high")}
                            />
                            <label htmlFor="lowToHigh">High to Low</label>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default Filter;
