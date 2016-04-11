---
layout: post
title: 好文记录
description: 记录下自己独到过的好的文章，不断更新
tags: 好文推荐
keys: 好文推荐
---

- <a href="https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Getting_Started/Selectors"> 选择器（Selectors）</a>
- <a href="http://zh.learnlayout.com/">CSS布局</a>
- <a href="http://www.imooc.com/wenda/detail/254035">淘宝双飞翼布局--始于淘宝UED</a>
- <a href="http://www.dqqd.me/avatar/fly/grids_test3.html">双飞翼栅格系统</a>
- <a href="http://www.iyunlu.com/view/css-xhtml/55.html">那些年我们一起清除的浮动--yisibl</a>

精益求精方案一：
相对于空标签闭合浮动的方法代码似乎还是有些冗余，通过查询发现Unicode字符里有一个“零宽度空格”，也就是U+200B ，这个字符本身是不可见的，所以我们完全可以省略掉 visibility:hidden了
.clearfix:after {content:"200B"; display:block; height:0; clear:both; }
.clearfix { *zoom:1; }.
由Nicolas Gallagher 大湿提出来的,原文:A new micro clearfix hack，该方法也不存在firefox中空隙的问题。
/* For modern browsers */
.cf:before,.cf:after {
content:"";
display:table;
}
.cf:after { clear:both; }/* For IE 6/7 (trigger hasLayout) */
.cf { zoom:1; }
 需要注意的是：
上面的方法用到了  ：before伪元素，很多人对这个有些迷惑，到底我什么时候需要用before呢？为什么方案一没有呢？其实它是用来处理margin边距重叠的，由于内部元素 float 创建了BFC，导致内部元素的margin-top和 上一个盒子的margin-bottom 发生叠加。如果这不是你所希望的，那么就可以加上before，如果只是单纯的闭合浮动，after就够了！并不是如同大漠《Clear Float》一文所说的：但只使用clearfix:after时在跨浏览器兼容问题会存在一个垂直边距叠加的bug，这不是bug，是BFC应该有的特性。

- <a href="http://www.iyunlu.com/demo/enclosing-float-and-clearing-float/index.html">闭合浮动与清除浮动的区别</a>
- <a href="http://www.cnblogs.com/pigtail/archive/2013/01/23/2871627.html">BFC和hasLayout</a>
- <a href="https://github.com/ecomfe/spec">代码规范</a>
- <a href="http://www.cnblogs.com/web-sheena/archive/2012/12/26/2834525.html">inline-block去掉空白距离方法</a>
- p标签中不要再嵌套标签，否则会自动闭合
- p标签撑不开父元素的高
- h3标签高度为0 --继承了父元素line-height
- 子元素margin-top影像父元素--In this specification, the expression collapsing margins means that adjoining margins (no non-empty content, padding or border areas or clearance separate them) of two or more boxes (which may be next to one another or nested) combine to form a single margin. 所有毗邻的两个或更多盒元素的margin将会合并为一个margin共享之。毗邻的定义为：同级或者嵌套的盒元素，并且它们之间没有非空内容、Padding或Border分隔。
- <a href="http://segmentfault.com/q/1010000000366724">垂直外边距合并</a>
- <a href="http://tieba.baidu.com/p/2743929001">子元素在父元素居中四种方法</a>
- <a href="http://www.chinaz.com/design/2010/0303/107594.shtml">完美的DIV三行三列自适应高度布局</a>
- padding-bottom:10000pxmargin-bottom:-10000px;
- articleleft下的两个div显示不了: 子元素没有继承父元素的overflow：visible，因为css样式发生重叠
- 索搜栏的布局
- <a href="http://www.cnblogs.com/mofish/archive/2011/03/24/1993552.html">input内光标高度不一致</a>
- 日历写法
- css3瀑布流多栏布局,column-width会自行加上column-gap，所以达不到你想要的宽度，可以设置column-gap:0px来达到你想要的宽度
- <a href="http://www.w3cfuns.com/article-5600544-1-1.html">时间轴布局</a>


