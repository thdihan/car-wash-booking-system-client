import { Button, Flex, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useState } from "react";
import { useCreateReviewMutation } from "../../../redux/features/user/review.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
    const user = useAppSelector(selectCurrentUser);
    const navigate = useNavigate();
    const [createReview] = useCreateReviewMutation();
    const [review, setReview] = useState<string>("");
    const [rating, setRating] = useState<number>(0);

    const handleSubmit = async () => {
        console.log("Review", review);
        console.log("Rating", rating);

        const toastId = toast.loading("Submitting your review", {
            duration: 2000,
        });

        try {
            const res = createReview({
                reviewerId: user?.id,
                reviewText: review,
                rating,
                reviewDate: new Date().toISOString(),
            });

            console.log("Review response", res);
            toast.success("Review submitted successfully", {
                id: toastId,
                duration: 2000,
            });

            setReview("");
            setRating(0);
        } catch (error) {
            console.log("Error", error);
            toast.error("Error submitting review", {
                id: toastId,
                duration: 2000,
            });
        }
    };
    return (
        <div className="py-4 space-y-2">
            <h3>Give your feedback about our services</h3>
            <div
                className={`relative ${
                    !user && "bg-gray-200"
                } p-4 space-y-4  rounded-xl border-2`}
            >
                <TextArea
                    disabled={!user}
                    rows={4}
                    placeholder="Write your feedback here"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
                <div className="flex justify-between">
                    <Flex gap="middle" align="middle">
                        <span className={`${!user && "text-gray-500"}`}>
                            Give a Rating
                        </span>
                        <Rate
                            defaultValue={rating}
                            disabled={!user}
                            onChange={(value) => setRating(value)}
                        />
                    </Flex>
                    <Button
                        type="primary"
                        size="large"
                        disabled={!user}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
                {!user && (
                    <div className="absolute z-10 w-full top-[40%]   text-center">
                        <Button onClick={() => navigate("/login")}>
                            Login to write a review
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Feedback;
