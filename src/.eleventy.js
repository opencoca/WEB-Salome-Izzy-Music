module.exports = function (eleventyConfig) {
  // Copy `src/files` to `_site/files`
  eleventyConfig.addPassthroughCopy({ "files": "files" });
  // Put robots.txt in root
  eleventyConfig.addPassthroughCopy({ 'robots.txt': 'robots.txt' });
  eleventyConfig.addPassthroughCopy({ '404.html': '404.html' })
  // Passthrough for jpg, jpeg, png, and svg files *.jpg, *.jpeg, *.png, *.svg no mater where they are
  eleventyConfig.addPassthroughCopy('**/*.{jpg,jpeg,png,gif,svg,webp,ico}')
  return {
    // other configuration...
  };
};