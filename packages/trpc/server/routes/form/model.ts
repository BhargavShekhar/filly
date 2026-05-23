import { z } from "zod";

export const createFormInputModel = z.object({
    title: z.string().min(1).max(55).describe("Title of the form"),
    description: z.string().max(255).optional().describe("Description of the form"),
});

export const createFormOutputModel = z.object({
    id: z.uuid().describe("Id of the created form"),
});

export type CreateFormInputType = z.infer<typeof createFormInputModel>;
export type FormResponseType = z.infer<typeof createFormOutputModel>;
