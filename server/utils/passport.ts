import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    },
    // This function is called when a request is made to the server
    async (jwtPayload: JwtPayload, done) => {
      // Check if the user exists
      const user = await prisma.users.findUnique({ where: { id: jwtPayload.sub } });
      // If the user does not exist, return an error
      if (!user) return done(null, false, { message: "Invalid email or password" });
      // if user is blocked, send back that error message
      if (user.blocked) return done(null, false, { message: "User is blocked" });
      // If the user exists, return the user
      return done(null, user);
    },
  ),
);

export const passportConfig = passport;
