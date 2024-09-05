import { Progress } from "antd";

const RatingBar = ({
    percentage,
    star,
    review,
}: {
    percentage: number;
    star: number;
    review: number;
}) => {
    return (
        <div className="flex justify-between item-center flex-nowrap space-x-4">
            <Progress
                strokeLinecap="butt"
                percent={percentage}
                className=" w-5/6"
            />
            <p className="text-end space-x-2 w-1/6 text-sm text-gray-700">
                <span className="font-bold ">{star.toFixed(2)}</span>{" "}
                <span>{review} reviews</span>
            </p>
        </div>
    );
};

export default RatingBar;
