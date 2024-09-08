import { TResponseRedux } from "../../../types";
import { TSlot } from "../../../types/slot.type";
import { baseApi } from "../../api/baseApi";

const slotApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createSlot: builder.mutation({
            query: (data) => {
                return {
                    url: "/services/slots",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["slots"],
        }),

        getSlots: builder.query({
            query: () => {
                return {
                    url: "/slots/availability",
                    method: "GET",
                };
            },

            transformResponse: (response: TResponseRedux<TSlot[]>) => {
                return {
                    data: response.data,
                };
            },

            providesTags: ["slots"],
        }),

        updateSlot: builder.mutation({
            query: ({ id, data }) => {
                return {
                    url: `/slots/${id}`,
                    method: "PUT",
                    body: data,
                };
            },
            invalidatesTags: ["slots"],
        }),
    }),
});

export const {
    useCreateSlotMutation,
    useGetSlotsQuery,
    useUpdateSlotMutation,
} = slotApi;
