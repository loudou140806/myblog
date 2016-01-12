---
layout: post
description: 构造函数，也就是很多书里经常讲的constructor，不要以为它很难懂，其实，它很简单
title: 构造函数学习笔记
keys: constructor
tags: constructor
---

###什么是构造函数

简单的理解,一个函数或者说一个对象的constructor属性就是构造函数

{% highlight js %}
function Foo() {};
var f = new Foo();
console.log(f.constructor);// Foo
{% endhighlight %}

上面的例子不难看出，f.constructor就是Foo，也就是说Foo就是f的构造函数。所以说什么是构造函数呢，就是那些可以产生实例的函数。默认的规则是构造函数的首字母为大写。

继续往下看，其实Foo也是由构造函数生成的一个实例，不信我们试试：

{% highlight js %}
function Foo() {};
var f = new Foo();
console.log(f.constructor);// Foo
console.log(Foo.constructor);// Function
console.log(Function.constructor);// Function
console.log(Object.constructor);// Function
console.log(Array.constructor);// Function
console.log(Boolean.constructor);// Function
console.log(String.constructor);// Function
console.log(Number.constructor);// Function
{% endhighlight %}

可以看到，Foo的构造函数是function Funciton() {},而Function的构造函数还是Function本身，甚至Object,Array,Boolean,String,Number的构造函数都是Function，也就是说，这些构造函数又都是Function构造函数的一个实例，到这里，发现构造函数的源头就是function Function(){},因为甚至连他自己也是自己创造的。

###prototype和constructor

前面讲到过原型（prototype），原型也是一个对象，那么原型有constructor属性么，答案是肯定的，让我们通过代码来看看：

{% highlight js %}
function Foo() {}
var foo = new Foo();// 这里的foo是没有prototype属性的，我不知道为什么还在求解当中看了segmentfault
					//上面的解释说只有函数对象的prototype才有实际意义
console.log(Foo.prototype.constructor === Foo);// true
console.log(Function.prototype.constructor === Function);// true
console.log(Object.prototype.constructor === Object);// true
console.log(f.contstructor.prototype === Foo.prototype);// true
console.log(Foo.constructor.prototype === Function.prototype);// true
console.log(Function.constructor.prototype === Function.prototype);// true
console.log(Function.constructor.prototype === Object.prototype);// false
console.log(Object.constructor.prototype === Function.prototype);// true
console.log(Function.constructor.prototype === Object.prototype);// fasle
{% endhighlight %}

可见，一个对象的prototype属性的构造函数constructor还是指向该对象的,那么f.contstructor.prototype === Foo.prototype又是怎么回事？很简单啊，因为f.constructor不就是等于Foo么，所以f.contstructor.prototype 哪有不等于Foo。prototype的道理。最后的四行也似乎说明了我上面说的那句话，一切函数的构造函数的终点都是function Function() {}函数。

最后用一个例子来总结

{% highlight js %}
// 构造函数
function Foo(y) {
  // 构造函数将会以特定模式创建对象：被创建的对象都会有"y"属性
  this.y = y;
}
 
// "Foo.prototype"存放了新建对象的原型引用
// 所以我们可以将之用于定义继承和共享属性或方法
// 所以，和上例一样，我们有了如下代码：
 
// 继承属性"x"
Foo.prototype.x = 10;
 
// 继承方法"calculate"
Foo.prototype.calculate = function (z) {
  return this.x + this.y + z;
};
 
// 使用foo模式创建 "b" and "c"
var b = new Foo(20);
var c = new Foo(30);
 
// 调用继承的方法
b.calculate(30); // 60
c.calculate(40); // 80
 
// 让我们看看是否使用了预期的属性
 
console.log(
 
  b.__proto__ === Foo.prototype, // true
  c.__proto__ === Foo.prototype, // true
 
  // "Foo.prototype"自动创建了一个特殊的属性"constructor"
  // 指向a的构造函数本身
  // 实例"b"和"c"可以通过授权找到它并用以检测自己的构造函数
 
  b.constructor === Foo, // true
  c.constructor === Foo, // true
  Foo.prototype.constructor === Foo // true
 
  b.calculate === b.__proto__.calculate, // true
  b.__proto__.calculate === Foo.prototype.calculate // true
 
);
{% endhighlight %}
<img data-original="{{site.url}}/images/post/2016-1-11/3.png" alt="SuperType和prototype的关系">
上述图示可以看出，每一个构造函数object都有一个prototype. 构造函数Foo也拥有自己的__proto__, 也就是Function.prototype, 而Function.prototype的__proto__指向了Object.prototype. 