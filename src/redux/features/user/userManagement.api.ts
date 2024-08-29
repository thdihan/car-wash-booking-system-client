import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        gerPersonalData: builder.query({
            query: (userId: string) => {
                return {
                    url: "/user",
                    method: "GET",
                    params: { userId },
                };
            },
        }),
    }),
});

export const { useGerPersonalDataQuery } = userManagementApi;
