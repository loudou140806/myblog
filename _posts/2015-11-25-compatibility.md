---
layout: post
title: 跨浏览器兼容
tags: IE6 IE7 firefox safri chrome
keys: IE6 IE7 firefox safri chrome
description: css常见兼容性问题（IE6,7）,PNG兼容性问题（IE6，7）
---
##CSS常见问题

###H5标签兼容(IE6,7)
动态创建自定义标签，如果是块级元素还要加`display:block`;

{% highlight js %}
	<script src="js/html5shiv.js"></script>
	<!--<script>
		document.createElement("header");
		document.createElement("section");
		document.createElement("footer");
	</script>-->
	<style>
		header{
			width: 200px;
			height: 200px;
			display: block;
			background-color: red;
		}
		section{
			width: 150px;
			height: 150px;
			display: block;
			background-color: yellow;
		}
		footer{
			width: 100px;
			height: 100px;
			display: block;
			background-color: blue;
		}
	</style>
</head>
<body>
	<header>header</header>
	<section>section</section>
	<footer>footer</footer>
</body>
{% endhighlight %}

或者使用成熟的js库`html5shiv.js`

###元素浮动之后,能设置宽度的话就给元素加宽度.如果需要宽度是内容撑开,就给它里边的块元素加上浮动(IE6)
{% highlight js %}
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
			.box{
				width: 400px;
				border: 1px solid black;
				overflow:hidden;
			}
			.left{
				float: left;
				background-color: red;
			}
			.right{
				float: right;
				background-color: blue;
			}
			h2{
				/* 不给h2加浮动时两个h2都会撑满一行 */
				float: left;
				margin: 0;
				height: 30px;
			}
		</style>
		<!--
			解决方案：float: left;
		-->
	</head>
	<body>
		<div class="box">
			<div class="left">
				<h2>左边</h2>
			</div>
			<div class="right">
				<h2>右边</h2>
			</div>
		</div>
	</body>
</html>
{% endhighlight %}

###第一块元素浮动,第二块元素加margin值等于第一块元素,在IE6下会有间隙问题(IE6)
{% highlight js %}
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
			body{
				margin: 0;
			}
			.box{
				width: 500px;
			}
			.left{
				width: 200px;
				height: 200px;
				background-color: red;
				float: left;
			}
			.right{
				width: 200px;
				height: 200px;
				/*margin-left:200px;*/
				background-color: blue;
				float: left;
			}
		</style>
		<!--
			解决方案：
				1、不建议这么写
				2、用浮动解决
		-->
	</head>
	<body>
		<div class="box">
			<div class="left"></div>
			<div class="right"></div>
		</div>
	</body>
</html>

{% endhighlight %}

###IE6下子元素超出父级宽高，会把父级的宽高撑开(IE6)
{% highlight js %}
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
			.box{
				width: 200px;
				height: 200px;
				border: 10px solid #000;
			}
			.content{
				width: 400px;
				height: 400px;
				background-color: red;
			}
		</style>
		<!--
			解决方案：
			不要让子元素的宽高超过父级
		-->
	</head>
	<body>
		<div class="box">
			<div class="content"></div>
		</div>
	</body>
</html>

{% endhighlight %}

###p 包含块元素嵌套规则(p,h标签,td标签不能再包含块元素否则会生成新标签占位置)
{% highlight js %}
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<p>
			<div>div</div>
		</p>
	</body>
</html>
{% endhighlight %}

###margin兼容性问题(margin-top传递，上下margin叠压)

<a href="http://blog.csdn.net/borishuai/article/details/8127758">涉及到BFC和haslayout的知识</a>

{% highlight js %}
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
			.box{
				background-color: green;
				overflow: hidden;
				zoom:1;
			}
			.item{
				height: 50px;
				background-color: red;
				margin-top: 50px;
			}
			.mt100{
				margin-top: 100px;
			}
		</style>
		<!--
			1、margin-top传递
				触发BFC、haslayout
			2、上下margin叠压
				尽量使用同一方向的margin，比如都设置top或者bottom，
		-->
	</head>
	<body>
		<div class="box">
			<div class="item"></div>
			<div class="item mt100"></div>
		</div>
	</body>
</html>
{% endhighlight %}

