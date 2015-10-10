function loudou(data) {
	
	var oUl = document.getElementById('ul_search');
	var html = '';
	if (data.s.length) {
		oUl.style.display = 'block';
		for (var i=0; i<data.s.length; i++) {
			html += '<li><a target="_blank" href="http://www.baidu.com/s?wd='+data.s[i]+'">'+ data.s[i] +'</a></li>';
		}
		oUl.innerHTML = html;
	} else {
		oUl.style.display = 'none';
	}
	
}
window.onload=function(){
	
	//登录
	var oHead=document.getElementById('head');
	var oLoginBtn=document.getElementById('loginBtn');
	var oRegBtn=document.getElementById('regBtn');
	var oCloseBtn=document.getElementById('close');
	var oCloseBtn2=document.getElementById('close2');
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	drag('login');
	drag('login2');

	var oLogin=document.getElementById('login');
	var oLogin2=document.getElementById('login2');

	oLoginBtn.onclick=function(){

		oLogin.style.left=document.documentElement.clientWidth/2-oLogin.offsetWidth/2+'px';
		oLogin.style.top=document.documentElement.clientHeight/2-oLogin.offsetHeight/2+'px';
		startMove(oLogin2,{opacity:0});
		startMove(oLogin,{opacity:100});
		return false;
	};

	oRegBtn.onclick=function(){
		oLogin2.style.left=document.documentElement.clientWidth/2-oLogin.offsetWidth/2+'px';
		oLogin2.style.top=document.documentElement.clientHeight/2-oLogin.offsetHeight/2+'px';
		startMove(oLogin,{opacity:0});
		startMove(oLogin2,{opacity:100});
		return false;
	};	

	oCloseBtn.onclick=function(){
		startMove(oLogin,{opacity:0});
		return false;
	};	
	oCloseBtn2.onclick=function(){
		startMove(oLogin2,{opacity:0});
		return false;
	};	


	var oDiv=document.getElementById('move');
	var oPic=document.getElementById('pic');
	var aPic=oPic.getElementsByTagName('img');
	var aBtn=document.getElementById('btn').getElementsByTagName('li');
	var oLianxi=document.getElementById('lianxi');
	var aImg=oLianxi.getElementsByTagName('img');
	var oTab_nav=document.getElementById('tab_nav');
	var aTab_nav=oTab_nav.getElementsByTagName('li');
	var oTab=document.getElementById('tab');
	var aTab=oTab.getElementsByTagName('ul');
	var aTab_li=oTab.getElementsByTagName('li');
	var oCloud=document.getElementById('cloud');
	var aLi_cloud=oCloud.getElementsByTagName('li');
	var oTuwen=document.getElementById('tuwen');
	var aLi_tuwen=oTuwen.getElementsByTagName('li');
	var iNow=0;
	var iNow2=0;
	var oWidth=aPic[0].offsetWidth;
	var timer=null;

	
	//轮播图
	oPic.onmouseover=function(){
		clearInterval(timer);
	};
	oPic.onmouseout=function(){
		auto();
	};
	auto();
	for(i=0;i<aPic.length;i++)
	{	
		aBtn[i].index=i;
		aBtn[i].onclick=function(){
			clearInterval(timer);
			iNow=this.index;
			iNow2=this.index;
			change(this.index);
			auto();
			return false;
		}
	}
	function change(num){
		startMove(oPic,{marginLeft:-num*oWidth},function(){
			if(iNow===0)
			{
				aPic[0].style.position='static';
				oPic.style.marginLeft=0;
				iNow2=0;
			}		
		});

		for(i=0;i<aPic.length;i++)
		{	
			aBtn[i].className='';
		}
		aBtn[iNow].className='active';
	}

	function auto(){
			timer=setInterval(function(){

			if(iNow==aPic.length-1)
			{	
				aPic[0].style.position='relative';
				aPic[0].style.left=aPic.length*oWidth+'px';
				iNow=0;
			}
			else
			{
				iNow++;
			}
			iNow2++;
			change(iNow2);
		},4000);
	}

	//图文推荐
	for(i=0;i<aLi_tuwen.length;i++){
		aLi_tuwen[i].index=i;
		aLi_tuwen[i].onmouseover=function(){
			aLi_tuwen[this.index].style.background='pink';
		};
		aLi_tuwen[i].onmouseout=function(){
			aLi_tuwen[this.index].style.background='';
		}
	}
	//标签云
	for(i=0;i<aLi_cloud.length;i++){
		oMath=parseInt(Math.random()*999);
		aLi_cloud[i].style.background='#'+(oMath)+'';
		aLi_cloud[i].style.transition='0.3s';
		aLi_cloud[i].index=i;
		aLi_cloud[i].onmouseover=function(){
			aLi_cloud[this.index].style.borderRadius=0;
			aLi_cloud[this.index].style.textShadow='2px 2px #999';
		};
		aLi_cloud[i].onmouseout=function(){
			aLi_cloud[this.index].style.borderRadius='5px';
			aLi_cloud[this.index].style.textShadow='';
		};
	}
	//lianxi 
	for(var i=0;i<aImg.length;i++){
		aImg[i].index=i;
		aImg[i].onmouseover=function(){
			this.src='img/ico_0'+(this.index+4)+'.png';
		};
		aImg[i].onmouseout=function(){
			this.src='img/ico_0'+(this.index+4)+'_1.jpg';
		};
	}
	//search
	// var oQ=document.getElementById('q');
	// var oUl_search=document.getElementById('ul_search');

	// oQ.onkeyup = function(){

	// 	if(this.value !=''){

	// 		var oScript=document.createElement('script');
	// 		oScript.src='http://suggestion.baidu.com/su?wd='+this.value+'&cb=loudou';
	// 		document.body.appendChild(oScript);
	// 	}
	// 	else{
	// 		oUl_search.style.display='none';
	// 	}
	// 	return false;
	// };

	var oQ = document.getElementById('q');
	var oUl = document.getElementById('ul_search');
	document.onclick=function(){
		oUl.style.display='none';
	};
	oQ.onfocus=function(){
		oUl.style.display='block';
	};
	oQ.onkeyup = function() {
		
		if ( this.value !== '' ) {
			var oScript = document.createElement('script');
			oScript.src = 'http://suggestion.baidu.com/su?wd='+this.value+'&cb=loudou';
			document.body.appendChild(oScript);
		} else {
			oUl.style.display = 'none';
		}

		return false;
		
	}
	
	//选项卡
	for(i=0;i<aTab_nav.length;i++){
		aTab_nav[i].index=i;
		aTab_nav[i].onmouseover=function(){
			for(i=0;i<aTab_nav.length;i++){
				aTab_nav[i].className='';
				aTab[i].className='clear';
			}
			aTab_nav[this.index].className='on';
			aTab[this.index].className='clear active';
		}
	}
	for(i=0;i<aTab_li.length;i++){
		aTab_li[i].style.background='url(img/ph2.png) '+0+'px '+(-40*(i%6)+10)+'px no-repeat';
	}
}