import { StarFilled, StarOutlined } from "@ant-design/icons";

const ReviewCard = ({
    name,
    text,
    date,
    rating,
}: {
    name: string;
    text: string;
    date: string;
    rating: number;
}) => {
    return (
        <div className="shadow-lg p-8 border-2 rounded-lg">
            <div className="flex justify-between flex-col lg:flex-row">
                <div className="flex lg:items-center lg:space-x-2 flex-col lg:flex-row">
                    <h2 className="font-semibold align-middle">{name}</h2>
                    <p className="text-xs font-light text-gray-600 align-middle">
                        {new Date(date).getMonth() +
                            1 -
                            new Date(Date.now()).getMonth()}{" "}
                        Months ago
                    </p>
                </div>
                <div className="flex space-x-2">
                    <p className="font-semibold">{rating.toFixed(2)}</p>
                    <div className="text-yellow-500">
                        {Array.from({ length: rating }).map((_, index) => (
                            <StarFilled key={index} />
                        ))}
                        {Array.from({ length: 5 - rating }).map((_, index) => (
                            <StarOutlined key={index} />
                        ))}
                    </div>
                </div>
            </div>
            <p className="text-sm py-2">{text}</p>
        </div>
    );
};

export default ReviewCard;
