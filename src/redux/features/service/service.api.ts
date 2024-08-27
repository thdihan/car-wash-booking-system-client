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

        getServices: builder.query({
            query: () => {
                return {
                    url: "/services",
                    method: "GET",
                };
            },
        }),
    }),
});

export const { useCreateServiceMutation, useGetServicesQuery } = serviceApi;
