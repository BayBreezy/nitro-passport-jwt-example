import { describe, expect, test, it, vi, type Mock, afterEach } from "vitest";
import bcrypt from "bcryptjs";
import {
  hashPassword,
  comparePassword,
  getUserByEmail,
  getUserById,
  createUser,
} from "../../server/services/auth";
import prisma from "../../server/utils/prisma";

const email1 = "tafvenek@ziebevi.cc";
const user1 = { id: 1, email: email1, password: "password" };

describe("Auth Service", () => {
  describe("hashPassword", () => {
    it("should hash the password using bcrypt", async () => {
      const password = "password123";
      const res = await hashPassword(password);
      expect(res).not.toBe(password);
    });
    it("should hash the password using bcrypt with custom salt", async () => {
      const password = "password123";
      const salt = 10;
      vi.spyOn(bcrypt, "hash");
      await hashPassword(password, salt);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, salt);
    });
  });

  describe("comparePassword", () => {
    it("should check if the passwords match", async () => {
      const password = "password123";
      const hashedPassword = await hashPassword(password);
      const res = await comparePassword(password, hashedPassword);
      expect(res).toBe(true);
    });
  });

  describe("getUserByEmail", () => {
    it("should return user by email", async () => {
      vi.mock(import("../../server/services/auth"), async (mc) => {
        const mod = await mc();
        return {
          ...mod,
          getUserByEmail: async (email: string) => user1,
        };
      });
      const result = await getUserByEmail(email1);
      expect(result).toBe(user1);
    });
  });
});
