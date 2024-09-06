export default defineNitroPlugin(async (nitro) => {
  nitro.h3App.use(fromNodeMiddleware(passportConfig.initialize()));
});
