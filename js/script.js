$(document).ready(function(){

	$('.slider').owlCarousel({

		navigation : true,
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem: true
	});

	getImages('');

	if($('html').hasClass('ie8-9')) {

		$('.plitka').masonry({
			itemSelector: '.plitka__item',
			columnWidth: function() {

				var widthPx = $('.plitka__item').css('width');
				var width = parseInt(widthPx, 10);
	    		return width;
	    	},
			gutterWidth: 20
		});
	} 
	else {

		$('.plitka').masonry({
			itemSelector: '.plitka__item',
			columnWidth: '.plitka__item',
			gutter: 20
		});
	};

	$('#search-button').on('click', function() {

		var query = $('#search-input').val();

		getImages(query);
	});
});

function getImages(query) {

	var API_KEY = '3641906-bd8c312699f00fe3b3eac5cd0';

	if ($('html').hasClass('ie8-9')) {

		var URL = 'https://pixabay.com/api/?key='+API_KEY+'&q='+query+'&image_type=photo&orientation=horizontal&per_page=7&callback=?';
	}
	else {

		var URL = 'https://pixabay.com/api/?key='+API_KEY+'&q='+query+'&image_type=photo&orientation=horizontal&per_page=7';
	}

	$.getJSON(URL, function(data) {

        $.each(data.hits, function(i, hit){

        	var title = hit.tags.split(',');

        	$('.plitka__item').eq(i).html('<img class="plitka__item-img" src='+hit.webformatURL+'/><div class="plitka__item-title">'+title[0]+'</div>');
        });
	});
};
