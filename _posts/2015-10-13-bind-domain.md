---
layout: post
description: 如何将域名和github Page主页绑定
title: 域名绑定
keywords: 域名 github 顶级域名 A记录 CNAME记录
tags: jekyll 博客搭建 github
---

##准备一个域名

<a href="http://wanwang.aliyun.com/">阿里云</a>
<a href="http://www.veryhost.cn/">互联中国</a>

可以在很多互联网服务器主机的公司注册，个人选择的是互联中国，当然是因为价格比较便宜。注册完之后需要2-24小时申请时间。

<img src="{{ site.url }}/images/loading.gif" data-rsrc="{{ site.url }}/images/post/2015-10-13/1.png" alt="" width="600px" height="300px">

然后再自己的项目根目录创建CNAME文件（没有后缀）.

<img src="{{ site.url }}/images/loading.gif" data-rsrc="{{ site.url }}/images/post/2015-10-13/2.png" alt="">

在文件中加入注册的域名。

<img src="{{ site.url }}/images/loading.gif" data-rsrc="{{ site.url }}/images/post/2015-10-13/3.png" alt="">

然后前往你的DNS服务商新建一个CNAME解析到你的github Page个人主页地址（比如loudou.github.io）.主机名@表示通过domain.com访问，主机名为www则表示通过www.domian.com访问。

<img src="{{ site.url }}/images/loading.gif" data-rsrc="{{ site.url }}/images/post/2015-10-13/4.png" alt="">

域名解析不能马上生效，啊大概需要十几分钟的时间，之后就能正常访问了。