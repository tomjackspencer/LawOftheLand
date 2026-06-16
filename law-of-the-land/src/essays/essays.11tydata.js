// Shared front matter for everything in /essays/.
// Each file is tagged "essay"; set `type: casenote` in a file to make it a case note.
module.exports = {
  layout: "essay.njk",
  tags: ["essay"],
  eleventyComputed: {
    section: (data) => (data.type === "casenote" ? "casenotes" : "essays")
  }
};
