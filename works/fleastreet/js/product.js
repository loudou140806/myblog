window.onload = function(){
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

	/*放大镜特效*/
		var magnifier=document.getElementById('magnifier');
		var oMark=getByClass(magnifier, 'mark')[0];
		var oFloat=getByClass(magnifier, 'float_layer')[0];
		var oBig=getByClass(magnifier, 'big_pic')[0];
		var oSmall=getByClass(magnifier, 'small_pic')[0];
		var aImg=oBig.getElementsByTagName('img');
		var oSmallPicBox = document.getElementsByClassName('small_pic_box')[0];
		var oThumb = $('.thumb')[0];
		var aThumbPic = oThumb.getElementsByTagName('li');
		var iNow = 0;

		for(i=0;i<aThumbPic.length;i++){
			aThumbPic[0].style.border = '1px solid #FF4A6D';
			aThumbPic[i].index = i;
			aThumbPic[i].onmouseover = function(){	
				iNow = this.index;
				oSmallPicBox.style.marginLeft = -iNow*481+'px';
				for(i=0;i<aThumbPic.length;i++){
					aThumbPic[i].style.border = 'none';
					aImg[i].style.display = 'none';
				}
				this.style.border = '1px solid #FF4A6D';
				aImg[iNow].style.display = 'block';
			};
		}
		oMark.onmouseover=function ()
		{	
			oFloat.style.display='block';
			oBig.style.display='block';
		};
		oMark.onmouseout=function ()
		{
			oFloat.style.display='none';
			oBig.style.display='none';
		};
		
		oMark.onmousemove=function (ev)
		{

			var oEvent=ev||event;
			var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
			var l=oEvent.clientX-magnifier.offsetLeft-oSmall.offsetLeft-oFloat.offsetWidth/2;
			var t=oEvent.clientY+scrollTop-magnifier.offsetTop-oSmall.offsetTop-oFloat.offsetHeight/2;
			
			if(l<0)
			{
				l=0;
			}
			else if(l>oMark.offsetWidth-oFloat.offsetWidth)
			{
				l=oMark.offsetWidth-oFloat.offsetWidth;
			}
			
			if(t<0)
			{
				t=0;
			}
			else if(t>oMark.offsetHeight-oFloat.offsetHeight)
			{
				t=oMark.offsetHeight-oFloat.offsetHeight;
			}
			
			oFloat.style.left=l+'px';
			oFloat.style.top=t+'px';
			
			var percentX=l/(oMark.offsetWidth-oFloat.offsetWidth);
			var percentY=t/(oMark.offsetHeight-oFloat.offsetHeight);
			
			aImg[iNow].style.left=-percentX*(aImg[iNow].offsetWidth-oBig.offsetWidth)+'px';
			aImg[iNow].style.top=-percentY*(aImg[iNow].offsetHeight-oBig.offsetHeight)+'px';
		};
		function getByClass(oParent, sClass)
		{
			var aEle=oParent.getElementsByTagName('*');
			var aTmp=[];
			var i=0;
			
			for(i=0;i<aEle.length;i++)
			{
				if(aEle[i].className==sClass)
				{
					aTmp.push(aEle[i]);
				}
			}
			
			return aTmp;
		}
};