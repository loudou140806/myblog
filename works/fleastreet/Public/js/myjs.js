window.onload = function(){
	/*侧出*/
	var oContentNavLeft = document.getElementById('content-nav-left');
	var aContentNavLeft = oContentNavLeft.getElementsByTagName('li');
	var aContentNavLeftHide = document.getElementsByClassName('content-nav-left-hide');
	var iNow = 0;
	for(var i=0;i<aContentNavLeft.length;i++){
		aContentNavLeft[i].index = i;
		aContentNavLeft[i].onmouseover = function(){
			for(i=0;i<aContentNavLeft.length;i++){
				aContentNavLeft[i].style.borderRight = '2px solid #FF4A6D';
			}
			this.style.backgroundColor = '#fff';
			this.style.borderRight = 'none';
			this.style.borderTop = '2px solid #FF4A6D';
			this.style.borderLeft = '2px solid #FF4A6D';
			this.style.borderBottom = '2px solid #FF4A6D';
			aContentNavLeftHide[this.index].style.display = 'block';
		};
		aContentNavLeft[i].onmouseout = function(){
			for(i=0;i<aContentNavLeft.length;i++){
				aContentNavLeft[i].style.border = '1px solid #999';
			}
			this.style.borderRight = '1px solid #999';
			this.style.borderTop = '1px solid #999';
			this.style.borderLeft = '1px solid #999';
			this.style.borderBottom = '1px solid #999';
			aContentNavLeftHide[this.index].style.display = 'none';
		}
	}
	/*搜索吸顶,回到顶部显示*/
	var oSearch = document.getElementById('search');

	window.onscroll = function(){
		var oTop = document.documentElement.scrollTop||document.body.scrollTop;
		if(oTop>52){
			oSearch.style.zIndex = 2;
			oSearch.style.position = 'fixed';
			var oLeft = (document.documentElement.clientWidth - oSearch.offsetWidth)/2;
			oSearch.style.left = oLeft +'px';
			oSearch.style.top = '-58px';
		}
		else{
			oSearch.style.position = 'static';
		}

	};

	/*回到顶部*/
	(function(a){a.fn.scrollToTop=function(c){var d={speed:800};c&&a.extend(d,{speed:c});return this.each(function(){var b=a(this);a(window).scroll(function(){100<a(this).scrollTop()?b.fadeIn():b.fadeOut()});b.click(function(b){b.preventDefault();a("body, html").animate({scrollTop:0},d.speed)})})}})(jQuery);
	(function($) {
	    $.fn.scrollToTop = function(options) {
	        var config = {
	            "speed" : 800
	        };

	        if (options) {
	            $.extend(config, {
	                "speed" : options
	            });
	        }

	        return this.each(function() {

	            var $this = $(this);

	            $(window).scroll(function() {
	                if ($(this).scrollTop() > 100) {
	                    $this.fadeIn();
	                } else {
	                    $this.fadeOut();
	                }
	            });

	            $this.click(function(e) {
	                e.preventDefault();
	                $("body, html").animate({
	                    scrollTop : 0
	                }, config.speed);
	            });

	        });
	    };
	})(jQuery);
	$(function() {
	    $("#toTop").scrollToTop();
	});
};