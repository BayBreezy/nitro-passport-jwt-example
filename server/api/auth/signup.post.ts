export default defineEventHandler({
  handler: async (event) => {
    // validate the request body
    const body = await readValidatedBody(event, (d) => SignUpSchema.validateSync(d));
    // check if the user already exists
    const user = await getUserByEmail(body.email);
    if (user) {
      throw createError({
        statusCode: 404,
        message: "This email is already in use",
      });
    }
    // hash the password
    const hashedPassword = await hashPassword(body.password);
    // create the user
    const newUser = await createUser({
      email: body.email,
      password: hashedPassword,
      displayName: body.displayName,
    });
    // create a token
    const token = signJwt({ sub: newUser.id, email: newUser.email });
    // return the token and user (minus password)
    newUser.password = undefined;
    return {
      token,
      user: newUser,
    };
  },
});
