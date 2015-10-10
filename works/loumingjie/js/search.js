
function loudou(data){

	var oUl=document.getElementById('ul_search');
	var html='';
	if(data.s.length){
		oUl.style.display = 'block';
		for(var i=0;i<data.s.length;i++){
			html += '<li><a target="_blank" href="http://www.baidu.com/s?wd='+data.s[i]+'">'+data.s[i]+'</a></li>';
		}
		oUl.innerHTML=html;
	}
	else{
		oUl.style.display='none';
	} 
}
	var oQ=document.getElementById('q');
	var oUl=document.getElementById('ul_search');

	oQ.onkeyup = function(){

		if(this.value!==''){

			var oScript=document.createElement('script');
			oScript.src='http://suggestion.baidu.com/su?wd='+this.value+'&cb=loudou';
			document.body.appendChild(oScript);
		}
		else{
			oUl.style.display='none';
		}
		return false;
	};
	oQ.onlcur=function(){
		oUl.style.display='none';
	};
	oQ.onfocus=function(){
		oUl.style.display='block';
	}