- <a href="http://www.ibm.com/developerworks/cn/web/1308_caiys_jsload/index.html" title="javascript性能优化">javascript性能优化</a>
- <a href="http://segmentfault.com/q/1010000000669360" title="js深拷贝和浅拷贝">js深拷贝</a>
- <a href="https://segmentfault.com/a/1190000004179484?_ea">HTML5语义化</a>

- <a href="http://blog.csdn.net/bingqingsuimeng/article/details/41862593">浏览器嗅探</a>
- <a href="http://segmentfault.com/q/1010000004215664?_ea=532108">浏览器嗅探</a>
- <a href="http://www.cnblogs.com/rubylouvre/archive/2009/08/09/1542174.html">javascript事件代理</a>
- <a href="http://blog.csdn.net/taozi165/article/details/6553544">读取设置cookie</a>
- <a href="http://www.w3school.com.cn/jsref/jsref_obj_date.asp">JavaScript Date 对象</a>
- <a href="http://www.360doc.com/content/14/1011/13/15077656_416048738.shtml">Event Loop</a>
- <a href="http://www.ibm.com/developerworks/cn/web/wa-lo-comet/">Comet：基于 HTTP 长连接的“服务器推”技术</a>
- <a href="http://my.oschina.net/BearCatYN/blog/509590">跨域问题</a>
- <a href="http://www.laruence.com/2009/05/28/863.html">鸟哥：Javascript作用域原理</a>
- <a href="http://www.cnblogs.com/lhb25/archive/2011/09/06/javascript-scope-chain.html">理解 JavaScript 作用域和作用域链</a>
- <a href="http://www.nowamagic.net/librarys/veda/detail/1648">JavaScript探秘：强大的原型和原型链</a>
- <a href="http://www.jb51.net/article/30750.htm">原型链看图说明</a>
- <a href="http://blog.jobbole.com/9648/">理解javascript原型</a>
- <a href="http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html">学习Javascript闭包</a>
- <a href="http://www.cnblogs.com/rubylouvre/archive/2009/07/24/1530074.html">javascript的闭包</a>
- <a href="http://www.jb51.net/article/18303.htm">javascript闭包的深入理解</a>
- <a href="http://www.codeceo.com/article/javascript-this-point.html">图文解说this指向</a>
- <a href="http://blog.csdn.net/bluefish1990/article/details/8567998">鲜为人知的z-index</a>
- <a href="http://ued.ctrip.com/blog/translation-define-svg-with-css-styles-and-animation.html">SVG</a>
- <a href="http://efe.baidu.com/blog/revisiting-css-preprocessors/" title="">再谈CSS预处理器</a>
- <a href="http://www.w3cplus.com/css/css-preprocessor-sass-vs-less-stylus-2.html">css预处理器</a>
- <a href="http://www.w3cplus.com/css3/a-guide-to-flexbox.html">flexbox指南</a>
- <a href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html">flex教程之语法篇</a>
- <a href="http://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html">BFC神奇背后的原理</a>
- <a href="http://www.ituring.com.cn/article/56184">原型继承的原理</a>
- <a href="http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html">jsload继承机制的设计思想</a>
- <a href="http://kb.cnblogs.com/page/129756/">前端必读：浏览器内部工作原理</a>
- <a href="http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html">Javascript 严格模式详解</a>
- <a href="https://segmentfault.com/a/1190000004322358">JavaScript：彻底理解同步、异步和事件循环(Event Loop)</a>
- <a href="http://wenku.baidu.com/link?url=cVntiYpN3lfJ7Y6jmC4KiM-jYvwVoM6k8PIDdC_siidp3w-sTLo4MhavwHddAxQXCcjPMTOHiISLXtSwXl0BWgPKzgJJ3QnlCJ_PUWho657">HTTPheaders 详解</a>
- <a href="http://mogu.io/the-power-of-immutable-objects-120">不可变对象的魅力</a>
- <a href="http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html">浏览器同源政策及其规避方法</a>