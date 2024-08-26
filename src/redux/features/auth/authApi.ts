import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => {
                console.log("Logging in user: ", userInfo);
                return {
                    url: "/auth/login",
                    method: "POST",
                    body: userInfo,
                };
            },
        }),

        register: builder.mutation({
            query: (userInfo) => {
                console.log("Registering user: ", userInfo);
                return {
                    url: "/auth/signup",
                    method: "POST",
                    body: userInfo,
                };
            },
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
