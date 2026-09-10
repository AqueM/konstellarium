module.exports = async function (eleventyConfig) {

    // SETUP
    eleventyConfig.setInputDirectory("_src");
    eleventyConfig.addPassthroughCopy({ "_src/_assets": "assets" });
    eleventyConfig.addPassthroughCopy("_src/robots.txt");
    eleventyConfig.addPassthroughCopy("_src/ai.txt");
    eleventyConfig.addPassthroughCopy({
        "node_modules/photoswipe/dist": "assets/photoswipe"
    });
    eleventyConfig.setLiquidOptions({
        jsTruthy: true,
    });
    eleventyConfig.addCollection('categories', (collectionApi) => {
        const categories = new Set();
        const pages = collectionApi.getAll();
        pages.forEach((page) => {
            if (page.data.category) {
                categories.add(page.data.category);
            }
        });
        return Array.from(categories);
    });

    const markdown = require("markdown-it")({
        html: true,
        breaks: true,
        linkify: true,
    });
    var markdownItAttrs = require('markdown-it-attrs');
    var markdownItAnchor = require('markdown-it-anchor');
    let markdownLib = markdown.use(markdownItAttrs).use(markdownItAnchor);
    eleventyConfig.setLibrary('md', markdownLib);

    eleventyConfig.setLiquidOptions({
        jsTruthy: true,
    });

    const pluginTOC = require("@uncenter/eleventy-plugin-toc");
    eleventyConfig.addPlugin(pluginTOC.default);
}
