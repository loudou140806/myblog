---
layout: post
title: 站点调试
---

##本地服务器上的调试

命令行中输入 `jekyll serve --watch`后，进入localhost：4000端口进行监听
打开页面如下图所示

<img src="{{ site.url }}/images/post/2015-10-08/1.jpg" width="720px"/>

但是在这个时候图片不能显示，看了图片的路径什么的都没有错。不知道是出于什么情况，过了一会儿再进入的时候图片。在开发者调试模式下（F12）发现这个图片的Type类型不对。本来应该是`image/jpeg`，但是这张图片的type变成了`text/html`.
<img src="{{ site.url }}/images/post/2015-10-08/3.png">

##github服务器上的调试

进入<a href="https://loudou140806.github.com/myblog">https://loudou140806.github.com/myblog</a>,没有问题，一切运行正常，但是在点击进入文章时出现404页面

<img src="{{ site.url }}/images/post/2015-10-08/2.jpg" width="720px"/>

进入`https://loudou140806.github.com/myblog`,没有问题，一切运行正常，但是在点击进入文章时出现404页面