---
layout: post
title: JavaScript 高级技巧
tags: 高级函数 防篡改对象 密封对象 冻结对象 拖放 javascript
keys: 高级函数 防篡改对象 密封对象 冻结对象 拖放
description: JavaScript是一种极其灵活的语言，具有多种使用风格。一般来说，编写JacaScript要么使用过程方式，要么使用面向对象方式。然而由于它天生的动态属性，这种语言还能使用更为复杂有趣的模式。这些技巧要利用ECMAScript的语言特点、BOM扩展和DOM功能来获得强大的效果。
---

##高级技巧

###1高级函数

####安全类型的检测

{% highlight js %}
function isArray(value){
	return Object.prototype.toString.call(value) === "[object Array]";
}
function isFunction(value){
	return Object.prototype.toString.call(value) === "[object Function]";
}
function isRegExp(value){
	return Object.prototype.toString.call(value) === "[object RegExp]";
}
var isNativeJSON = window.JSON && Object.prototype.toString.call(JSON) === "[object JSON]"
{% endhighlight %}

在Web开发中能够区分原生与非原生对象很重要，因为只有这样才能确切知道某个对象到底有哪些功能。这个技巧对任何对象给出正确的结论。

####作用域安全的构造函数

构造函数其实就是一个使用new操作符调用的函数。当使用new调用时，函数内用到的this对象会指向新创建的对象实例。如果没有使用new、操作符直接调用构造函数，this会映射到全局对象window上，导致错误对象属性的意外增加。这时候需要一个作用域安全的构造函数：

{% highlight js %}
function Person(name, age, job){
	if( this instanceof Person ){
	this.name = name;
	this.age = age;
	this.job = job;
	}else{
		return new Person(name, age, job);
	}
}
{% endhighlight %}

>下面这段代码中，Polygon构造函数是作用域安全的，然而Rectangle构造函数则不是。新创建一个Rectangle实例之后，这个实例应该通过Poltgon.call()来继承Polygon的sides属性。但是，由于Poltgon构造函数作用域是安全的，this对象并非Poltgon的实例所以会创建并返回一个新的Polygon对象。Rectangle构造函数中的this对象并没有的到增长，同时Polygon.call()返回的值也米有用到，所以Rectagle实例终究不会有sides属性。

{% highlight js %}
function Polygon(sides){
	if(this instance of Polygon){
		this.sides = sides;
		this.getArea = function(){
			return 0;
		}else{
			return new Poltgon(sides);
		}
	}
}
function Rectangle(width,height){
	Polygon.call(this,2);
	this.width = width;
	this.height = height;
	this.getArea = function(){
		return this.width * this.height;
	}
}

var rect = new Rectangle(5, 10);
alert(rect.sides);	//undefined
{% endhighlight %}


结合使用原型链或者寄生组合则可以解决这个问题：

`Rectanle.prototype = new Polygon();`
`alert(rect.sides);//2`

####惰性载入函数

因为浏览器的差异，很多javascript代码包含了大量的if语句，将执行引导到正确的代码中。但是如果每次执行都要去判断，那么势必会使代码运行变慢。有两种实现惰性载入的方式，第一种事函数在第一次调用时，对函数本身进行二次处理，该函数会被覆盖为符合分支条件的函数，这样对原函数的调用就不用再经过执行的分支了，我们可以用下面的方式使用惰性载入重写createXHR();

{% highlight js %}
function createXHR(){
    var xhr=null;
    if(typeof XMLHttpRequest !='undefined'){
        xhr = new XMLHttpRequest();
        createXHR=function(){
            return new XMLHttpRequest();
        }
    }else{
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
            createXHR=function(){
                return new ActiveXObject("Msxml2.XMLHTTP");
            }
        }
        catch (e) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
                createXHR=function(){
                    return new ActiveXObject("Microsoft.XMLHTTP");
                }
            }
            catch (e) {
                createXHR=function(){
                    return null;
                }
            }
        }
    }
    return xhr;
}
{% endhighlight %}

第二种实现方式是在声明函数式就制订适当的函数。

