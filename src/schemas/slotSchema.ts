import { z } from "zod";

export const SlotSchema = z.object({
    service: z.string({ required_error: "Service is required" }),
    date: z.date({ required_error: "Date is required" }),
    startTime: z.date({ required_error: "Start Time is required" }),
    endTime: z.date({ required_error: "End Time is required" }),
});
