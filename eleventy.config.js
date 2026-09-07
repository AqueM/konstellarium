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

    // require("./config/filters.js")(eleventyConfig);
    // require("./config/file-reading.js")(eleventyConfig);
    // require("./config/shortcodes/content.js")(eleventyConfig);
    // require("./config/shortcodes/theme.js")(eleventyConfig);
    // require("./config/shortcodes/layout.js")(eleventyConfig);
    // require("./config/collections.js")(eleventyConfig);

    eleventyConfig.addShortcode("wiki-aside", function (character) {
        var intro = `<div class="infobox-title">
        Information
    </div>
    <div class="infobox-figure"
        style="background:url('${character.image}')">
    </div>
    <div class="infobox-element">
        <div class="infobox-element-title">Fullname</div>
        <div class="infobox-element-content">${character.name}</div>
    </div>
    <div class="infobox-element">
        <div class="infobox-element-title">Aliases</div>
        <div class="infobox-element-content">`;
        var aliasesHTML = ``;
        if (character.alias) {
            aliasesHTML = `<ul>`;
            character.alias.forEach(element => aliasesHTML += `<li>${element}</li>`)
            aliasesHTML += (`</ul>`);
        }
        var bioHTML = "";
        Object.keys(character.bio).forEach(key =>{
            bioHTML += `<div class="infobox-element">
        <div class="infobox-element-title">${key}</div>
        <div class="infobox-element-content">${character.bio[key]}</div>
    </div>`});
        return `<aside class="infobox">
        ${intro}    
        ${aliasesHTML}
        </div>
    </div>
    <div class="infobox-sub-title">Bio</div>
            ${bioHTML}
</aside>`;
    });
}