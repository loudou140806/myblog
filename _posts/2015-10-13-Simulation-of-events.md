---
layout: post
title:模拟事件
description: DOM中的事件模拟，包括模拟鼠标事件，模拟键盘事件，模拟HTML事件，自定义DOM事件，IE中的事件模拟
keyword： 事件模拟 createEvent MouseEvents krybordEvent MutationEvents CustomEvent createEventObject
---

##模拟事件

>所谓事件，就是网页中某个特别值得关注的瞬间。事件经常有用户操作或通过浏览器功能来触发。但很少有人知道，也可以使用javaScript在任意时刻来触发特定的事件，此时的事件就如同浏览器创建的事件一样。

###DOM中的事件模拟

>可以在document对象上使用`createEvent()`方法创建event对象。该方法接受一个参数，即表示要创建的事件类型的字符串。

- UIEvents:一般化的UI事件。鼠标事件和键盘事件都继承自UI事件。DOM3中是UIEvent。
- MouseEvents：一般化的鼠标事件。DOM3中为MouseEvent。
- MutationEvents:一般化的DOM变动事件。DOM3中是MutationEvent。
- HTMLEvents： 一般化的HTML事件。没有对应的DOM3事件

>创建了event对象之后，还需要使用与事件有关的信息进行初始化，这与`createEvent()`中传入的字符有关。

####模拟鼠标事件

》createEvent("MouseEvents").返回的对象有一个名为initMouseEvent()的方法。它有十五个参数如下，用以制订与该鼠标事件有关的信息。

- type(字符串): 表示要触发的事件类型，例如（"click"）
- bubbles(布尔值)：表示时间是否应该冒泡。一般为true。
- cancelable(布尔值):表示时间是否可以取消。一般为true。
- view(AbstractView):与事件关联的视图。设置为document.defaultView。
- detail(整数)：与事件有关的详细信息。
- screenX(整数)：事件相对于屏幕的X坐标。
- screenY(整数)：事件相对于屏幕的Y坐标。
- clientX(整数)：事件相对于视口的X坐标。
- clientY(整数)：事件相对于视口的Y坐标。
- altkey(布尔值):表示是否按下了alt键。默认值为false。
- shiftkey(布尔值):表示是否按下了shift键。默认值为false。
- ctrlkey(布尔值):表示是否按下了ctrl键。默认值为false。
- metakey(布尔值):表示是否按下了meta键。默认值为false。
- button(整数)：表示按下了哪一个鼠标键。默认值为0。
- relateTarget(对象)：表示与事件相关的对象。只在mouseover和mouseout中使用

