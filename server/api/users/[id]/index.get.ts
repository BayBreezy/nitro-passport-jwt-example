export default defineEventHandler({
  onRequest: [requireJwtAuth],
  handler: async (event) => {
    const { id } = await getValidatedRouterParams(event, (d) => IdQuerySchema.validateSync(d));
    const user = await getUserById(id);
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
      });
    }
    return user;
  },
});
