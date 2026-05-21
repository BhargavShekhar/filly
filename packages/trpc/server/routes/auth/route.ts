import { userService } from "../../services";
import { publicProcedure, router } from "../../trpc";
import { getAuthneticationCookie, setAuthenticationCookie } from "../../utils/cookie";
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

  getLoggedInUserInfo: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/getLoggedInUserInfo"),
        tags: TAGS
      }
    })
    .input(getLoggedInUserInfoInput)
    .output(getLoggedInUserInfoOutput)
    .query(async ({ ctx }) => {
      const userToken = getAuthneticationCookie(ctx);

      if (!userToken) throw new Error("User is not logged in");

      const { email, fullName, id, profileImage } = await userService.verifyAndDecodeUserToken(userToken);
      return {
        id,
        email,
        fullName,
        profileImageUrl: profileImage
      }
    })
});
