import { baseApi } from "../../api/baseApi";

const serviceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createService: builder.mutation({
            query: (data) => {
                return {
                    url: "/services",
                    method: "POST",
                    body: data,
                };
            },
        }),
    }),
});

export const { useCreateServiceMutation } = serviceApi;
