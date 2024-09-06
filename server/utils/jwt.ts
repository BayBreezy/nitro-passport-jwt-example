import jwt from "jsonwebtoken";
import { defu } from "defu";

/**
 * Sign a JWT token
 */
export const signJwt = (payload: JwtPayload, options: jwt.SignOptions = {}) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    defu<jwt.SignOptions, [jwt.SignOptions]>(options, {
      expiresIn: "7d",
      // Your website name
      issuer: "https://www.example.com",
    }),
  );
};
