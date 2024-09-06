/**
 * This utility function is used to require JWT auth from the user.
 *
 * It should be used on routes that require the user to be authenticated.
 */
export default defineEventHandler({
  onRequest: [fromNodeMiddleware(passportConfig.authenticate("jwt", { session: false }))],
  handler: async (event) => {},
});
