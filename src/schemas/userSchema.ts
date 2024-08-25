import { z } from "zod";

export const userSchema = z.object({
    name: z.string({ required_error: "Please enter your name" }),
    email: z.string({ required_error: "Please enter your email" }),
    password: z.string({ required_error: "Please enter your password" }),
    contact: z.string({ required_error: "Please enter your contact" }),
    address: z.string({ required_error: "Please enter your address" }),
});
