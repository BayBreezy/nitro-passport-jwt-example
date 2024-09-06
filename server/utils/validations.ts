import { object, string, number, mixed } from "yup";
import qs from "qs";

export const SignUpSchema = object({
  email: string()
    .email()
    .required()
    .label("Email")
    .transform((value) => value.toLowerCase()),
  password: string().min(8).required().label("Password"),
  displayName: string().required().label("Display Name").min(3),
});

export const LoginSchema = object({
  email: string()
    .email()
    .required()
    .label("Email")
    .transform((value) => value.toLowerCase()),
  password: string().min(8).required().label("Password"),
});

export const IdQuerySchema = object({
  id: string().required().label("ID"),
});

const validateOrderBy = (value: any) => {
  value = qs.parse(value);
  if (typeof value === "object" && !Array.isArray(value)) {
    return Object.values(value).every((v) => v === "asc" || v === "desc");
  }
  if (Array.isArray(value)) {
    return value.every((obj) => Object.values(obj).every((v) => v === "asc" || v === "desc"));
  }
  return false;
};

export const PaginationSchema = object({
  limit: number()
    .default(20)
    .label("Limit")
    .nullable()
    .transform((v) => Number(v || 20)),
  page: number()
    .default(1)
    .label("Page")
    .nullable()
    .transform((v) => Number(v || 1)),
  search: string().default("").label("Search"),
  orderBy: mixed<Record<string, "asc" | "desc"> | Array<Record<string, "asc" | "desc">>>()
    .default({ createdAt: "desc" })
    .label("Order By")
    .test(
      "is-valid-orderBy",
      "orderBy must be an object or an array of objects with values 'asc' or 'desc'",
      (value) => value === undefined || validateOrderBy(value),
    )
    .transform((v) => qs.parse(v)),
});
