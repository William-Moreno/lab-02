'use strict';

const hornImages = [];


// TODO: Define constructor

function HornImage(jsonObject){
    this.image_url = jsonObject.image_url;
    this.title = jsonObject.title;
    this.description = jsonObject.description;
    this.keyword = jsonObject.keyword;
    this.horns = jsonObject.horns;
}


// TODO: Define prototype render method

HornImage.prototype.render = function(){
    const $newImageDiv = $('#photo-template').find('li').clone();
    
    $newImageDiv.find('h2').text(this.title);
    $newImageDiv.find('p').text(this.description);
    $newImageDiv.find('img').attr('src', this.image_url);
    
    $('#gallery').append($newImageDiv); 
};


// TODO: Use AJAX to get JSON file
$.ajax('../data/page-1.json', 'json').then(imageGallery => {
    imageGallery.forEach(imageJSONObject => hornImages.push(new HornImage(imageJSONObject)));
    hornImages.forEach(image => image.render());
});

//$('#photo-template').hide();



// TODO: Hide the template


