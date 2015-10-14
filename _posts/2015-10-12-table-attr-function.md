---
layout: post
title: table属性方法
description: table的一些专用HTML-DOM属性和方法
keywords: table
tags: javascript
---

###table专用的HTML-DOM属性方法

###为\<table\>元素添加的属性和方法。

* caption: 保存在对\<caption\>元素的指针。
* tBodies: 是一个\<tbody\>元素的HTMLCollection（元素集合）.
* tFoot: 保存着对\<tfoot\>元素的指针。
* tHead: 保存着对\<thead\>元素的指针。
* rows: 是一个表格中所有行的HTMLCollection.
* createTHead(): 创建\<thead\>元素，将其放到表格中，返回引用。
* createTFoot(): 创建\<tfoot\>元素，将其放到表格中，返回引用。
* createTCaption(): 创建\<caption\>元素，将其放到表格中，返回引用。
* deleteTHead(): 删除\<thead\>元素。
* deleteTFoot(): 删除\<tfoot\>元素。
* deleteCaption(): 删除\<caption\>元素。
* deleteRow(pos): 删除指定位置的行。
* insertRow(pos): 向rows集合中的指定位置插入一行。

###为\<tbody\>元素添加的属性和方法

* rows: 保存着\<tbody\>元素的元素集合。
* deleteRow(pos): 删除指定位置的行。
* insertRow(pos): 向rows集合中的指定位置插入一行，返回对新插入行的引用。

###为\<tr\>元素添加的属性和方法

* cells: 保存着\<tr\>元素中单元和的元素集合。
* deleteCell(pos): 删除指定位置的单元格。
* insertCell(pos): 向cells集合中的指定位置插入一个单元格，返回对新插入单元格的引用。

下面是一个例子

{% highlight js %}

//创建table
var table = document.createElement("table");
table.border = 1;
table.width = "100%";

//创建tbody
var tbody = document.createElement("table");
table.appendChild(tbody);

//创建第一行
tbody.insertRow(0);
tbody.rows[0].insertCell(0);
tbody.rows[0].cells[0].appendChild(document.createTextNode("cell 1,1"));
tbody.rows[0].insertCell(1);
tbody.rows[0].cells[1].appendChild(document.createTextNode("cell 2,1"));

//创建第二行
tbody.insertRow(1);
tbody.rows[1].insertCell(0);
tbody.rows[1].cells[0].appendChild(document.createTextNode("cell 1,2"));
tbody.rows[1].insertCell(1);
tbody.rows[1].cells[1].appendChild(document.createTextNode("cell 2,2"));

document.body.appendChild(table);

{% endhighlight %}

<script defer>
	window.onload = function(){
		//创建table
		var table = document.createElement("table");
		table.border = 1;
		table.width = "100%";

		//创建tbody
		var tbody = document.createElement("table");
		table.appendChild(tbody);

		//创建第一行
		tbody.insertRow(0);
		tbody.rows[0].insertCell(0);
		tbody.rows[0].cells[0].appendChild(document.createTextNode("cell 1,1"));
		tbody.rows[0].insertCell(1);
		tbody.rows[0].cells[1].appendChild(document.createTextNode("cell 2,1"));

		//创建第二行
		tbody.insertRow(1);
		tbody.rows[1].insertCell(0);
		tbody.rows[1].cells[0].appendChild(document.createTextNode("cell 1,2"));
		tbody.rows[1].insertCell(1);
		tbody.rows[1].cells[1].appendChild(document.createTextNode("cell 2,2"));

		document.body.appendChild(table);
	}
</script>