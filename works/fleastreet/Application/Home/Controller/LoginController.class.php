<?php
namespace Home\Controller;
use Think\Controller;
class LoginController extends Controller{
    public function index(){
        $this->display('index');
    }

    public function login(){
        $account = I('post.acount');
        $password = I('post.password');
        $password = md5('$password');
        $ip = get_client_ip();
        $Ip = new \Org\Net\IpLocation('UTFWry.dat'); // 实例化类 参数表示IP地址库文件
        $area = $Ip->getlocation("$ip"); // 获取某个IP地址所在的位置
        $User = M('user');
        //符合手机号规则
            switch($account)
            {
                case 规则一:
                    if ($User->where('phone="$account" AND password="$password"')->find()) {
                        session(array('account'=>"$account",'password'=>"$password"));
                        $msg = array('type'=>'ok');
                        $msg = json_encode($msg);
                        echo $msg;
                    }else{}
                    break;
                case 规则二:
                    if ($User->where('phone="$account" AND password="$password"')->find()) {
                        session(array('account'=>"$account",'password'=>"$password"));
                        $msg = array('type'=>'ok');
                        $msg = json_encode($msg);
                        echo $msg;
                    }else{}
                    break;
                case 规则三:
                    if ($User->where('phone="$account" AND password="$password"')->find()) {
                        session(array('account'=>"$account",'password'=>"$password"));
                        $msg = array('type'=>'ok');
                        $msg = json_encode($msg);
                        echo $msg;
                    }else{}
                    break;
                default :
                    break;
            }

        }
}