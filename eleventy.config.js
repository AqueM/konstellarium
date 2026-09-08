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
        var imageHTML = `<div class="infobox-figure"
        style="background:url('${character.image}')">
    </div>`

        var bioHTML = `<div class="infobox-element">
        <div class="infobox-element-title">Fullname</div>
        <div class="infobox-element-content">${character.name}</div></div>
    <div class="infobox-element">
        <div class="infobox-element-title">Aliases</div>
        <div class="infobox-element-content">`;

        var aliasesHTML = ``;
        if (character.alias) {
            aliasesHTML = `<ul class="infobox-list">`;
            character.alias.forEach(element => aliasesHTML += `<li>${element}</li>`)
            aliasesHTML += (`</ul>`);
        }

        var infoHTML = ``;
        Object.keys(character.info).forEach(key => {
            if (typeof character.info[key] === 'object' && key !== null) {
                infoHTML += `<div class="infobox-sub-title">${key}</div>`
                Object.keys(character.info[key]).forEach(innerKey => {
                    if (typeof character.info[key][innerKey] === 'object') {
                        infoHTML += `<div class="infobox-element">
        <div class="infobox-element-title">${innerKey}</div>
        <div class="infobox-element-content"><ul class="infobox-list">`;
                        character.info[key][innerKey].forEach(element => {
                            infoHTML += `<li>${element}</li>`
                        })
                        infoHTML += `</ul></div></div>`
                    } else {
                        infoHTML += `<div class="infobox-element">
        <div class="infobox-element-title">${innerKey}</div>
        <div class="infobox-element-content">${character.info[key][innerKey]}</div></div>`
                    }
                });
            }
        })

        var relationsHTML = `<div class="infobox-sub-title">relations</div><div class="infobox-element">
        <div class="infobox-element-content"><ul class="infobox-list">`;
        Object.keys(character.relations).forEach(key => {
            if(character.relations[key].link){
            relationsHTML += `<li><a href="${character.relations[key].link}"><em>${key}</em></a> (${character.relations[key].relation})</li>`
            } else {
            relationsHTML += `<li><em>${key}</em> (${character.relations[key].relation})</li>`
            }
            })
        relationsHTML += `</ul></div></div>`

        return `<aside class="infobox">
        <div class="infobox-title">Information</div>
        ${imageHTML}
        ${bioHTML}    
        ${aliasesHTML}
        </div></div>
        ${infoHTML}
        ${relationsHTML}
        </aside>`;
    });
}
