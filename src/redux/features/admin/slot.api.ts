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
        }),
    }),
});

export const { useCreateSlotMutation } = slotApi;