###display:inline-block不支持(IE6)
加hack
{% highlight js %}
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
			div{
				width: 100px;
				height: 100px;
				background-color: red;
				display: inline-block;
			/*	*display:inline;
				*zoom:1;*/
			}
		</style>
		<!--
			解决方案：
				*display:inline;
				*zoom:1;
		-->
	</head>
	<body>
		<div>div</div>
		<div>div</div>
		<div>div</div>
	</body>
</html>

{% endhighlight %}

###IE6 最小高度问题(IE6)
{% highlight js %}
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
			div{
				height: 1px;
				background-color: red;
				overflow: hidden;
			}
		</style>
		<!--
			IE6下最小高度19px
			解决方案：
			overflow:hidden;
		-->
	</head>
	<body>
		<div></div>
	</body>
</html>
{% endhighlight %}

###IE6双边距(IE6,7)
{% highlight js %}
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
			body{
				margin: 0;
			}
			.box{
				width: 750px;
				border: 1px solid #000;
				overflow: hidden;
			}
			.item{
				width: 200px;
				height: 200px;
				background-color: red;
				margin-left: 50px;
				float: left;
				*display: inline;
			}
		</style>
		<!--
			当元素浮动后再设置margin那么就会产生双倍边距
			解决方案：
				针对ie6、7添加display:inline
		-->
	</head>
	<body>
		<div class="box">
			<div class="item"></div>
			<div class="item"></div>
			<div class="item"></div>
		</div>
	</body>
</html>

{% endhighlight %}

###li里元素都浮动 li 在IE6 7  下方会产生4px间隙问题(IE6,7)
{% highlight js %}
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
			.list{
				margin: 0;
				padding: 0;
				list-style: none;
				width: 300px;
			}
			.list li{
				height: 30px;
				border: 1px solid red;
				line-height: 30px;
				*vertical-align: top;
			}
			.list li a{
				float: left;
			}
			.list li span{
				float: right;
			}
		</style>
		<!--
			解决方案：
				针对ie6，7添加vertical-align: top;
		-->
	</head>
	<body>
		<ul class="list">
			<li>
				<a href="">左边</a>
				<span>右边</span>
			</li>
			<li>
				<a href="">左边</a>
				<span>右边</span>
			</li>
			<li>
				<a href="">左边</a>
				<span>右边</span>
			</li>
			<li>
				<a href="">左边</a>
				<span>右边</span>
			</li>
		</ul>
	</body>
</html>
{% endhighlight %}

###浮动元素之间注释，导致多复制一个文字问题
{% highlight js %}
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
			.wrap{
				width: 400px;
			}
			.left{
				float: left;
			}
			.right{
				width: 398px;
				float: right;
			}
		</style>
		<!--
			两个浮动元素中间有注释或者内联元素并且和父级宽度相差不超过3px
			解决方案：
				1、两个浮动元素中间避免出现内联元素或者注释
				2、与父级宽度相差3px或以上
		-->
	</head>
	<body>
		<div class="wrap">
			<div class="left"></div>
			<span></span><!-- IE下文字溢出BUG -->
			<div class="right">&darr;这是多出来的一只猪</div>
		</div>
	</body>
</html>

{% endhighlight %}
 
 ###IE6 7 父级元素的overflow:hidden 是包不住子级的relative(IE6,7)
{% highlight js %}
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
			.box{
				width: 200px;
				height: 200px;
				background-color: red;
				border: 10px solid black;
				overflow: hidden;
				*position: relative;
			}
			.content{
				width: 400px;
				height: 400px;
				background-color: blue;
				position: relative;
			}
		</style>
		<!--
			解决方案：
				针对ie6、7给父级元素添加相对定位
		-->
	</head>
	<body>
		<div class="box">
			<div class="content"></div>
		</div>
	</body>
</html>
{% endhighlight %}

###IE6下绝对定位元素父级宽高是奇数,绝对定位元素的right和bottom值会有1px的偏差(IE6)
{% highlight js %}
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
			.box{
				width: 308px;
				height: 308px;
				background-color: red;
				position: absolute;
			}
			.content{
				width: 100px;
				height: 100px;
				background-color: blue;
				position: absolute;
				right: 0;
				bottom: 0;
			}
		</style>
		<!--
			解决方案：
				避免父级宽高出现奇数
		-->
	</head>
	<body>
		<div class="box">
			<div class="content"></div>
		</div>
	</body>
</html>
{% endhighlight %}

