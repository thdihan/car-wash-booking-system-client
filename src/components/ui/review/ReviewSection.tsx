import { StarFilled, StarOutlined } from "@ant-design/icons";
import RatingBar from "./RatingBar";
import ReviewCard from "./ReviewCard";
import Feedback from "./Feedback";
import { useGetReviewsQuery } from "../../../redux/features/user/review.api";
import { floor } from "lodash";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { Button } from "antd";

type TRating = {
    percentage: number;
    count: number;
};
const ReviewSection = () => {
    const { data: reviewData, isFetching } = useGetReviewsQuery(undefined);
    console.log("Review Data", reviewData);
    const [avgRating, setAvgRating] = useState<number>(0);
    const [ratingCount, setRatingCount] = useState<TRating[]>();

    useEffect(() => {
        if (reviewData) {
            const avg = floor(
                reviewData?.data?.reduce((acc: any, item: any) => {
                    return acc + item.rating;
                }, 0) / reviewData?.data?.length
            ).toFixed(2);
            setAvgRating(Number(avg));

            const count = reviewData?.data?.reduce(
                (acc: any, item: any) => {
                    acc[item.rating] += 1;
                    return acc;
                },
                [0, 0, 0, 0, 0, 0]
            );

            const rating = count.map((item: number) => {
                return {
                    percentage: (item / reviewData?.data?.length) * 100,
                    count: item,
                };
            });
            setRatingCount(rating);
        }
    }, [reviewData]);
    return (
        <div id="reviews" className="px-4 md:px-8 lg:px-16 py-6">
            {/* Review Header  */}
            <div>
                <h1 className="text-3xl font-normal text-center">Reviews</h1>
                <div className="flex justify-center space-x-2 mt-2">
                    <div className="size-3 bg-blue-500" />
                    <div className="size-3 bg-blue-500" />
                    <div className="size-3 bg-blue-500" />
                </div>
            </div>

            {/* Rating Section */}
            <div className="flex divide-x-2">
                <div className="flex-1 p-8">
                    <h1 className="text-5xl font-bold text-center">
                        {avgRating.toFixed(2)}
                    </h1>
                    <div className="flex justify-between text-xl text-yellow-500 py-2">
                        {Array.from({ length: avgRating }).map((_, index) => (
                            <StarFilled key={index} />
                        ))}
                        {Array.from({ length: 5 - avgRating }).map(
                            (_, index) => (
                                <StarOutlined key={index} />
                            )
                        )}
                    </div>
                    <p className="text-center text-sm text-gray-600">
                        Based on 100 reviews
                    </p>
                </div>
                <div className="flex-[10] p-8 space-y-4">
                    {ratingCount
                        ?.map((rating, index) => {
                            if (index === 0) return;
                            return (
                                <RatingBar
                                    key={index}
                                    percentage={parseFloat(
                                        rating.percentage.toFixed(2)
                                    )}
                                    star={index}
                                    review={rating.count}
                                />
                            );
                        })
                        .reverse()}
                </div>
            </div>

            {/* Review Section */}

            <div className="space-y-2 py-4">
                {isFetching && <LoadingSpinner />}
                {!isFetching && reviewData?.data?.length === 0 && (
                    <p className="text-center text-gray-500">
                        No reviews available
                    </p>
                )}

                {/* Only Top 3 reviews will be shown */}
                {reviewData?.data?.slice(-2).map((review: any) => (
                    <ReviewCard
                        key={review._id}
                        name={review.reviewerId.name}
                        text={review.reviewText}
                        date={review.reviewDate}
                        rating={review.rating}
                    />
                ))}

                <div className="text-center py-2">
                    <Button className="shadow-xl">View All Reviews</Button>
                </div>
            </div>

            <Feedback />
        </div>
    );
};

export default ReviewSection;
