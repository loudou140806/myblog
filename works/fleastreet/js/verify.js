// 按钮提交不刷新
$(document).ready(function() {

    $('#verifyform').submit(function() {

        return false;
    });
    $('#regform').submit(function() {

        return false;
    });

});

//验证学号和密码
$(function(){

    var id = "",
        password= "";

    $("#verify").click(function(){
        xuehao = $("#xh").val();
        mima = $("#mm").val();
        $.ajax({
            url: verurl,
            data:{
                id:xuehao,
                password:mima
            },
            type:"POST",
           dataType:"JSON",
            success:function(res){
                alert("验证成功")
            },
            error:function(e){
                alert("验证失败")
            }
        })

    });
    $.ajaxSetup ({
        cache: false, //关闭AJAX缓存
        async : true
    });
})

//发送验证码
$(function(){
    var  phone= "";

    $("#send").click(function(){
        Phone = $("#phone").val();
        console.log(Phone);
        $.ajax({
            url: sendurl,
            data:{
                phone:Phone
            },
            type:"POST",
            dataType:"JSON",
            success:function(res){
                alert("发送成功")
            },
            error:function(e){
                alert("发送失败")
            }
        })

    });
    $.ajaxSetup ({
        cache: false, //关闭AJAX缓存
        async : true
    });
})

//注册表单
$(function(){

    var  username= "",
         password="",
         phone="",
         code=""

    $("#register").click(function(){
        console.log(1);
        Username = $("#username").val();
        Phone = $("#phone").val();
        Password = $("#pwd2").val();
        Code = $("#randcode").val();
        $.ajax({
            url: regurl,
            data:{
                username:Username,
                phone:Phone,
                password:Password,
                code:Code
            },
            type:"POST",
            dataType:"JSON",
            success:function(res){
                console.log(res);
            },
            error:function(e){
                console.log("error");
            }
        })

    });
    $.ajaxSetup ({
        cache: false, //关闭AJAX缓存
        async : true
    });
})