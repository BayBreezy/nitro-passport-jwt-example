//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",

  imports: {
    dirs: ["./server/services"],
  },

  serverAssets: [{ baseName: "templates", dir: "./templates" }],
  compatibilityDate: "2024-12-02",
});