{% highlight js %}
var createXHR = (function(){
    if(typeof XMLHttpRequest !='undefined'){
        return function(){
            return new XMLHttpRequest();
        }
    }else{
        try {
            return function(){
                return new ActiveXObject("Msxml2.XMLHTTP");
            }
        }
        catch (e) {
            try {
               return function(){
                    return new ActiveXObject("Microsoft.XMLHTTP");
                }
            }
            catch (e) {
                createXHR=function(){
                    return null;
                }
            }
        }
    }
})();
{% endhighlight %}

####函数绑定

{% highlight js %}
function bind(fn, context)}{
	return function(){
		return fn.apply(context, arguments);
	}
}
{% endhighlight %}

####函数柯里化

函数柯里化的基本方法和函数绑定是一样的。使用一个闭包返回一个函数，两者的区别在于，当函数被调用时，返回的函数还需要设置一些传入的参数。

{% highlight js %}
function curry(fn){
	var args = Array.prototype.slice.call(arguments, 1);
	return function(){
		var innerArgs = Array.prototype.slice.call(arguments);//这里的arguments是内部函数的参数
		var finalArgs = args.concat(innerArgs);
		return fn.apply(null, finalArgs);
	};
}
function add(num1, num2){
	returen num1 + num2;
}

var curriedAdd = curry(add, 5);
var curriedAdd = curry(add, 5, 12);
alert(curriedAdd(3)); //8
alert(curriedAdd()); //12
{% endhighlight %}


下面的例子中，handler.handleClick()方法接受了两个参数:要处理的元素的名字和event对象。作为第三个参数传递给bind()函数的名字，又被传递给了handler.handleClick()，而handler.handleClick()也会同时接收到event对象。

{% highlight js %}
function curry(fn, context){
	var args = Array.prototype.slice.call(arguments, 2);
	return function(){
		var innerArgs = Array.prototype.slice.call(arguments);//这里的arguments是内部函数的参数
		var finalArgs = args.concat(innerArgs);
		return fn.apply(context, finalArgs);
	};
}
var handler = {
	message: "Event handled",

	handleClick: function(name, event){
		alert(this.message + ":" + name + ":" + event.type);
	}
};
var btn = document.getElementById("my-btn");
Event.addHandler(btn, "click", bind(handler.handleClick, hanler, "my-btn"));
{% endhighlight %}

####防篡改对象

preventExtensions()函数可以阻止扩展，isExtensible()可以确定对象是否可以扩展。

{% highlight js %}
var person = {name: "loudou"};
Object.preventExtensions(person);

person.age = 29;
alert(person.age);//undefined
{% endhighlight %}

####密封对象

密封对象不可扩展，已有成员的[[Configurable]]特性会被设置为false。

{% highlight js %}
var person = {name: "loudou"};
Object.seal(person);

person.age = 29;
alert(person.age);//undefined

delete person.name;
alert(person.name);//"loudou"
{% endhighlight %}

####冻结对象

[[Writeable]]为false
{% highlight js %}
var person = {name: "loudou"};
Object.freeze(person);

person.age = 29;
alert(person.age);//undefined

delete person.name;
alert(person.name);//"loudou"

person.name = "gerg";
alert(person.name);//"loudou"
{% endhighlight %}

####拖放

{% highlight js %}
var  DragDrop = function(){
	
	var dragging = null;
		diffX = 0;
		diffY = 0;

	function handleEvent(event){

		//获取时间和目标
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);

		//确定事件类型
		switch(event.type){
			case "mousedown":
			if(target.className.indwxOf("draggable") > -1){
				dragging = target;
				diffX = event.clientX - target.offsetLeft;
				diffY = event.clientY - target.offsetTop;
			}
			break;

			case "mousemove":
			if(dragging !== null){
				dragging.style.left = (event.clientX - diffX) + "px";
				dragging.style.top = (event.clientY - diffY) + "px";
			}
			break;

			case "mouseup":
				dragging = null;
				break;
		}
	}
	return {
		enable: function(){
			Event.addHandler(document, "mousedown", handleEvent);
			Event.addHandler(document, "mousemove", handleEvent);
			Event.addHandler(document, "mouseup", handleEvent);
		}

		disable: function(){
			Event.removeHandler(document, "mousedown", handleEvent);
			Event.removeHandler(document, "mousemove", handleEvent);
			Event.removeHandler(document, "mouseup", handleEvent);
		}
	}
}();
{% endhighlight %}