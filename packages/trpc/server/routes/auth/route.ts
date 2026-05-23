import { userService } from "../../services";
import { authenticatedProcedure, publicProcedure, router } from "../../trpc";
import { setAuthenticationCookie } from "../../utils/cookie";
import { generatePath } from "../../utils/path-generator";
import {
  createUserWithEmailAndPasswordInputModel,
  createUserWithEmailAndPasswordOutputModel,
  getLoggedInUserInfoInput,
  getLoggedInUserInfoOutput,
  signInUserWithEmailAndPasswordInput,
  signInUserWithEmailAndPasswordOutput
} from "./model";

const TAGS = ["Authentication"];
const getPath = generatePath("/authentication");

export const authRouter = router({
  createUserWithEmailAndPassword: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/createUserWithEmailAndPassword"),
        tags: TAGS
      }
    })
    .input(createUserWithEmailAndPasswordInputModel)
    .output(createUserWithEmailAndPasswordOutputModel)
    .mutation(async ({ input, ctx }) => {
      const { fullName, email, password } = input;

      const { id, token } = await userService.createUserWithEmailAndPassword({ fullName, email, password });

      setAuthenticationCookie(ctx, token);

      return {
        id
      }
    }),

  signInUserWithEmailAndPassword: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/signInUserWithEmailAndPassword"),
        tags: TAGS
      }
    })
    .input(signInUserWithEmailAndPasswordInput)
    .output(signInUserWithEmailAndPasswordOutput)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;

      const { id, token } = await userService.signInUserWithEmailAndPassword({ email, password });

      setAuthenticationCookie(ctx, token);

      return {
        id
      }
    }),

  getLoggedInUserInfo: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/getLoggedInUserInfo"),
        tags: TAGS,
        protect: true
      }
    })
    .input(getLoggedInUserInfoInput)
    .output(getLoggedInUserInfoOutput)
    .query(async ({ ctx }) => {
      const { id, email, fullName, profileImage } = await userService.getUserInfoById(ctx.user.id);
      return {
        id,
        email,
        fullName,
        profileImageUrl: profileImage
      }
    })
});
