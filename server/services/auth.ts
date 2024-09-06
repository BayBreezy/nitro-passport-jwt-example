import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

export const hashPassword = async (password: string, salt: number = 12) => {
  return await bcrypt.hash(password, salt);
};
export const comparePassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const getUserByEmail = async (email: string) => {
  return await prisma.users.findUnique({ where: { email } });
};
export const getUserById = async (id: number | string) => {
  id = Number(id);
  const user = await prisma.users.findUnique({ where: { id } });
  user.password = undefined;
  return user;
};
export const createUser = async (data: Prisma.UsersCreateInput) => {
  return await prisma.users.create({ data });
};
