export default defineEventHandler({
  handler: async (event) => {
    // validate the request body
    const body = await readValidatedBody(event, (d) => LoginSchema.validateSync(d));
    // check if the user exists
    const user = await getUserByEmail(body.email);
    if (!user) {
      throw createError({
        statusCode: 404,
        message: "Invalid email or password",
      });
    }
    // check if user is blocked
    if (user.blocked) {
      throw createError({
        statusCode: 403,
        message: "User is blocked",
      });
    }
    // compare the password
    const passwordMatch = await comparePassword(body.password, user.password);
    if (!passwordMatch) {
      throw createError({
        statusCode: 404,
        message: "Invalid email or password",
      });
    }
    // create a token
    const token = signJwt({ sub: user.id, email: user.email });
    // return the token and user (minus password)
    user.password = undefined;
    return {
      token,
      user,
    };
  },
});
