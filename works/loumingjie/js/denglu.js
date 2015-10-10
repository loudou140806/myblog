window.onload=function(){
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
};