---
layout: post
title: HTML5自定义属性data-*和jQuery.data详解
tags: HTML5 data jQuery 博客搭建
keywords: HTML5 data jQuery 博客搭建
description: 新的HTML5标准允许你在普通的元素标签里，嵌入类似data-*的属性，来实现一些简单数据的存取。它的数量不受限制，并且也能由javascript动态修改，也支持CSS选择器进行样式设置。这使得data属性特别灵活，也非常强大。有了这样的属性我们能够更加有序直观的进行数据预设或存储。下面介绍HTML5 Dataset 存储的实际应用，以及包括jQuery在内的四种存取方式。
---

新的HTML5标准允许你在普通的元素标签里，嵌入类似data-*的属性，来实现一些简单数据的存取。它的数量不受限制，并且也能由javascript动态修改，也支持CSS选择器进行样式设置。这使得data属性特别灵活，也非常强大。有了这样的属性我们能够更加有序直观的进行数据预设或存储。下面介绍HTML5 Dataset 存储的实际应用，以及包括jQuery在内的四种存取方式。

##HTML5 Dataset 存储的例子

为一个元素分配data属性存储数据，例如这是一个span元素，它的内容是一首音乐的名称，我们为其HTML标签里直接预置这首歌的更多信息，在HTML源码上看起来可以这样来写：

{% highlight js %}
<span id="music-latch" class="musique"

data-date="2013"

data-genre="Electronic"

data-album="Settle (Deluxe)"

data-artist="Disclosure"

data-composer="Howard Lawrence & Guy Lawrence">

Latch (feat. Sam Smith)

</span>
{% endhighlight %}

这样，我们就很简单的为这首歌在span标签里直接内嵌了其专辑、艺术家和流派信息。
再举一个例子，比如说一个本地化翻译的嵌入：

{% highlight js %}
<h2 id="food-pkd" class="food"

data-en="Peking Duck"

data-available

data-ja="北京ダック"

data-fr="Canard laqué de Pékin"

data-de="Pekingente">

北京烤鸭

</h2>
{% endhighlight %}

这样一来，在不改变网页外观的情况下，我们可以在设定机器翻译的同时检测data-XX，来人工提供更准确精准的翻译。
其中data-available没有值，允许空值，例如在这个情况下，它仅代表该食物可以订购，所以不需要有值。

##利用 getAttribute、setAttribute 存取 dataset

作为HTML元素的标签，dataset的存取也服从getAttribute、setAttribute，而且这两个方法兼容性也最广。
例如对于上面的两个例子，我们可以运行

{% highlight js %}
//get

var album = document.getElementById("music-latch").getAttribute("data-album");

console.log(album);

//set

document.getElementById("food-pkd").setAttribute("data-en","Beijing Stuffed Duck");
{% endhighlight %}

这样就可以以一种更兼容的方式，来存取dataset数据。所做出的任何更改，都是可以实时反映到元素data属性上的。

但是这种方法比较低端，如果遇到多个data-*自定义字段，想要一次全部获取所有的data属性并包装成对象的话，还必须做一个循环，很麻烦。不过我们还有Dataset API可用。

##利用 dataset API 存取 dataset

通过.dataset API，我们可以更方便的获取元素的所有data字段，并以对象的方式，方便存取和遍历。例如，对于上面的例子，可以运行

{% highlight js %}
//get

var songd = document.getElementById("music-latch").dataset;

var album = songd.album;

console.log(album);

//set

document.getElementById("food-pkd").dataset.en = "Beijing Stuffed Duck";

//add

document.getElementById("food-pkd").dataset.es = "Pato laqueado a la pekinesa";
{% endhighlight %}

这时候我们在访问data时，就不需要"data-"关键词了，直接利用.dataset.name就可以访问到。这比上面的方法更方便。所做出的任何更改，都是可以实时反映到元素data属性上的。

如果涉及到连字符"-"，可以采取驼峰化的方法来存取：

{% highlight js %}
<span id="en" data-en-us="Peiking Duck"></span>
{% endhighlight %}

其中en-us要写成enUs：

{% highlight js %}
var en = document.getElementById("en").dataset.enUs;
{% endhighlight %}

##利用 jQuery.attr 方法存取 dataset

jQuery有着出色的兼容性。类似get、setAttribute，jQuery的.attr()方法同样可以用在这样的情况下，例如，对于上面的例子，可以运行

{% highlight js %}
window.jQuery && (function($){

//get

var album = $("#music-latch").attr("data-album");

console.log(album);

//set

$("#food-pkd").attr("data-en","Beijing Stuffed Duck");

})(window.jQuery);
{% endhighlight %}

这与jQuery.attr运用在其他属性上时的情况完全一样，并且所做出的任何更改，都是可以实时反映到元素data属性上的。

##利用 jQuery.data 方法存取 dataset

jQuery从1.4.2版本开始支持$.data()方法来直接访问data属性，同时也不需要写"data-"关键词了，例如，对于上面的例子，可以运行

{% highlight js %}
window.jQuery && (function($){

//get

var album = $("#music-latch").data("album");

console.log(album);

//set

$("#food-pkd").data("en","Beijing Stuffed Duck");

})(window.jQuery);
{% endhighlight %}

这样的方法也能出色的存取data属性，但是需要注意，jQuery.data对data数据做出的更改，不会反映到HTML元素data属性上。

也就是说，jQuery现在认为#food-pkd元素的data-en为"Beijing Stuffed Duck"，但是在HTML元素上，其值还是没有改变，仍为"Peking Duck"：

{% highlight js %}
window.jQuery && (function($){

//set

$("#food-pkd").data("en","Beijing Stuffed Duck");

console.log( $("#food-pkd").data("en") );

{% endhighlight %}