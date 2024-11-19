import { z } from "zod";

export const coursesSchema = z.object({
    c_abbrev: z.string().min(1, "Required"),
    c_num: z.union([z.coerce.number().min(100, "Must be greater than 100"), z.null()]),
})