export default defineEventHandler({
  onRequest: [requireJwtAuth],
  handler: async (event) => {
    const q = await getValidatedQuery(event, (d) => PaginationSchema.validateSync(d));
    const users = await getAllUsers({
      limit: Number(q.limit || 20),
      page: Number(q.page || 1),
      search: q.search || "",
      orderBy: q.orderBy || { createdAt: "desc" },
    });
    return users;
  },
});
