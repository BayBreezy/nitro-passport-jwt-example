//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  imports: {
    dirs: ["./server/services"],
  },
});
