---
layout: post
tags: requestAnimationFrame html5 animation
keys: requestAnimationFrame html5 animation
description: 现今实现动画的方式有很多，css3的animation+keyframes transition jQuery中的animationAPI的，如今又多了一个requestAnimationFrame能够让动画看起来更流畅，你还可以在CANVAS上实现动画，或者用原生的setInterval()和setTimeout()来实现动画，只不过这需要每秒60帧以上才能让肉眼看起来流畅。
title: HTML5运动函数requestAnimationFrame()
---

##初识requestAnimationFrame

这是<a href="https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame">MDN</a>上的解释
>The Window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint. The method takes as an argument a callback to be invoked before the repaint.

>window.requestAnimationFrame()函数告诉浏览器你希望执行一个动画，这要求你有一个指定的回调函数来周期性模拟动画，这个函数接受一个参数来作为回调函数，并且在下一个周期被调用。

回调函数现在执行的速率是每秒60次。他会慢慢和W3C要求的速率相匹配。为了有更好的表现，回调函数速率在执行背景选项卡或者隐藏的\<iframe\>s时应当适当降低

##语法

{% highlight js %}
window.requestAnimationFrame( callback );
{% endhighlight %}

###参数

callback
	一个指定的函数参数，用来执行你的动画，该函数有一个DOMHighResTimeStamp参数，它表明当requestAnimationFrame开始执行回调函数的实际时间(从 Performance.now()返回的值)表示

###返回值

一个长整型数，request id,他是一个非零值，但你对它没有其他值得假设。你只能通过window.cancelAnimationFrame()来取消回调请求。

###示例

{% highlight js %}
var start = null;
var element = document.getElementById("SomeElementYouWantToAnimate");

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  element.style.left = Math.min(progress/10, 200) + "px";
  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
{% endhighlight %}


###浏览器支持性

<img src="../images/work/2015-11-17/1.png" alt="requestAnimationFrame浏览器支持特性">

浏览器的支持性还不错