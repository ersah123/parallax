(function($) {

    $.fn.parallax = function( options ) {
		// Establish our default settings
        var settings = $.extend({
            speed     : 3,
            direction : 'down'
        }, options);
		
        return this.each( function() {
			
			// requestAnimationFrame prefixer
		var scroll = window.requestAnimationFrame ||
			 window.webkitRequestAnimationFrame ||
			 window.mozRequestAnimationFrame ||
			 window.msRequestAnimationFrame ||
			 window.oRequestAnimationFrame ||
			 // IE Fallback, you can even fallback to onscroll
			 function(callback){ window.setTimeout(callback, 1000/30) };
			
			//variables
			 var item = $(this),
				scrollAmount = $(window).scrollTop(),
				top = item.offset().top,
				height = item.outerHeight(),
				parallaxAmount = (((scrollAmount+window.outerHeight) - top)/settings.speed);

				//scroll event for updating variable values
				$(window).on('scroll',function(){
					top = item.parent().offset().top;
					height = item.parent().outerHeight();
					scrollAmount = $(window).scrollTop();
					parallaxAmount = (((scrollAmount+window.outerHeight) - top)/settings.speed);
					if (settings.direction == "up"){
						parallaxAmount = parallaxAmount*(-1);
					}
				});

			//loop
			var prevScroll = $(window).scrollTop();
			
			var animator = function () {
				if (prevScroll != scrollAmount){
					item.each(function(){
						if (scrollAmount+window.outerHeight > top && scrollAmount < top+height && window.outerWidth > 1200){
						 this.style.transform = 'translate3d(0,'+parallaxAmount+'px,0)';
						 this.style.OTransform = 'translate3d(0,'+parallaxAmount+'px,0)';
						 this.style.msTransform = 'translate3d(0,'+parallaxAmount+'px,0)';   
						 this.style.MozTransform = 'translate3d(0,'+parallaxAmount+'px,0)';
						 this.style.WebkitTransform = 'translate3d(0,'+parallaxAmount+'px,0)';
						}
					});
					prevScroll = $(window).scrollTop();
				}
				
				scroll(animator);
			};
			
			function backgroundAdjust(height){
				if(window.outerWidth > 1200) {
					item.height(height);
					if(item.outerHeight() < item.parent().outerHeight()){
						item.height('100%');
					}
				} else {
					item.height('100%');
					item.css('transform','none');
				}
			}
			
			var url = item.css('background-image').replace('url(', '').replace(')', '').replace("'", '').replace('"', '').replace('"', '');
			var bgImg = $('<img />');
			bgImg.hide();
			var imgHeight;
			bgImg.bind('load', function(){
				imgHeight = bgImg.outerHeight();
				backgroundAdjust(imgHeight);
				bgImg.remove();
			});
			
			$(window).on('resize', function(){
				backgroundAdjust(imgHeight);
			});

			item.append(bgImg);
			bgImg.attr('src', url);
			
			//parent item defaults
			item.parent().css({
				overflow:'hidden',
				position: 'relative'
			});

			//parallax item css styles
			if (settings.direction == 'down'){
				item.css({
					bottom : 0,
					top: 'auto'
				});
			} else {
				item.css({
					top : 0,
					bottom: 'auto'
				});
			}
			
           scroll(animator);
        });
    }

}(jQuery));
