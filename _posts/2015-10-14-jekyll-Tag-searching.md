---
layout: post
title: 标签搜索
description: 根据文章标签搜索分类文章，转载自张雯莉的文章<a href="http://zhangwenli.com/blog/2014/05/18/jekyll-tag-searching/">jekyll Tag Searching</a>,我将它翻译成了中文。
tags: jekyll tag liquid javascript 博客搭建
---

>在这篇文章中你将学到什么？
>这篇文章介绍了如何通过jekyll中标签来搜索文章分类，而不是使用jekyll插件。

由于jekyll是静态生成的，所以这意味着在你请求之前，页面已经生成在那儿了，jekyll中的流式语言也很难查询到到URL字符串。但是我们能够通过一些小技巧让它看起来请求到。

基本思想就是先将所有的文章显示在tags页面，然后使用CSS`display:none`,将所有除了搜索标签意外的文章隐藏。我们可以通过javascript获取到URL字符串。

##在Tags页面显示所有文章

###1.创建一个名为`tags.html`的页面

然后接下来就能像 `http://.../tags/?tag=css`这样搜索标签了。

### 2. 在 `site.tags`得到所有标签名

在标签中你最好使用`-` 代替空格。否则，如果你的标签中有个类似 `Hello World`的标签,  `site.tags` 会包含 `Hello` 和 `World`两个标签。为了防止这样的情况发生, 要使用 `Hello-World` 作为标签的名称。

### 3. 对每个标签，列出所有包含这个标签的文章

在这里我们为每个标签包含 `id` 和 `class` 创建一个 `<div></div>`  以方便我们接下来的操作。

### 4. 隐藏 `tag-posts`.

  对 `.tag-posts` 设置 `display: none;`。

### 5. 使用javascript查询字符串

{% highlight js %}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
{% endhighlight %}

### 6. 显示搜索的标签的文章

{% highlight js %}
window.onload = function() {
    var tag = getParameterByName('tag');
    if (tag && document.getElementById('tag-' + tag)) {
        document.getElementById('tag-' + tag).style.display = 'block';
        document.getElementById('tagTitle').innerHTML = tag;
    } else {
        document.getElementById('tagTitle').innerHTML = 'Illegal Tag Query';
    }
};
{% endhighlight %}

不过偷偷看了一下她的源码，发现并没有用文章当中的代码，而是下面这样的，所以我的博客当中也用了这样的方法。

{% highlight js %}
<script type="text/javascript">
    // function queryString is copied from
    // http://stackoverflow.com/questions/979975/how-to-get-the-value-from-url-parameter#answer-979995
    function queryString() {
      // This function is anonymous, is executed immediately and
      // the return value is assigned to QueryString!
      var query_string = {};
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = pair[1];
        // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [ query_string[pair[0]], pair[1] ];
            query_string[pair[0]] = arr;
        // If third or later entry with this name
        } else {
            query_string[pair[0]].push(pair[1]);
        }
      }
        return query_string;
    }
    
    window.onload = function() {
        var query = queryString();

        if (query.tag !== undefined) {
            var tag = decodeURI(query.tag);
            $('.violet-title-item').text('Posts tagged with ' + tag);
            $('.violet-post').not('.tag-' + tag).hide();
        }
    };
{% endhighlight %}

### 7. 添加链接到标签

现在你就能像 `/tags?tag=Jekyll` 一样搜索标签的文章了。