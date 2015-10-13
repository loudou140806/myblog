---
layout: post
description: 
title: 鼠标滚轮事件
---

##鼠标滚轮事件

###9个鼠标事件。

- click
- dblclick
- mousedown
- mouseenter
- mouseleave
- mousemove
- mouseout
- mouseover
- mouseup

页面所有元素都支持鼠标事件，除了mouseenter和mouseleave其他事件都会冒泡，也可以被取消。但是取消鼠标事件将会影响浏览器的默认行为。取消鼠标事件的默认行为还会影响其他事件，因为鼠标事件和其他事件是密不可分的关系。

###客户区坐标位置

- clientX鼠标相对视口的left值
- clientY鼠标相对视口的top值

{% highlight js %}

var div = document.getElementById("myDiv");
EventUtil.addHandler(div, "click", function(event){
	event = EventUtil.getEvent(event);
	alert("Client coordinates:" + event.clientX + "," + event.clientY);
})

{% endhighlight %}

###页面坐标位置

- pageX鼠标相对页面本身的left值
- pageY鼠标相对页面本身的top值

页面没有滚动的时候，pageX和pageY的值与clientX和clientY的值相同。
IE8以及更早的本本不支持事件对象上的页面坐标，但是可以用客户区坐标和滚动信息计算出来，这个时候需要用到document.body（混杂模式）和document.documentElement（标准模式）中的scrollTop和scrollLeft。

###屏幕坐标位置

-screenX相对于整个电脑屏幕的left
-screenY相对于整个电脑屏幕的top

###修改键

按下鼠标时键盘上的某些键的状态可以影响到所要采取的操作。这些修改键就是Shift、Ctrl、Alt、Meta（window键）。DOM为此规定了4个属性，表示这些怒修改件的状态：shiftKey、ctrlKey、altKey、metaKey。属性中都包含一个布尔值，当鼠标事件发生时通过检测这几个属性就可以确定用户是否同时按下了其中的键。

{% highlight js %}

var div = docuemt.getElementById("div")
EventUtil.addHandler(div, "click", function(event){
	event = EventUtil.getEvent(event);
	var keys = new Array();

	if(event.shift){
		key.push("shift")
	}
	if(event.alt){
		key.push("alt")
	}
	if(event.ctrl){
		key.push("ctrl")
	}
	if(event.meta){
		key.push("meta")
	}
	alert("keys:"+ keys.join(','));
})
{% endhighlight %}

###相关元素

在发生mouseover和mouseout事件是还会涉及到更多元素。对于mouseover主目标就是移入光标的元素，而相关元素就是失去光标的元素，对于mouseout则刚好相反。DOM通过event的relateTarget属性提供了相关元素的信息。
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
		}
	}	
}
{% endhighlight %}
可以像下面这样使用EventUtil.getRelateTarget()方法：

{% highlight js %}

var div = document.getElementById("div");
EventUtil.addHandler(div, "click", function(event){
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	var relateTarget = EventUtil.getRelateTarget(event);
	alert("moused out of" + target.tagName + "to" + relatedTarger.tagName);
})

{% endhighlight %}


###鼠标按钮

在鼠标被单击时触发click事件，对于mousedown和mouseup事件来说，其event对象存在一个button属性，表示按下或者释放的按钮。button属性有3个值：0表示主鼠标按钮，1表示滚轮按钮，2表示次鼠标按钮

IE8之前也有button属性

- 0：表示没有按下按钮
- 1：表示按下了主鼠标按钮
- 2：表示按下了次鼠标按钮
- 3：表示同时按下了主、次鼠标按钮
- 4：表示按下了中间的鼠标按钮
- 5：表示同时按下了住鼠标按钮和中间的鼠标按钮
- 6：表示同时按下了次鼠标按钮和中间的鼠标按钮
- 7：表示同时按下了3个按钮

下面是跨浏览器代码：

{% highlight js %}
	var EventUtil = {

	//省略代码
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
	}

}
{% endhighlight %}

###鼠标滚轮事件

当用户通过鼠标滚轮与页面交互、在垂直方向上滚动页面是，就会触发mousewheel事件，可以在任何元素上触发，最终冒泡到document和window对象。mousewheel事件对象还包含一个特殊的wheelDelta属性，向前滚动时，wheelDelta是120的倍数，向后滚动时，wheelDelta是-120的倍数。注意在opera的9.5版本之前，这个值是相反的。

FireFox支持一个名为DOMMouseScroll的类似事件。相关属性被包含在detail属性当中，向前则是-3的倍数，向后则是3的倍数。

取得滚轮增量值得方法：

{% highlight js %}

var EventUtil = {
	
	getWheelDelta: function(){
		if(event.wheelDelta){
			return(client.engine.opera && client.engine.opera<9.5?-event.wheelDelta:event.wheelDelta);
		}else{
			return -Event.detail * 40;
		}
	}

}

{% endhighlight %}

有了这个方法之后，就可以将相同的事件处理程序制定为mousewheel和DOMMouseScroll事件了：

{% highlight js %}

	(function(){

		function handleMouseWheel(event){
			event = EventUtil.getEvent(event);
			var delta = Event.getWheelDelta(event);
			alert(delta)
		}

		EventUtil.addHandler(document, "mousewheel", handleMouseWheel);
		EventUtil.addHandler(document, "DOMMouseWheel", handleMouseWheel);

		})();

{% endhighlight %}

###触摸设备

面向iPhone和iPod的Safari开发是要记住一下几点

- 不支持dblclick事件。双击只会放大画面，没有办法改变该行为。
- 轻击可单击元素会触发mousemove事件
- mousemove会触发mouseover和mouseout事件
- 两个手指放在屏幕上且页面岁手指移动而滚动式会触发mousewheel和scroll事件


##键盘与文本事件

用户在使用键盘是会触发键盘事件。有3个键盘事件，简述如下：

- keydown：当用户按下键盘上的任意键触发，如果不放会重复触发。
- keypress:当用户按下键盘上的字符键触发，如果不放也会重复触发。
- keyup:当用户释放键盘上的按键时触发。
- textInput：在文本插文本框之前会触发textInput事件。

###键码《javascript高级程序设计》P380

常用：
- 退格：		8
- 制表：		9
- 回车：		13
- shift:		16
- ctrl:		17
- esc：		27
- 左箭头：	37
- 上箭头：	38
- 右箭头：	39
- 下箭头：	40


###字符编码 

在keypress事件发生时包含一个charCode属性，这个值是按下的那个键所代表字符的ASCII编码。此时的keyCode通常等于0或者也可能等于所按键的键码。IE8和opera则保存的是字符的ASCII码值。

{% highlight js %}

var EventUtil = {
	getCharCode: function(event){
		if(typeof event.charCode =='number'){
		return event.charCode;
		}else{
		return event.keyCode;
		}
	}
}

{% endhighlight %}

###textInput事件

keypress和textInput的区别在于，keypress对于任何可以获得焦点的元素都能触发，而textInput只在可编辑区域才会触发，并且textInput只会在输入实际字符才会被触发，但是keypress事件则在按下哪些能够影响文本显示的按键时也会触发（例如退格键）。ItextInput事件的event对象中还包含一个data属性，这个属性的值就是用户输入的字符。