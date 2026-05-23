import { z } from "zod";

export const createFormInputModel = z.object({
    title: z.string().min(1).max(55).describe("Title of the form"),
    description: z.string().max(255).optional().describe("Description of the form"),
});

export const createFormOutputModel = z.object({
    id: z.uuid().describe("Id of the created form"),
});

export const formItemModel = z.object({
    id: z.uuid().describe("Unique identifier of the form"),
    title: z.string().describe("Title of the form"),
    description: z.string().nullable().optional().describe("Description of the form"),
    createdAt: z.date().nullable().describe("Form creation timestamp"),
    updatedAt: z.date().nullable().describe("Form last update timestamp"),
});

export const listFormsOutputModel = z.array(formItemModel);

export type CreateFormInputType = z.infer<typeof createFormInputModel>;
export type FormResponseType = z.infer<typeof createFormOutputModel>;
export type FormItemType = z.infer<typeof formItemModel>;
export type ListFormsOutputType = z.infer<typeof listFormsOutputModel>;
