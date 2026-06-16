module.exports = function(eleventyConfig) {
  // Copy static assets straight through to the built site
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");

  // --- Collections -------------------------------------------------
  // An "essay" and a "case note" are the same kind of object with a
  // different `type`. Tag each piece with `essay` in its front matter;
  // set `type: casenote` to make it a case note.
  eleventyConfig.addCollection("writing", function(api) {
    return api.getFilteredByTag("essay").sort((a, b) => b.date - a.date);
  });
  eleventyConfig.addCollection("essays", function(api) {
    return api.getFilteredByTag("essay")
      .filter(p => (p.data.type || "essay") === "essay")
      .sort((a, b) => b.date - a.date);
  });
  eleventyConfig.addCollection("casenotes", function(api) {
    return api.getFilteredByTag("essay")
      .filter(p => p.data.type === "casenote")
      .sort((a, b) => b.date - a.date);
  });
  eleventyConfig.addCollection("institutes", function(api) {
    return api.getFilteredByTag("note").sort((a, b) =>
      (a.data.order || 0) - (b.data.order || 0));
  });

  // --- Filters -----------------------------------------------------
  // Pieces belonging to a given subject slug (used by subject pages)
  eleventyConfig.addFilter("bySubject", function(items, slug) {
    return (items || []).filter(p =>
      (p.data.subjects || []).includes(slug));
  });

  // Friendly date, e.g. "16 June 2026"
  eleventyConfig.addFilter("readableDate", function(d) {
    return new Date(d).toLocaleDateString("en-GB",
      { day: "numeric", month: "long", year: "numeric" });
  });
  // Short date, e.g. "16 Jun 2026"
  eleventyConfig.addFilter("shortDate", function(d) {
    return new Date(d).toLocaleDateString("en-GB",
      { day: "numeric", month: "short", year: "numeric" });
  });

  // Current year (for the footer)
  eleventyConfig.addShortcode("year", () => String(new Date().getFullYear()));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
