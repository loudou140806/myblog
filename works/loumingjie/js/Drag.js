function drag(id){
	
	var oDiv=document.getElementById(id);

	oDiv.onmousedown=function(ev){

		var oEvent=ev||event;
		
		var disX=oEvent.clientX-oDiv.offsetLeft;
		var disY=oEvent.clientY-oDiv.offsetTop;

		if(oDiv.setCapture)
		{
			oDiv.onmousemove=fnMove;
			oDiv.onmouseup=fnUp;
			oDiv.setCapture();
		}
		else
		{
				document.onmousemove=fnMove;
				document.onmouseup=fnUp;
		}

		document.onmousemove=fnMove;
		document.onmouseup=fnUp;
	function fnUp(){
		this.onmousemove=null;
		this.onmouseup=null;
		if(this.releaseCapture)
		{
			oDiv.releaseCapture();
		}
	}
	function fnMove(ev){

			var oEvent=ev||event;

			var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;

			oDiv.style.left=oEvent.clientX-disX+'px';
			oDiv.style.top=oEvent.clientY-disY+'px';

			var l=oDiv.offsetLeft;
			var t=oDiv.offsetTop;

			if(l<0){
				oDiv.style.left=0+'px';
			} 
			if(t<0){
				oDiv.style.top=0+'px';
			}

			if(l>document.documentElement.clientWidth-oDiv.offsetWidth){
				oDiv.style.left=document.documentElement.clientWidth-oDiv.offsetWidth+'px';
			}

			if(t>document.documentElement.clientHeight+scrollTop-oDiv.offsetHeight){
				oDiv.style.top=document.documentElement.clientHeight+scrollTop-oDiv.offsetHeight+'px';
			}
			
	}
	return false;
	};
}