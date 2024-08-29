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

            invalidatesTags: ["slots"],
        }),

        getBookings: builder.query({
            query: () => {
                return {
                    url: "/bookings",
                    method: "GET",
                };
            },
        }),

        getMyBookings: builder.query({
            query: () => {
                return {
                    url: "/my-bookings",
                    method: "GET",
                };
            },
        }),
    }),
});

export const {
    useCreateBookingMutation,
    useGetBookingsQuery,
    useGetMyBookingsQuery,
} = bookingApi;
