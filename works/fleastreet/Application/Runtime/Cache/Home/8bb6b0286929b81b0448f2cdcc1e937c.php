<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head lang="en">
<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
   <title>Bootstrap 101 Template</title>
      <!-- Bootstrap -->
      <link href="/flea/Public/css/bootstrap.min.css" rel="stylesheet">
      <link href="/flea/Public/css/mycss.css" rel="stylesheet">
      <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
      <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
      <!--[if lt IE 9]>
        <script src="cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
      <![endif]-->
    <script language="JavaScript">
            var verurl = "/flea/index.php/Home/register/student_verify",
                sendurl = "/flea/index.php/Home/register/send",
                regurl = "/flea/index.php/Home/register/register"
    </script>
    <script src="/Public/js/verify.js"></script>
</head>
<body>
    <nav id="nav-top" class="navbar  navbar-inverse" role="navigation">
       <div class="container-fluid">
          <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-responsive-collapse" aria-expanded="false">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
              </button>
                  <div class="nav-top-l">
                      <a href="/Application/Home/View/Index/signin.html" class="navbar-brand">您好，请登录</a>
                      <a href="/Application/Home/View/Register/index.html" class="navbar-brand">免费注册</a>
                  </div>
           </div>
           <div class="collapse navbar-collapse" id="navbar-responsive-collapse">
               <ul class="nav navbar-nav nav-top-r">
                   <li><a href="">发布二手</a></li>
                   <li><a href="">我的买卖</a></li>
                   <li><a href="">收藏夹</a></li>
                   <li><a href="">入驻跳蚤街</a></li>
                   <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">关注跳蚤街 <span class="caret"></span></a>
                        <ul class="dropdown-menu ">
                          <li><a href="#" >Action</a></li>
                          <li><a href="#">Another action</a></li>
                          <li><a href="#">Something else here</a></li>
                          <li><a href="#">Separated link</a></li>
                          <li><a href="#">One more separated link</a></li>
                        </ul>
                      </li>
                   <li><a href="#">加入我们</a></li>
                   <li><a href="#">网站导航</a></li>
               </ul>
           </div>       
       </div>
    </nav>
    <div class="banner">
        <div class="container">
            <div class="col-xs-6 col-md-3 banner-logo">
                <a href="#">
                  <img src="/Public/img/banner-logo.png" alt="">
                </a>
            </div>
        </div>
    </div>
    <div class="container" >
        <div class="row">
                <div class="col-md-4">
                    <form class="form-horizontal"  method="post" name="verifyform" id="verifyform" >
                        <div class="input-group">
                            <label class="input-group-addon" for="xh">学号：</label>
                            <input type="text" class="form-control" id="xh" name="xh" placeholder="学号">
                        </div>
                        <div class="input-group">
                            <label class="input-group-addon" for="mm">密码：</label>
                            <input type="password" class="form-control" id="mm" name="mm" placeholder="密码">
                        </div>
                        <div class="input-group">
                            <button  id="verify" name="verify" class="btn btn-default">验证</button>
                        </div>

                    </form>

                </div>
        </div>
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <form class="form-horizontal"  method="post" name="regform" id="regform" >
                    <div class="input-group">
                        <label class="input-group-addon" for="name">姓名：</label>
                        <input type="text" class="form-control" id="name" name="name" placeholder="姓名">
                    </div>
                    <div class="input-group">
                        <label class="input-group-addon" for="pwd1">密码：</label>
                        <input type="password" class="form-control" id="pwd1" name="pwd1" placeholder="">
                    </div>
                    <div class="input-group">
                        <label class="input-group-addon" for="pwd2">确认密码：</label>
                        <input type="password" class="form-control" id="pwd2" name="pwd2" placeholder="">
                    </div>
                    <div class="input-group">
                        <label class="input-group-addon" for="phone">手机号：</label>
                        <input type="text" class="form-control" id="phone" name="phone" placeholder="">
                    </div>

                    <div class="input-group ">
                        <button class="btn btn-default" id="send" name="send">发送验证码</button>
                    </div>

                    <div class="input-group ">
                        <label class="input-group-addon" for="code">验证码：</label>
                        <input type="text" class="form-control" id="code" name="code" placeholder="">
                    </div>
                    <div class="input-group ">
                        <button class="btn btn-default" id="register" name="register">立即注册</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="footer">
        <div class="footer-content">
            <ul class="clear">
                <li>
                    <h2><a href="##">跳蚤街</a></h2>
                    <a href="">跳蚤街</a>
                    <a href="">跳蚤街</a>
                </li>
                <li>
                    <h2><a href="##">友情链接</a></h2>
                    <a href="">友情链接</a>
                    <a href="">友情链接</a>
                </li>
                <li>
                    <h2><a href="##">帮助中心</a></h2>
                    <a href="">帮助中心</a>
                    <a href="">帮助中心</a>
                </li>
                <li>
                    <h2><a href="##">交流合作</a></h2>
                    <a href="">交流合作</a>
                    <a href="">交流合作</a>
                </li>
                <li>
                    <h2><a href="##">分享</a></h2>
                    <a href="">分享</a>
                    <a href="">分享</a>
                </li>
            </ul>
        </div>
    </div>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="/Public/js/jquery-2.1.4.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="/Public/js/bootstrap.min.js"></script>
</body>
</html>