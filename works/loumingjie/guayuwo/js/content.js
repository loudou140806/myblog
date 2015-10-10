window.onload = function(){
	function getClass(oPar,sClass){
		var aEle=oPar.getElementsByTagName('*');
		var re=new RegExp('\\b'+sClass+'\\b','i');	
		var arr=[];
		for(var i=0;i<aEle.length;i++){
			if(re.test(aEle[i].className)){
				arr.push(aEle[i]);	
			}
		}
		return arr;
	}
//瀵艰埅涓嬮潰缁胯壊灏忔潯鐨勬粦杩�
	var aNav = document.getElementById('nav');
	var aNavLi = aNav.getElementsByTagName('li');
	var aBtn = aNav.getElementsByTagName('a');
	var oXt = document.getElementById('xt');
	var oMainList=document.getElementById("main");
	var iH=document.documentElement.clientHeight;

	var num = 0;
	
	for( var i=0; i<aNavLi.length; i++ ){
		aNavLi[i].index = i;
		aNavLi[i].onmouseover = function(){			
			oXt.style.left = this.offsetLeft -63 + 'px';
			oXt.style.left = this.index*aNavLi[0].offsetWidth+52+'px';
			
			
		};
		aNavLi[i].onmouseout = function(){
			oXt.style.left = this.offsetWidth*num + 52 + 'px';	
					
		};
		//鐐瑰嚮瀵艰埅璁╁畠鍥哄畾鍦ㄦ煇涓綅缃�
		aNavLi[i].onclick = function(){
			num=this.index;	
			for(var i=0; i<aNavLi.length; i++){
				aBtn[i].style.color='';
			}
				aBtn[this.index].style.color='#3fb560';
		};
	};
	
//////浣滃搧闆嗙殑鍒囨崲鐨勬晥鏋�
	var aProduct = document.getElementById('product_con');
	var oBar = document.getElementById('bar');
	var aProLi = oBar.getElementsByTagName('li');
	var aList = getClass(aProduct,'list');
	
	for(var i=0; i<aProLi.length; i++){
		aProLi[i].index = i;
		aProLi[i].onclick = function(){
			for(var i=0; i<aProLi.length; i++){
				aProLi[i].className = '';
				aList[i].className = 'list hide';
			};
			this.className = 'click';
			aList[this.index].className = 'active';
		}
	};
//婊氬姩鏃剁殑杩愬姩鏁堟灉
	var iTimer = null;
	var oPhotoshopImg = document.getElementById('photoshop_img');
	var oPhotoshopCon = document.getElementById('photoshop_con');
	var oHtmlcssCon = document.getElementById('Htmlcss_con');
	var oHtmlcssImg = document.getElementById('Htmlcss_img');
	var oJsCon = document.getElementById('js_con');
	var oJsImg = document.getElementById('js_img');
	var oPersonalCon = document.getElementById('Personal_con');
	var oWenziyi = document.getElementById('wenziyi');
	var oWenzier = document.getElementById('wenzier');
	var oVisit = getClass(oMainList,'visit')
	
	function Mtop(obj){
		var oImg=obj.getElementsByTagName('img')[0];
		move(oImg, 'top', 10, 500,'backOut');
	}
	//banner涓婃枃瀛楃殑杩愮敤
	move(oWenziyi, 'top', 320, 1500,'backOut');
	move(oWenzier, 'bottom', 235, 1500,'backOut');

	window.onscroll = function() {
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(scrollTop<200){
			move(oXt, 'left', 50, 300,'easeOut');
		}
		if(scrollTop>200 && scrollTop<800){
			move(oXt, 'left', 210, 300,'easeOut');
		}
		//ps
		if(scrollTop>1000 && scrollTop<1500 ){
			move(oPhotoshopImg, 'left', 50, 1200,'backOut');
			move(oPhotoshopCon, 'right', 100, 1500,'backOut');
			move(oXt, 'left', 370, 300,'easeOut');
		}
		////html杩愬姩鐨勬晥鏋�
		if(scrollTop>1600 && scrollTop<2100 ){
			move(oXt, 'left', 530, 300,'easeOut');
			move(oHtmlcssImg, 'top', 77, 1500,'backOut');
			move(oHtmlcssCon, 'left', 160, 900,'elasticIn');
		};
		////js杩愬姩鐨勬晥鏋�
		if(scrollTop>2300 && scrollTop<2800 ){
			move(oJsImg, 'bottom', 50, 800,'bounceIn');
			move(oJsCon, 'right', 170, 1500,'backOut');
			move(oXt, 'left', 690, 300,'easeOut');
		};
		////涓汉绠€浠嬭繍鍔ㄧ殑鏁堟灉
		if(scrollTop>3000 && scrollTop<3430 ){
			Move(oPersonalCon, {left : 177})
			move(oXt, 'left', 850, 300,'easeOut');
		};
		if(scrollTop>3600 ){
			move(oXt, 'left', 1010, 300,'easeOut');
		}
		//娆㈣繋璁块棶鐨�
		if(scrollTop>=1300 ){
			Mtop(oVisit[0])
		};
		if(scrollTop>=1900 ){
			Mtop(oVisit[1]);
		};
		if(scrollTop>=2700 ){
			Mtop(oVisit[2]);
		};
	}
	
};