import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createReview: builder.mutation({
            query: (data) => {
                return {
                    url: "/reviews",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["reviews"],
        }),

        getReviews: builder.query({
            query: () => {
                return {
                    url: "/reviews",
                    method: "GET",
                };
            },
            providesTags: ["reviews"],
        }),
    }),
});

export const { useCreateReviewMutation, useGetReviewsQuery } = reviewApi;
