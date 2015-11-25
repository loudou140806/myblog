function getByClass(oParent, oTag, oClass) {
	var aEle = oParent.getElementsByTagName(oTag);
	var arr = [];
	var re = new RegExp("(^|\\s)"+ oClass +"(\\s|$)");

	for(var i = 0, len = aEle.length; len--; i++){
		if (re.test(aEle[i].className)){
			arr.push(aEle[i]);
		}
	}
	return arr;
}

// 城市切换
function tab(oName) {
		for (var i = 0; i < oName.length; i++) {
			oName[i].onclick = function() {
				for (var j = 0; j < oName.length; j++) {
					oName[j].className = '';
				}
			this.className = 'active';
			};
		}
}

// 选项卡
function trigle(trigles, option_con){

		trigles.each(function(index){

			var ele = $(this);

			ele.click(function(){
				$(this).parent().find('li').each(function(){
					$(this).removeClass('active');
				});

				$(this).parent().parent().find('.' + option_con).each(function(){
					$(this).removeClass('active');
				});
			trigles.each(function(){
				$(this).find('i').removeClass('trigle_down_red').addClass('trigle_down_gray');
			});
			ele.find('i').removeClass('trigle_down_gray').addClass('trigle_down_red');
			ele.addClass('active');
			ele.parent().parent().find('.' + option_con).eq(index).addClass('active');
			});
		});
	}
window.onload = function() {

	// 城市切换
	(function nav(){

		var oNav = document.getElementById('nav');
		var aLi = oNav.getElementsByTagName('li');

		for(var i = 0,len = aLi.length; len--; i++) {
			aLi[i].index = i;
			aLi[i].style.backgroundPosition = ''+ (-66 * i) +'px 0px';
			aLi[i].onmouseover = function() {
				this.style.backgroundPosition  = ''+ (-66 * this.index) +'px -70px';
			};
			aLi[i].onmouseout = function() {
				this.style.backgroundPosition  = ''+ (-66 * this.index) +'px 0px';
			};
		}
	}());

	// nav按钮背景图切换
	(function city(){

		var aCity = $('.header_city a');

		tab(aCity);
	}());

	// search选项卡切换
	(function search_tab(){
		 
		var oSearch = document.getElementById('search'); 
		var oSearch_nav = getByClass(oSearch, 'ul', 'nav')[0];
		var aLi = oSearch_nav.getElementsByTagName('li');

		tab(aLi);
	}());

	// 透明遮罩
	(function shade() {
		var hot_people = $('.hot_people_list li');

		hot_people.each(function(){
			var ele = $(this);
			var shade = ele.find('.shade');
			ele.mouseover(function(){
				shade.css("display", "block");
			}).mouseout(function(){
				shade.css("display", "none");
			});
		});
	}());

	(function(){

		var oOption_nav = $('.option_nav li');
		var oOption_nav2 = $('.option_nav2 li');
		var oKnow_guys_nav = $('.know_guys .nav li');

		trigle(oOption_nav, 'option_con');
		trigle(oOption_nav2, 'con');
		trigle(oKnow_guys_nav, 'con');
	}());

	(function bbs() {
		var oBbs = $('.bbs li');

		oBbs.each(function() {
			$(this).mouseover(function(){
				$(this).parent().find('li').each(function(){
					$(this).removeClass('active');
				});
				$(this).addClass('active');
			});
		});
	}());

	(function imgTab() {

		var oRecommend = $('.recommend ol li');

		oRecommend.each(function(index){

			$(this).click(function(){
				oRecommend.each(function(){
					$(this).removeClass('active');
				});
				$(this).addClass('active');

				$(this).parent().prev().find('li').each(function(){
					$(this).css('display', 'none');
				}).eq(index).css('display', 'block');
			});
		});
	}());

};