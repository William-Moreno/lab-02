'use strict';

const hornImages = [];
const keywords = [];
let choice = 'all';
let pageShown = 1;

function HornImage(jsonObject, page) {
	this.image_url = jsonObject.image_url;
	this.title = jsonObject.title;
	this.description = jsonObject.description;
	this.keyword = jsonObject.keyword;
	this.horns = jsonObject.horns;
	this.page = page;
}

// HornImage.prototype.render = function () {
//     const $newImageDiv = $("#photo-template").find("div").clone();

//     $newImageDiv.find("h2").text(this.title);
//     $newImageDiv.find("p").text(this.description);
//     $newImageDiv.find("img").attr("src", this.image_url);
//     $newImageDiv.addClass("all");
//     $newImageDiv.addClass(this.keyword);
//     $newImageDiv.addClass("single-image");

//     $("#gallery").append($newImageDiv);
// };

HornImage.prototype.renderWithMustache = function () {
	const template = $('#mustache-template').html();
	const outputHtml = Mustache.render(template, this);

	$('ul').append(outputHtml);
};

function sortHorns(array) {
	array.sort((a, b) => {
		if (a.horns < b.horns) {
			return -1;
		} else if (a.horns > b.horns) {
			return 1;
		} else {
			return 0;
		}
	});
}

function sortTitles(array) {
	array.sort((a, b) => {
		if (a.title.toLowerCase() < b.title.toLowerCase()) {
			return -1;
		} else if (a.title.toLowerCase() > b.title.toLowerCase()) {
			return 1;
		} else {
			return 0;
		}
	});
}

$.ajax({ url: './data/page-1.json' }).then((imageGallery) => {
	imageGallery.forEach((imageJSONObject) =>
		hornImages.push(new HornImage(imageJSONObject, 'page1'))
	);
	hornImages.forEach((image) => image.renderWithMustache());
	hornImages.forEach((currentItem) => {
		keywords.unshift(currentItem.keyword);

		if (keywords.includes(currentItem.keyword, 1)) {
			keywords.shift();
		}
	});

	filterOptions(keywords);
});

$.ajax({ url: './data/page-2.json' }).then((imageGallery) => {
	imageGallery.forEach((imageJSONObject) =>
		hornImages.push(new HornImage(imageJSONObject, 'page2'))
	);
	hornImages.forEach((image) => image.renderWithMustache());
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
		const $newFilterOption = $('#keyword-filter').find('#keyword-top').clone();
		$newFilterOption.text(keyword);
		$newFilterOption.attr('value', keyword);
		$newFilterOption.removeAttr('id', 'keyword-top');

		$('#keyword-filter').append($newFilterOption);
	});
}

$('#keyword-filter').on('change', function () {
	choice = $(this).val();
	$('.all').hide();
	$(`.${choice}`).show();
});

// $('#sort-by').on('change', function () {
// 	let sortChoice = $(this).val();
// 	if (sortChoice === 'horns') {
// 		sortHorns(hornImages);
// 	}
// 	if (sortChoice === 'title') {
// 		sortTitles(hornImages);
// 	}
// 	$('ul').empty();
// 	hornImages.forEach((image) => image.renderWithMustache());
// 	$('.all').hide();
// 	$(`.${choice}`).show();
// });

$('button:nth-of-type(1) button:nth-of-type(2)').on('click', (e) => {
	$('div').hide();
	if (e.target.textContent === 'Page 1') {
		pageShown = 1;
	}
});

$('#photo-template').hide();