###IE6下绝对定位元素和浮动元素并列绝对定位元素消失(IE6)
{% highlight js %}
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
			.box{
				width: 200px;
				height: 200px;
				border: 1px solid black;
				position: relative;
			}
			.item{
				width: 150px;
				height: 150px;
				background-color: red;
				float: left;
				margin-left: 50px;//浮动左边距会产生双边距
				*display: inline;//解决双边距问题
			}
			.box span{
				width: 50px;
				height: 50px;
				background-color: yellow;
				position: absolute;
				right: -10px;
				top: -10px;
			}
		</style>
		<!--
			解决方案：
				浮动元素和绝对定位元素是同级的话定位元素就会消失。所以咱们只要让他们俩不处于同级就可以避免这个bug。
		-->
	</head>
	<body>
		<div class="box">
			<div class="item"></div>
			<p>
				<span></span>
			</p>
		</div>
	</body>
</html>
{% endhighlight %}

###IE6 下input的空隙
{% highlight js %}
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
			.box{
				width: 200px;
				border: 1px solid #000000;
				background-color: red;
			}
			.box input{
				border: 0;
				margin: 0;
				width: 200px;
				height: 30px;
				background-color: #fff;
				*float: left;
			}
		</style>
		<!--
			解决方案：
				给input元素添加float
		-->
	</head>
	<body>
		<div class="box">
			<input type="text" />
		</div>
	</body>
</html>
{% endhighlight %}

###IE6 下 输入类型表单控件背景问题（会随着输入的文字左移）(IE6)
{% highlight js %}
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
			input {
				background: url('img/mail.jpg') no-repeat fixed;
			}
		</style>
		<!--
			解决方案：
				设置background-attachment:fixed
		-->
	</head>
	<body>
		<div class="box">
			<input type="text" />
		</div>
	</body>
</html>
{% endhighlight %}

##CSS hack

hack 黑客？ （原意：修改）
针对不同的浏览器写不同的CSS 样式的过程，就叫CSS hack!

{% highlight js %}
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
			div{
				width: 200px;
				height: 200px;
				background-color: red
				background-color: blue\9;
				*background-color: green;
				_background-color: yellow;
			}
		</style>
		<!--
			\9 IE10以及IE10以下版本的
			*  IE7以及IE7以下版本的
			_  IE6以及IE6以下版本的
		-->
	</head>
	<body>
		<div></div>
	</body>
</html>
{% endhighlight %}

###IE6不支持png24 图片。

{% highlight js %}
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style>
			body{
				background-color: red;
			}
			div{
				width: 300px;
				height: 300px;
				background: url("img/png.png") no-repeat;
			}
		</style>
	</head>
	<body>
		<div></div>
		<img src="img/png.png" alt="" />
	</body>
</html>
{% endhighlight %}

####解决方案：JS插件(问题:不能处理body之上png24)
	`DD_belatedPNG.fix('xxx');`
{% highlight js %}
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="js/DD_belatedPNG_0.0.8a.js"></script>
		<script>
			DD_belatedPNG.fix("img, div");
		</script>
		<style>
			body{
				background-color: red;
			}
			div{
				width: 300px;
				height: 300px;
				background: url("img/png.png") no-repeat;
			}
		</style>
	</head>
	<body>
		<div></div>
		<img src="img/png.png" alt="" />
	</body>
</html>
{% endhighlight %}

####原生滤镜
	`_background:none;_filter : progid:DXImageTransform.Microsoft.AlphaImageLoader(src="XX.png", sizingMethod="crop");`
{% highlight js %}
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="js/DD_belatedPNG_0.0.8a.js"></script>
		<script>
			DD_belatedPNG.fix("body");
		</script>
		<style>
			body{
				width: 500px;
				height: 500px;
				background:red url("img/png.png") no-repeat;
				_background-image:none;
				_filter : progid:DXImageTransform.Microsoft.AlphaImageLoader(src="img/png.png", sizingMethod="crop");
			}
		</style>
	</head>
	<body>
	</body>
</html>
{% endhighlight %}

###IE6下PNG图片的灰色背景
{% highlight js %}
<!--[if IE 6]>
<script src="js/DD_belatedPNG_0.0.8a.js"></script>
<script>
DD_belatedPNG.fix('*');
</script>
<![endif]-->
{% endhighlight %}

###默认 < 类型 < class < id < style(行间) < !important 
!important  提升样式优先级权重
{% highlight js %}

{% endhighlight %}

innerText只支持IE,FireFox不支持
document.createElement(