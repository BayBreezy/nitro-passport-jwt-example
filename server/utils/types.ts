export type JwtPayload = {
  sub: number;
  email: string;
};

export type Pagination = {
  limit?: number;
  page?: number;
  search?: string;
  orderBy?: Record<string, "asc" | "desc"> | Array<Record<string, "asc" | "desc">>;
};
