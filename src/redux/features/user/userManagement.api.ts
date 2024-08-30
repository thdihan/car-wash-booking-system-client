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

            providesTags: ["profile"],
        }),

        updateProfile: builder.mutation({
            query: (data: any) => {
                return {
                    url: "/user",
                    method: "PUT",
                    body: data,
                };
            },
            invalidatesTags: ["profile"],
        }),

        getAllUsers: builder.query({
            query: () => {
                return {
                    url: "/user/all",
                    method: "GET",
                };
            },

            providesTags: ["profile"],
        }),
    }),
});

export const {
    useGerPersonalDataQuery,
    useUpdateProfileMutation,
    useGetAllUsersQuery,
} = userManagementApi;
