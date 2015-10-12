---
layout: post
title: 站点调试
description: 站点调试中遇到的一些问题
keyword: 调试
---

##本地服务器上的调试

命令行中输入 `jekyll serve --watch`后，进入localhost：4000端口进行监听
打开页面如下图所示

<img src="{{ site.url }}/images/post/2015-10-08/1.jpg" width="720px"/>

但是在这个时候图片不能显示，看了图片的路径什么的都没有错。不知道是出于什么情况，过了一会儿再进入的时候图片。在开发者调试模式下（F12）发现这个图片的Type类型不对。本来应该是`image/jpeg`，但是这张图片的type变成了`text/html`.

<img src="{{ site.url }}/images/post/2015-10-08/3.png" width="720px">

后来才发现因为读取的地址是*{{ site.url }}/images/post/2015-10-08/3.png*，所以在本地调试的时候图片读取的应该还是github远程服务器上的图片，说以还没提交到远端的图片当然不能显示咯，然后我把图片提交到github上之后在本地调试就没有出现问题了，图片也显示正常。

进入文章页面，一切正常。然后停留在post页面想进入文章归档页面的时候，出现了404 Not Found！页面。

<img src="{{ site.url }}/images/post/2015-10-08/4.jpg" width="720px"/>

又不知道为什么了，文章引用的布局是post，post引用的布局又是default，应该不会有问题啊，从首页就能进入文章归档，但是为什么从文章页面就不行了呢？

在default页面发现了问题
<img src="{{ site.url }}/images/post/2015-10-08/5.png" width="300px"/>

在取地址的时候用的是相对地址，所以生成的站点里取得的地址是：

<img src="{{ site.url }}/images/post/2015-10-08/7.png" width="300px"/>

只要将`config.yml`中的nav下的url改成绝对路径即可：

<img src="{{ site.url }}/images/post/2015-10-08/6.png" width="300px"/>

##github服务器上的调试

进入<a href="https://loudou140806.github.com/myblog">https://loudou140806.github.com/myblog</a>,没有问题，一切运行正常，但是在点击进入文章时出现404页面

<img src="{{ site.url }}/images/post/2015-10-08/2.jpg" width="720px"/>

进入`https://loudou140806.github.com/myblog`,没有问题，一切运行正常，但是在点击进入文章时出现404页面

其实是由于rpost.url产生的是绝对路径，而我的blog不是站点根目录下，所以找不到/2015/10/08/***页面,所以在`rpost.url`之前加上/myblog即可。

至此，站点能够在github上运行，并没有再报错。总结一下出现问题的原因其实就是站点目录的绝对地址和相对地址的问题，因为我的站点不是放在域名的根目录，所以有些使用绝对路径的地方就会出错，以后使用地址需要谨慎。