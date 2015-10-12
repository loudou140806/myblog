<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>商品发布</title>
    <!-- Bootstrap -->
    <link href="/flea/Public/css/bootstrap.min.css" rel="stylesheet">
    <link href="/flea/Public/css/mycss.css" rel="stylesheet">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<div class="container">
<form  class="form-horizontal" action="/flea/index.php/Home/File/upload" enctype="multipart/form-data" method="post" >
    <div class="form-group">
        <label for="inputEmail3" class="col-sm-2 control-label">物品名称</label>
        <div class="col-sm-10">
            <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
        </div>
    </div>

    <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
            <label class="radio-inline">
                <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"> 全新
            </label>
            <label class="radio-inline">
                <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"> 非全新
            </label>
        </div>
    </div>

    <div class="form-group">
        <label for="saleprice" class="col-sm-2 control-label">出售价</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="saleprice" placeholder="">
        </div>
    </div>
    <div class="form-group">
        <label for="yuanjia" class="col-sm-2 control-label">原价</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="yuanjia" placeholder="">
        </div>
    </div>
    <div class="form-group">
        <label for="phone" class="col-sm-2 control-label">手机号</label>
        <div class="col-sm-10">
            <input type="password" class="form-control" id="phone" placeholder="">
        </div>
    </div>
    <div class="form-group">
        <label for="address" class="col-sm-2 control-label">地址：</label>
        <div class="col-sm-10">
            <input type="password" class="form-control" id="address" placeholder="">
        </div>
    </div>

    <div class="form-group">
        <label for="image" class="col-sm-2 control-label">图片</label>
        <div class="col-sm-10">
            <input type="file" class="form-control" id="image" placeholder="">
        </div>
    </div>
    <div class="form-group">
        <label for="detail" class="col-sm-2 control-label">商品描述</label>
        <div class="col-sm-10">
            <textarea class="form-control" rows="3" id="detail"></textarea>
        </div>
    </div>

    <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
            <button type="submit" class="btn btn-default">发布商品</button>
        </div>
    </div>

</form>
</div>
</body>
</html>