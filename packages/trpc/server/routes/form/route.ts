import { formService } from "../../services";
import { router, authenticatedProcedure } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { createFormInputModel, createFormOutputModel } from "./model";

const TAGS = ["Form"];
const getPath = generatePath("/form");

export const FormRouter = router({
    createForm: authenticatedProcedure
        .meta({
            openapi: {
                method: "POST",
                path: getPath("/createUserWithEmailAndPassword"),
                tags: TAGS,
                protect: true
            }
        })
        .input(createFormInputModel)
        .output(createFormOutputModel)
        .mutation(async ({ ctx, input }) => {
            const { title, description } = input;

            const { id } = await formService.createForm({ title, description, createdBy: ctx.user.id });

            return {
                id
            }
        })

})