---
layout: post
title: 函数调用的四种方式
tags: function this
keys: 函数调用
---

##方法调用

作为某个对象的一个方法来调用

{% highlight js %}
var obj = {
  fn:function(){
    alert("called!");
  }
}
obj.fn();//注意这个.，就是方法调用的标志
{% endhighlight %}

注意此时this指向obj

##函数调用：

作为一个函数来调用

`var rdm = Math.random();`

此时this指向全局对象，浏览器里面一般是window
当函数内部进行函数调用的时候，this应该指向外层函数的this才对（这样可以通过this共享一些东西，来实现函数和自己的内部函数的交互）
但是js却没有这么做……算是个bug，解决方案：

{% highlight js %}
functon foo(a, b){
  this.a = a;
  this.b = b;
  var _this = this;//通过局部变量缓存了当前的this

  var handle = function (){
    return _this.a + _this.b;
  }
}
{% endhighlight %}

##构造器调用：

用new关键字来新建一个函数对象的调用

{% highlight js %}
var fn = function (status){
     console.log(this);
    this.status = status;
}
fn.prototype.get_status = function(){
    return this.status;
}
{% endhighlight %}

var test = new fn("my status");//这里，this指向new出来的对象
console.log(test.get_status);//这种将代码返回的行为真是……
alert(test.get_status);
这里的get_status，会返回此函数的toString……
也即是：函数用new方式调用时，返回值若不为对象，则返回this

##apply/call调用：

{% highlight js %}
foo.apply(this, args);
foo.call(null, param1, param2[, param3...]);//第1个参数传null的时候，js引擎会托管this至全局，浏览器中一般是window
{% endhighlight %}