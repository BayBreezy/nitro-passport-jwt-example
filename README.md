# Nitro Passport JWT Example ft Prisma

This repository contains an example of how to use Passport.js with JWT strategy in a Nitro project. The example uses Prisma as the ORM.

## Getting Started

- Clone the repository
- Make a copy of `.env.example` and rename it to `.env`
- Fill out the environment variables in the `.env` file
- Run `npm install`
- **Optionally** run the seed command `npm run prisma:seed`
- Run the server `npm run dev`

## Noteworthy

- Check out the [Passport Init Plugin File](./server/plugins/init-passport.ts) to see how Passport is initialized in the project. Take note of the `fromNodeMiddleware` utility function that is used to convert the Passport middleware to one that can be used by Nitro.
- Checkout the [Prisma Initialization File](./server/utils/prisma.ts) to see how Prisma is initialized in the project. The `prisma` instance can be automatically imported into any file in the project.
- Checkout the [Passport Configuration File](./server/utils/passport.ts) to see how the Passport strategies are configured in the project.
- Checkout the [Required Auth File](./server/utils/requireJwtAuth.ts). This event handler is used to protect routes that require authentication. Use it in the `onRequest` array inside your event handlers.
