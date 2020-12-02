"use strict";

const hornImages = [];
const keywords = [];

function HornImage(jsonObject) {
    this.image_url = jsonObject.image_url;
    this.title = jsonObject.title;
    this.description = jsonObject.description;
    this.keyword = jsonObject.keyword;
    this.horns = jsonObject.horns;
}

HornImage.prototype.render = function () {
    const $newImageDiv = $("#photo-template").find("div").clone();

    $newImageDiv.find("h2").text(this.title);
    $newImageDiv.find("p").text(this.description);
    $newImageDiv.find("img").attr("src", this.image_url);
    $newImageDiv.addClass("all");
    $newImageDiv.addClass(this.keyword);
    $newImageDiv.addClass("single-image");

    $("#gallery").append($newImageDiv);
};

$.ajax("/data/page-1.json", "json").then((imageGallery) => {
    imageGallery.forEach(imageJSONObject => hornImages.push(new HornImage(imageJSONObject)));
    hornImages.forEach(image => image.render());
    hornImages.forEach((currentItem) => {
        keywords.unshift(currentItem.keyword);

        if (keywords.includes(currentItem.keyword, 1)) {
            keywords.shift();
        }

    });

    filterOptions(keywords);

});

function filterOptions(keywordArray) {
    keywordArray.forEach((keyword) => {
        const $newFilterOption = $("#drop-down").find("#list-top").clone();
        $newFilterOption.text(keyword);
        $newFilterOption.attr("value", keyword);
        $newFilterOption.removeAttr("id", "list-top");

        $("#drop-down").append($newFilterOption);
    });
}

$("#drop-down").on("change", function () {
    const $choice = $(this).val();
    $(".all").hide();
    $(`.${$choice}`).show();
});

$("#photo-template").hide();
