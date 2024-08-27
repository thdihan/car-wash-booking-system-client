import {
    BaseQueryApi,
    BaseQueryFn,
    createApi,
    DefinitionType,
    FetchArgs,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setUser } from "../features/auth/authSlice";
import { toast } from "sonner";
import { TResponse } from "../../types/global";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5001/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set("Authorization", `bearer ${token}`);
        }

        return headers;
    },
});

const baseQueryWithRefreshToken: BaseQueryFn<
    FetchArgs,
    BaseQueryApi,
    DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
    let result = (await baseQuery(args, api, extraOptions)) as TResponse;
    // console.log("Result ", result);

    if (result?.error?.status === 404) {
        toast.error(result.error?.data?.message, { duration: 2000 });
    }

    if (result?.error?.status === 401) {
        const res = await fetch(
            "http://localhost:5001/api/auth/refresh-token",
            {
                method: "POST",
                credentials: "include",
            }
        );

        const data = await res.json();

        const user = (api.getState() as RootState).auth.user;

        console.log("Refresh token response", data);

        api.dispatch(
            setUser({
                user,
                token: data.data.accessToken,
            })
        );
        result = (await baseQuery(args, api, extraOptions)) as TResponse;
    }

    return result;
};
export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithRefreshToken,
    endpoints: () => ({}),
});
