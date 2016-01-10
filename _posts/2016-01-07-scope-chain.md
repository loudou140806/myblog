---
layout: post
title: 理解作用域和作用域链
description: 对于任何程序来说，都有其执行的作用域，所谓的作用域，即函数或者变量的有效范围。作用域代表了函数的执行环境以及生命周期而作用域链则是函数对象内部[[scope]]属性中包含的函数被创建的作用域中对象的集合。该属性在ECMA-262第三版中定义。
keys: scope-chain
tags: scope-chain
---

##作用域

任何程序设计语言都有作用域的概念，简单的说，作用域就是变量与函数的可访问范围，即作用域控制着变量与函数的可见性和生命周期。在JavaScript中，变量的作用域有全局作用域和局部作用域两种。

###1. 全局作用域（global scope）

包括以下三种情况：
(1).在最外层函数外部定义的变量和函数拥有全局作用域。

{% highlight js %}
var globalVar = '全局变量'
function doSomething() {
	var name = '局部变量';

	alert(globalVar);

	function each() {
		alert(name);
	}
}
alert(globalVar);// '全局变量'
each();// undefined
doSomething();// '全局变量'
alert(name);// undefined
{% endhighlight %}

(2). 在函数中申明未使用var的变量拥有全局作用域

{% highlight js %}
function doSomething() {
	var name = '局部变量'
	globalVar = '全局变量'
}
alert(globalVar);// '全局变量'
alert(name);// 脚本错误
{% endhighlight %}

(3).window.name此类变量也是全局变量

{% highlight js %}
function doSomething() {
	var name = '局部变量'
	window.student = 'loudou'
}
alert(name);// 脚本错误
alert(student);// 'loudou'
{% endhighlight %}

###2.局部作用域

{% highlight js %}
function doSomething() {
	var name = '局部变量'
	window.student = 'loudou'
	function inner() {
		alert(name);
	}
	inner();
}
inner();// 脚本错误
alert(name);// 脚本错误
alert(student);// 'loudou'
dosonething();// 局部变量
{% endhighlight %}

在javascript权威指南里有这么一句话:javascript函数运行在他们被定义的作用域中，而不是他们被执行的作用域中;
下面来看一个例子：

{% highlight js %}
var name = 'laruence';
  function echo() {
       alert(name);
  }

  function env() {
       var name = 'eve';
       echo();
  }

  env();
{% endhighlight %}
这个充分证明了javascript权威指南当中的这句话的正确性

让我们再来看一个例子：
{% highlight js %}
var name = 'loudou';
function a() {
	alert(name);
	var name = 'mingjie'
	alert(name);
	alert(age);
}

a();
{% endhighlight %}

也许很多人会认为答案是
{% highlight js %}
'loudou'
'mingjie'
error:age is not defined
{% endhighlight %}

其实不然，正确的答案应该是
{% highlight js %}
'undefined'
'mingjie'
error:age is not defined
{% endhighlight %}

因为在函数执行的时候，a函数作用域链组成为{window的活动对象}->{a的活动对象}，
在a的活动对象中已经找到标识符name，所以没有再顺着作用域连向上查找了;
{% highlight js %}
[[scope chain]] = [
{
	name: undefined,
},{
	window call object
}
]
{% endhighlight %}

综合上面的只是，来看一个稍微复杂一点的例子：
{% highlight js %}
function factory() {
     var name = 'laruence';
     var intro = function(){
          alert('I am ' + name);
     }
     return intro;
}
 
function app(para){
     var name = para;
     var func = factory();
     func();
}
 
app('eve');
{% endhighlight %}

调用app时，它的作用域链为
{% highlight js %}
[[scope chain]] = 
[{
	para: 'eve',
	arguments: [],
	name: undefined,
	func: undefined
},{
	window call object
}]
{% endhighlight %}
当调用factory函数时调用时，它的作用域链为
{% highlight js %}
[[scope chain]] = 
[{
	name: undefined,
	intro: undefined
},{
	window call object
}]
{% endhighlight %}
intro定义时时，作用域链为
{% highlight js %}
[[scope chain]] = 
[{
	name: 'laruence',
	intro: undefined
},{
	window call object
}]
{% endhighlight %}
intro返回时，作用域链为
{% highlight js %}
[[scope chain]] = 
[{
	intro call object	
},{
	name: 'laruence',
	intro: undefined
},{
	window call object
}]
{% endhighlight %}
func调用时，作用域链为
{% highlight js %}
[[scope chain]] = 
[{
	intro call object	
},{
	factory call object
},{
	name: 'laruence',
	intro: undefined
},{
	window call object
}]
{% endhighlight %}