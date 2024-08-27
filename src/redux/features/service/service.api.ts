import { TResponseRedux, TService } from "../../../types";

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
            transformResponse: (response: TResponseRedux<TService[]>) => {
                return {
                    data: response.data,
                };
            },
        }),
    }),
});

export const { useCreateServiceMutation, useGetServicesQuery } = serviceApi;
