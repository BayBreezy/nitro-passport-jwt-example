import { Prisma } from "@prisma/client";
import { destr } from "destr";
/**
 * Get all users based on the query.
 */
export const getAllUsers = async (query?: Pagination) => {
  const [results, meta] = await prisma.users
    .paginate({
      orderBy: destr(query.orderBy),
      select: {
        id: true,
        email: true,
        displayName: true,
        createdAt: true,
        updatedAt: true,
        blocked: true,
      },
      where: {
        OR: [{ displayName: { contains: query.search } }, { email: { contains: query.search } }],
      },
    } as Prisma.UsersFindManyArgs)
    .withPages({
      limit: query?.limit,
      page: query?.page,
    });
  return { results, meta };
};
