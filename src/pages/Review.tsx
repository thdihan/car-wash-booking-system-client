import LoadingSpinner from "../components/ui/LoadingSpinner";
import ReviewCard from "../components/ui/review/ReviewCard";
import { useGetReviewsQuery } from "../redux/features/user/review.api";

const Review = () => {
    const { data: reviewData, isFetching } = useGetReviewsQuery(undefined);
    return (
        <div className="py-8">
            <div>
                <h1 className="text-3xl font-normal text-center">Reviews</h1>
                <div className="flex justify-center space-x-2 mt-2">
                    <div className="size-3 bg-blue-500" />
                    <div className="size-3 bg-blue-500" />
                    <div className="size-3 bg-blue-500" />
                </div>
            </div>

            <div className="p-8 space-y-4">
                {isFetching && <LoadingSpinner />}
                {!isFetching && reviewData?.data?.length === 0 && (
                    <p className="text-center text-gray-500">
                        No reviews available
                    </p>
                )}

                {/* Only Top 3 reviews will be shown */}
                {reviewData?.data?.map((review: any) => (
                    <ReviewCard
                        key={review._id}
                        name={review.reviewerId.name}
                        text={review.reviewText}
                        date={review.reviewDate}
                        rating={review.rating}
                    />
                ))}
            </div>
        </div>
    );
};

export default Review;
