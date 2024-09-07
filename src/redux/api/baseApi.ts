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
import { TUser } from "../../types/user.type";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://car-wash-booking-system-backend-five.vercel.app/api",
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
    let result = (await baseQuery(args, api, extraOptions)) as TResponse<TUser>;
    // console.log("Result ", result);

    if (result?.error?.status === 404) {
        toast.error(result.error?.data?.message, { duration: 2000 });
    }

    if (result?.error?.status === 401) {
        const res = await fetch(
            "https://car-wash-booking-system-backend-five.vercel.app/api/auth/refresh-token",
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
        result = (await baseQuery(args, api, extraOptions)) as TResponse<TUser>;
    }

    return result;
};
export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: [
        "services",
        "service",
        "slots",
        "slot",
        "profile",
        "booking",
        "reviews",
    ],
    endpoints: () => ({}),
});
