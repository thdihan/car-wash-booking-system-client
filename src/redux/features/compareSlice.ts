import { createSlice } from "@reduxjs/toolkit";
import { TService } from "../../types";
import { RootState } from "../store";

const initialState: { services: TService[] } = { services: [] };
const compareSlice = createSlice({
    name: "compare",
    initialState: initialState,
    reducers: {
        addService: (state, action) => {
            state.services.push(action.payload);
        },
        removeService: (state, action) => {
            state.services = state.services.filter(
                (service) => service._id !== action.payload
            );
        },
    },
});

export const { addService, removeService } = compareSlice.actions;
const compareReducer = compareSlice.reducer;
export default compareReducer;

export const selectCompareServices = (state: RootState) =>
    state.compare.services;
