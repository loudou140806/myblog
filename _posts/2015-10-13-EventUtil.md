---
layout: post
title: EventUtil构造函数
---
{% highlight js %}
var EventUtil = {
	
	var EventUnil = {
		
		addHandler: function(element, type, handler){
			if(element.addEventListener){
				element.addEventListener(type, handler, false);
			}else if(element.attachEvent){
				element.attachEvent("on" + type, handler);
			}else{
				element["on" + type] = handler;
			}
		},

		getEvent: function(event){
			return event ? event || window.event;
		},

		getTarget: function(event){
			return event.target || event.srcElement;
		},

		preventDefault: function(){
			if(event.preventDefault){
				event.preventDefault();
			}else{
				event.returnValue = false;
			}
		},
		
		getRelateTarget: function(){
			if(event.relateTarget){
				return event,relateTarget;
			}else if(event.toElement){
				return event.toELement;
			}else if(event.fromElement){
				return event.fromElement;
			}else{
				retun null;
			}
		},

		removeHandler: funciton(element, type, handler){
			if(element.addEventListener){
				element.addEventListener(type, handler, false);
			}else if(element.attachEvent){
				element.attachEvent("on" + type, handler);
			}else{
				element["on" + type] = handler;
			}
		}，

		stoppropagation: function(event){
			if(event.stopPropagation){
				event.stopPropagation();
			}else{
				event.cancelBubble = true;
			}
		},

		getButton: function(event){
			if(document.implementation.hasFeature("MouseEvents","2.0")){
				return event.button;
			}else{
				switch(event.button){
					case 0:
					case 1:
					case 2:
					case 3:
					case 4:
						return 1;
					case 5:
					case 6:
						return 2;
					case 7:
						return 0;
				}
			}
		},

		getWheelDelta: function(){
			if(event.wheelDelta){
				return(client.engine.opera && client.engine.opera<9.5?-event.wheelDelta:event.wheelDelta);
			}else{
				return -Event.detail * 40;
			}
		},

		var EventUtil = {
			getCharCode: function(event){
				if(typeof event.charCode =='number'){
				return event.charCode;
				}else{
				return event.keyCode;
				}
			}
		}
	}	
}
{% endhighlight %}