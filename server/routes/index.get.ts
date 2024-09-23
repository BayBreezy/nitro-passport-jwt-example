export default defineEventHandler({
  handler: async (event) => {
    const html = await useStorage("assets:templates").getItem(`welcome.html`);
    return html;
  },
});
