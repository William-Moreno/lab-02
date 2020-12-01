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
    const $newImageDiv = $('#photo-template').find('div').clone();
    
    $newImageDiv.find('h2').text(this.title);
    $newImageDiv.find('p').text(this.description);
    $newImageDiv.find('img').attr('src', this.image_url);
    
    $('#gallery').append($newImageDiv); 
};


// TODO: Use AJAX to get JSON file

// TODO : Make an image out of each JSON object

// TODO: Call and render each image

// TODO: Hide the template


