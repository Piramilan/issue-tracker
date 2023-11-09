import { z } from "zod";

export const issueSchema = z.object({
  title: z.string({ required_error: "Title is Required" }).min(1).max(255),
  description: z.string({ required_error: "Description is Required" }).min(1),
});
