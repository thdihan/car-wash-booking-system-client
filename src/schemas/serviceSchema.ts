import { z } from "zod";

export const ServiceSchema = z.object({
    name: z.string({ required_error: "Please enter service name." }),
    description: z.string({
        required_error: "Please enter service description.",
    }),
    price: z.number({
        required_error: "Please enter a price.",
        invalid_type_error: "Input must be a number.",
    }),
    duration: z.number({
        required_error: "Please enter a duration.",
        invalid_type_error: "Input must be a number.",
    }),
});