{% highlight js %}

	var btn = document.getElementById("mybtn");

	//创建事件对象
	var event = document.createEvent("MouseEvents");

	//初始化event对象
	event.initMouseEvent("click", true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

	//触发事件
	btn.dispatchEvent(event);

{% endhighlight %}

####模拟键盘事件

>DOM3级规定createEvent传入"KeyboardEvent"就可以创建一个键盘事件，返回的对象会包含一个initKeyEvent()方法，接收如下参数：

- type(字符串): 表示要触发的事件类型例如（"keydown"）
- bubbles(布尔值)：表示时间是否应该冒泡。一般为true。
- cancelable(布尔值):表示时间是否可以取消。一般为true。
- view(AbstractView):与事件关联的视图。设置为document.defaultView。
- key(布尔值):表示按下的键的键码。
- location(整数):表示按下了哪里的键。0表示默认主键盘，1表示左，2表示右，3表示数字键盘，4表示移动设备，5表示手柄。
- modifiers(字符串)：空格分隔的修改件列表，如"shift"。
- reprat(整数)：在一行中按了按键多少次。

{% highlight js %}

	var textbox = document.getElementById("myTextbox"),
	event;

	//以DOM3级方式创建事件对象
	if(document.implemetation.hasFeature("KeyboardEvents", "3.0")){
		event = document.createEvent("KeyboardEvents");
	}

	//初始化event对象
	event.initKeyboardEvent("keydown", true, true, document.defaultView, "a", 0, "shift", 0);

	//触发事件
	textbox.dispatchEvent(event);

{% endhighlight %}

>在Firefox中createEvent()中传入"KeyEvents"就可以创建一个键盘事件。返回的对象会包含一个initKeyEvent()方法，接收如下10个参数：

- type(字符串): 表示要触发的事件类型，例如（"click"）
- bubbles(布尔值)：表示时间是否应该冒泡。一般为true。
- cancelable(布尔值):表示时间是否可以取消。一般为true。
- view(AbstractView):与事件关联的视图。设置为document.defaultView。
- altkey(布尔值):表示是否按下了alt键。默认值为false。
- shiftkey(布尔值):表示是否按下了shift键。默认值为false。
- ctrlkey(布尔值):表示是否按下了ctrl键。默认值为false。
- metakey(布尔值):表示是否按下了meta键。默认值为false。
- keyCode(整数):被按下或释放的键的键码。默认为0，对keydown和keyup有用。
- charCode(整数):通过安检生成的字符的ASCII编码。这个参数对keypress事件有用，默认值为0。

>将创建的evnet对象传入到dispatchEvent()方法就可以触发键盘事件。在Firefox上运行下面的代码，会在指定文本框中输入字母A。

{% highlight js %}

	var textbox = document.getElementById("myTextbox"),

	//只适用于Firefox
		var event = document.createEvent("KeyEvents");

	//初始化event对象
	event.initKeyEvent("keypress", true, true, document.defaultView, fasle, false, false, false, 65, 65);

	//触发事件
	textbox.dispatchEvent(event);

{% endhighlight %}

>在其他浏览器中则需要创建一个通用事件，然后向事件对象中添加键盘事件特有的信息。

{% highlight js %}

	var textbox = document.getElementById("myTextbox"),

	//创建时间对象
		var event = document.createEvent("Events");

	//初始化event对象
	event.initEvent(type, bubbles, cnacelable);
	event.view = document.defaultView;
	event.altKey = flase;
	event.ctrlKey = false;
	event.shiftKey = false;
	event.metaKey = false;
	event.keyCode = 65;
	event.charCode = 65;
	
	//触发事件
	textbox.dispatchEvent(event);

{% endhighlight %}

####模拟其他事件

>虽然鼠标和键盘是在浏览器中经常模拟的事件，单有时候同样需要模拟变动事件和HTML事件。模拟变动事件，用的是"MutationEvents",createEvent后返回一个包含initMutationEvent()方法的变动事件对象。这个方法接收的参数包括8个：type、bubbles、cancelable、relateNode、preValue、attrName、attrChange。下面是一个例子模拟DOMNodeInserted事件：

{% highlight js %}

var event = document.createEvent("MutationEvents");
event.initMutationEvent("MDOMNodeInserted", true, false, someNode, "", "", "", 0);
target.dispatchEvent(event);   

{% endhighlight %}

>模拟HTML事件，同样需要先创建一个event对象，通过createEvent("HTMLEvents")，再使用这个对象的initEvent()方法来初始化它即可。


{% highlight js %}

var event = document.createEvent("HTMLEvents");
event.initMutationEvent("focus", true, false);
target.dispatchEvent(event);   

{% endhighlight %}


####自定义DOM事件

>调用createEvent("CustomEvent"),返回一个initCustomEvent()方法，接收4个参数：

- type(字符串): 表示要触发的事件类型例如（"keydown"）
- bubbles(布尔值)：表示时间是否应该冒泡。
- cancelable(布尔值):表示时间是否可以取消。
- detail(对象)：任意值，保存在event对象的detail属性中。

{% highlight js %}

var div = document.getElementById("myDiv"),
	event;

	EventUtil.addHandler(div, "myevent", function(event){
		alert("DIV:" + event.detail);
	})
	EventUtil.addHandler(document, "myevent", function(event){
		alert("DOCUMENT:" + event.detail);
	})
	if(document.implementation.hasFeature("CustomEvents", "3.0")){
		event = document.createEvent("CustomEvent");
		event.initCustomEvent("myevent", true, false, "Hello World!");
		div.dispatchEvent(event);
	}

{% endhighlight %}

###IE中的模拟事件

>IE8之前的版本中的模拟事件与在DON中模拟时间的思路相似：先创建event对象，然后为其指定相应的信息，然后再使用该对象来触发事件。

>调用document.createEventObject()方法可以在IE中创建event对象。与DOM方法不同的是它不接受参数，只能手工添加信息，最后调用fireEvent()，接受2个参数：事件处理程序的名称和event对象。调用fireEvent的时候会自动添加srcElement和type属性。下面是一个为IE添加模拟click事件过程。

{% highlight js %}

var btn = document.getElmentById("mybtn");

//创建事件对象
var event = docuemnt.createEventObject();

//初始化事件对象
event.screenX = 100;
event.screenY = 0;
event.clientX = 0;
event.clientY = 0;
event.ctrlKey = false;
event.altKey = false;
event.shiftKey = false;
event.button = 0;

//触发事件
btn.fireEvent("onclick", event);

{% endhighlight %}

>keypress也可以模拟

{% highlight js %}

var btn = document.getElmentById("mybtn");

//创建事件对象
var event = docuemnt.createEventObject();

//初始化事件对象

event.ctrlKey = false;
event.altKey = false;
event.shiftKey = false;
event.keyCode = 65;

//触发事件
btn.fireEvent("onkeypress", event);

{% endhighlight %}