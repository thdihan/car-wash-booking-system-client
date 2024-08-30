import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBooking: builder.mutation({
            query: (data) => {
                return {
                    url: "/bookings",
                    method: "POST",
                    body: data,
                };
            },

            invalidatesTags: ["slots", "booking"],
        }),

        getBookings: builder.query({
            query: () => {
                return {
                    url: "/bookings",
                    method: "GET",
                };
            },

            providesTags: ["booking"],
        }),

        getMyBookings: builder.query({
            query: () => {
                return {
                    url: "/my-bookings",
                    method: "GET",
                };
            },
            providesTags: ["booking"],
        }),
    }),
});

export const {
    useCreateBookingMutation,
    useGetBookingsQuery,
    useGetMyBookingsQuery,
} = bookingApi;
