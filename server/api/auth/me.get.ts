import { Users } from "@prisma/client";

export default defineEventHandler({
  onRequest: [requireJwtAuth],
  handler: async (event) => {
    // @ts-expect-error - user is added by passport. I was not able to augment this type.
    // TODO: Check with nuxt team on how to augment this type.
    const user = event.node.req.user as Users;
    user.password = undefined;
    // Return the user object. Remember that passport.js adds the user object to the request object.
    return { user };
  },
});
