// jquery
$(document).ready(function(){
	var x = 0;
	var $whole_booklet = $("#whole_booklet");
	var $images	= $("#whole_booklet").find("img");

	$images.each(function(){
		var $p 	= $(this);
		// image source
		var src	= $p.attr("src");
		// if image has loaded correctly then prepare to output the book on the screen
		$("<img/>").load(function(){
			// x will increment by one
			++x;
			// when x increment is same as the number of images in the book, then output the whole booklet
			if(x == $("#whole_booklet").find("img").length){
				$("#next").show();
				$("#back").show();
				$whole_booklet.show().booklet({
					// size of the book
					width:              1000,
					height:             500,
					// How fast the page will flip
					speed:              500,
					// direction of book is going from left to right
					bookLTR:          'LTR',
					// next_page and page_before
					next:               $("#next"),
					prev:               $("#back"),

				});
			}
			// setting its src attribute to the original src attribute
		}).attr('src',src);
	});

});
