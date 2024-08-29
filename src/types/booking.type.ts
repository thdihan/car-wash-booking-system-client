import { TService } from "./service.type";
import { TSlot } from "./slot.type";
import { TCustomer } from "./user.type";

export type TBooking = {
    _id: string;
    customer: TCustomer;
    service: TService;
    slot: TSlot;
    vehicleType: string;
    vehicleBrand: string;
    vehicleModel: string;
    manufacturingYear: number;
    registrationPlate: string;
};
