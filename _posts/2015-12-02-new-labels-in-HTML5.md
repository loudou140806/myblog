---
layout: post
keys: HTML5
tags: HTML5
title: HTML5中新增的标签和废除的标签
---
##新增的结构标签

- section元素 
	表示页面中的一个内容区块,比如章节、页眉、页脚或页面的其他部分。可以和h1、 h2……等元素结合起来使用，表示文档结构。例：HTML5中<section>……</section>;HTML4中<div> ……</div>。
- article元素 
	表示页面中一块与上下文不相关的独立内容。比如一篇文章。
- aside元素 
	表示article元素内容之外的、与article元素内容相关的辅助信息。
- header元素 
	表示页面中一个内容区块或真个页面的标题。
- hgroup元素 
	表示对真个页面或页面中的一个内容区块的标题进行组合。
- footer元素 
	表示整个页面或页面中一个内容区块的脚注。一般来说，他会包含创作者的姓名、创作日期以及创作者的联系信息。
- nav元素 
	表示页面中导航链接的部分。
- figure元素 
	表示一段独立的流内容，一般表示文档主体流内容中的一个独立单元。使用figcaption元素为figure元素组添加标题。例如： 
{% highlight js %}
<figure> 
<figcaption>PRC</figcaption> 
<p>The People's Republic of China was born in 1949</p> 
</figure> 
HTML4中常写作 
<dl> 
<h1>prc</h1> 
<p>The People's Republic of China was born in 1949</p> 
</dl>
{% endhighlight %}

##新增的其他元素

- video元素 
	定义视频。像电影片段或其他视频流。例：<video src="movie.ogg" controls="controls">video元素</video> 
	HTML4中写法： 
{% highlight js %}
<object type="video/ogg" data="move.ogv"> 
  <param name ="src" value="movie.ogv"> 
</object>
{% endhighlight %}

- audio元素 
	定义音频。如音乐或其他音频流。例：<audio src ="someaudio.wav">audio元素</audio> 
html4中写法： 
{% highlight js %}
<object tyle="application/ogg" data="someaudio.wav"> 
  <param name ="src" value= "someaudio.wav"> 
</object>
{% endhighlight %}

- embed元素 
	用来嵌入内容(包括各种媒体)。格式可以是Midi、Wav、AIFF、AU、MP3,flash等。例：<embed src="flash.swf" /> 
	HTML4中代码示例:
{% highlight js %}
<object data="flash.swf" type="application/x-shockwave-flash"><object>
{% endhighlight %}

- mark元素 
	主要用来在视觉上向用户呈现哪些需要突出显示或高亮显示的文字。典型应用搜索结果中高亮显示搜素关键字。 
	HTML5<mark></mark>;HTML4 <span></span>。
- progress元素 
	表示运行中的进程，可以使用progress元素显示JavaScript中耗时时间函数的进程。等待中……、请稍后等。<progress></progress>。
- time元素 
	表示日期或时间，也可以两者同时。
- ruby元素 
	定义 ruby 注释（中文注音或字符）。 
	与 <ruby> 以及 <rt> 标签一同使用。ruby 元素由一个或多个字符（需要一个解释/发音）和一个提供该信息的 rt 元素组成，还包括可选的 rp 元素，定义当浏览器不支持 "ruby" 元素时显示的内容。 
<ruby> 
  漢 <rt><rp>(</rp>ㄏㄢˋ<rp>)</rp></rt> 
</ruby>
- rt元素 
	定义字符（中文注音或字符）的解释或发音。
- rp元素 
	在 ruby 注释中使用，以定义不支持 ruby 元素的浏览器所显示的内容。
- wbr元素 
	表示软换行。与br元素的区别：br元素表示此处必须换行；wbr表示浏览器窗口或父级元素足弓宽时（没必要换行时），不换行，而宽度不够时主动在此处换行。
- canvas元素 
	定义图形，比如图表和其他图像。<canvas> 元素只是图形容器（画布），必须使用脚本来绘制图形。 
{% highlight js %}
<canvas id="myCanvas"></canvas><script type="text/javascript"> 
var canvas=document.getElementById('myCanvas'); 
var ctx=canvas.getContext('2d'); 
ctx.fillStyle='#FF0000'; 
ctx.fillRect(0,0,80,100); 
</script>
{% endhighlight %}

- command元素——貌似没什么效果。是不是支持有问题 
	表示命令按钮，比如单选按钮、复选框或按钮。只有当 command 元素位于 menu 元素内时，该元素才是可见的。否则不会显示这个元素，但是可以用它规定键盘快捷键。。 
{% highlight js %}
<menu> 
<command onclick="alert('Hello World')"> 
Click Me!</command> 
</menu>
{% endhighlight %}

- details标签 目前只有 Chrome 支持 details 标签 
	用于描述文档或文档某个部分的细节 。 可与 summary 标签配合使用，summary可以为 details 定义标题。标题是可见的，用户点击标题时，会显示出 details。summary应该是details的第一个子元素。

- datalist标签 
	定义选项列表。请与 input 元素配合使用该元素，来定义 input 可能的值。datalist 及其选项不会被显示出来，它仅仅是合法的输入值列表。使用 input 元素的 list 属性来绑定 datalist。 
{% highlight js %}
<input id="myCar" list="cars" /> 
<datalist id="cars"> 
  <option value="BMW"> 
  <option value="Ford"> 
  <option value="Volvo"> 
</datalist>
{% endhighlight %}

- datagrid标签 如何用？ 
	定义可选数据的列表。datagrid 作为树列表来显示。 如果把 multiple 属性设置为 true，则可以在列表中选取一个以上的项目。

- keygen标签 如何用? 
	标签规定用于表单的密钥对生成器字段。当提交表单时，私钥存储在本地，公钥发送到服务器。
{% highlight js %}
<form action="demo_keygen.asp" method="get"> 
Username: <input type="text" name="usr_name" /> 
Encryption: <keygen name="security" /> 
<input type="submit" /> 
</form>
{% endhighlight %}

- output标签 
	定义不同类型的输出，比如脚本的输出。 
{% highlight js %}
<form action="form_action.asp" method="get" name="sumform"> 
<output name="sum"></output> 
</form>
{% endhighlight %}
- source标签 
	标签为媒介元素（比如 <video> 和 <audio>）定义媒介资源。
- menu标签 
定义菜单列表。当希望列出表单控件时使用该标签。注意与nav的区别，menu专门用于表单控件。 
{% highlight js %}
<menu> 
<li><input type="checkbox" />Red</li> 
<li><input type="checkbox" />blue</li> 
</menu>
{% endhighlight %}

##新增input标签

- email 
	必须输入email
- url 
	必须输入url地址
- number 
	必须输入数值
- range 
	必须输入一定范围内数值
- Date Pickers（日期选择器） 
	拥有多个可供选取日期和时间的新输入类型： 
	date - 选取日、月、年 
	month - 选取月、年 
	week - 选取周和年 
	time - 选取时间（小时和分钟） 
	datetime - 选取时间、日、月、年（UTC 时间） 
	datetime-local - 选取时间、日、月、年（本地时间）
- search 
	用于搜索域，域显示为常规的文本域。
- color