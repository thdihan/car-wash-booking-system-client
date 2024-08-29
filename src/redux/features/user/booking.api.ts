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
    }),
});

export const { useCreateBookingMutation } = bookingApi;
