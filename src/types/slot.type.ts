import { TService } from "./service.type";

export type TSlot = {
    _id: string;
    service: TService;
    date: string;
    startTime: string;
    endTime: string;
    isBooked: string;
};
