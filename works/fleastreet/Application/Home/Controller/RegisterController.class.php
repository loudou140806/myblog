<?php
namespace Home\Controller;
use Think\Controller;
class RegisterController extends Controller{
    public function index(){
        $this->display('index');
    }

    //验证学号和密码
    public function student_verify(){

        if (IS_AJAX) {
            $xuehao = I('post.id');
            $mima = I('post.password');

             $student = new Student($xuehao, $mima);
             if ($student->check()) {
                 $message = array(
                     "type" => "yes"
                 );
                 $str = json_encode($message);
                 echo $str;
             }
        }else{
			$this->error("参数错误");
		}
    }

    //对表单单独控件进行验证，昵称、手机号、邮箱
    public function register_verify(){

        if (IS_AJAX) {
            $arr = array('nickname'=>'reg_name','phone'=>'reg_phone');
            foreach($arr as $filed =>$control){
                if (isset($_POST["$control"])){
                    self::form_verify($control,$filed);
                }
            }
        }
    }
    //表单控件验证函数
    public function form_verify($control,$filed){
        if (isset($_POST["$control"])) {
            $User = M('User');
            $value = I("post.$control");
            $result = $User->where("$filed = \"$value\"")->find();
            if ($result){
                echo 111;
            }else{
                $message = array("msg" => "ok");
                $str = json_encode($message);
                echo $str;
            }
        }else{
            $this->error("参数错误");
        }
    }


    //接收验证码
    public function proxy(){

        $data['identifier'] = $_POST['identifier'];
        $data['rand_code'] = $_POST['rand_code'];
        $data['expire'] = 120;
        session($data);
        header("Cache-Control:no-stroe,no-cache,must-revalidate,post-check=0,pre-check=0");
        header("Pragma:no-cache");
        echo json_encode(array('res_code'=>0));
    }

    //发送验证码
    public function send(){

        $app_id = C('APP_ID');
        $app_secret = C('APP_SECRET');
        $access_token = C('ACCESS_TOKEN');

        //$code->get_Access_token();
        if (IS_AJAX){
            $phone = I('post.phone');

            $code = new RandCode($app_id,$app_secret,$access_token,$phone);
            $code->set_token();
                if ($code->send_code()) {
                    $message = array(
                        "type" => "yes"
                    );
                    $str = json_encode($message);
                    echo $str;
                }
        }else{
            $this->error("参数错误");
        }
    }


    //注册用户
    public function register(){
        $rand_code = I('post.code');
        session('[start]');
        if (session('?rand_code')){
            if ($rand_code == session('rand_code')){
                $data['username'] = I('post.username');
                $data['password'] = md5(I('post.password'));
                $data['phone'] = I('post.phone');
                $data['ctime'] = date('Y-m-d H-i-s');
                $data['email'] = '';
                $data['school'] = 1;
                $data['truename'] ='';
                $data['account'] ='本科生';
                $User = M('User');
                if ($User->add($data)){
                    $message = array(
                        "type" => "ok"
                    );
                    $str = json_encode($message);
                    echo $str;
                }
            }else{
            }
        }else{
            $message = array(
                "type" => "no"
            );
            $str = json_encode($message);
            echo $str;
        }
    }

}


class RandCode{
    private $app_id='';
    private $app_secret='';
    private $access_token='';
    private $token='';
    private $timestamp='';
    private $exp_time=2;
    private $tokenAPI = "https://oauth.api.189.cn/emp/oauth2/v3/access_token";
    private $url="http://hduflea720.coding.io/index.php/Home/register/proxy";
    public  $phone;

    //初始化参数值
    function __construct($app_id='',$app_secret='',$access_token='',$phone=''){
        $this->app_id=$app_id;
        $this->app_secret= $app_secret;
        $this->access_token = $access_token;
        $this->phone = $phone;
    }

    //获取access_token值
    public function get_Access_token(){

        $App_Id= $this->app_id;
        $App_Secret= $this->app_secret;
        $grant_type='client_credentials';

        $send = 'app_id='.$App_Id.'&app_secret='.$App_Secret.'&grant_type='.$grant_type;

        $access_token = $this->curl_post("https://oauth.api.189.cn/emp/oauth2/v3/access_token", $send);
        $access_token = json_decode($access_token, true);

        return   $access_token['access_token'];

    }

    //获取信任码
    public function set_token()
    {
        $this->timestamp = date('Y-m-d H:i:s');
        $url = "http://api.189.cn/v2/dm/randcode/token?";
        $param['app_id'] = "app_id=" . $this->app_id;
        $param['access_token'] = "access_token=" . $this->access_token;
        $param['timestamp'] = "timestamp=" . $this->timestamp;
        ksort($param);
        $plaintext = implode("&", $param);
        $param['sign'] = "sign=" . rawurlencode(base64_encode(hash_hmac("sha1", $plaintext, $this->app_secret, $raw_output = True)));
        ksort($param);
        $url .= implode("&", $param);
        $result = self::curl_get($url);
        $resultArray = json_decode($result, true);
        $this->token = $resultArray['token'];

    }

    //给用户发送验证码
    public function send_code()
    {
        $url = "http://api.189.cn/v2/dm/randcode/send";
        $token = $this->token;
        $phone = $this->phone;
        $dataurl = $this->url;
        $exp_time = $this->exp_time;
        $app_id = $this->app_id;
        $app_secret = $this->app_secret;
        $access_token = $this->access_token;
        $timestamp = $this->timestamp;

        $param['app_id'] = "app_id=" . $app_id;
        $param['access_token'] = "access_token=" . $access_token;
        $param['timestamp'] = "timestamp=" . $timestamp;
        $param['token'] = "token=" . $token;
        $param['phone'] = "phone=" . $phone;
        $param['url'] = "url=" . $dataurl;
        $param['exp_time'] = "exp_time=" . $exp_time;
        ksort($param);
        $plaintext = implode("&", $param);
        $param['sign'] = "sign=" . rawurlencode(base64_encode(hash_hmac("sha1", $plaintext, $app_secret, $raw_output = True)));
        ksort($param);
        $str = implode("&", $param);
        $result = self::curl_post($url, $str);
        $resultArray = json_decode($result, true);
        if ($resultArray['res_code'] == 0) {
            return TRUE;
        } else {
            return FALSE;
        }
    }

    //get函数
    private function curl_get($url='', $options=array()){
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        if (!empty($options)){
            curl_setopt_array($ch, $options);
        }
        $data = curl_exec($ch);
        curl_close($ch);
        return $data;
    }

    //post函数
    private function curl_post($url='', $postdata='', $options=array()){
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        if (!empty($options)){
            curl_setopt_array($ch, $options);
        }
        $data = curl_exec($ch);
        curl_close($ch);
        return $data;
    }

    function __destruct(){

    }

}


class Student{
    private $student_id;//学号
    private $student_pwd;//密码
    function __construct($xuehao='',$mima=''){
        $this->student_id = $xuehao;
        $this->student_pwd = $mima;
    }

    private function verify(){
        $cookie_file = tempnam('./temp','cookie');

        $xh = $this->student_id;
        $pwd = $this->student_pwd;
        $password = md5($pwd);

        $url = 'http://cas.hdu.edu.cn/cas/login';
        $ch = curl_init($url);
        curl_setopt($ch,CURLOPT_HEADER,0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);//0显示,1不显示
        curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file);//保存cookie
        $data = curl_exec($ch);
        curl_close($ch);
        preg_match_all('/value="LT-(.+)"/', $data, $arr);
        $lt = 'LT-'.$arr[1][0];

        //登录,post，302至href="http://jxgl.hdu.edu.cn/index.aspx?ticket=ST-147924-XnnMzT8xvlrTuUyTxdH2"，获取url
        $url = 'http://cas.hdu.edu.cn/cas/login';
        $post_fields = 'encodedService=http%253a%252f%252fi.hdu.edu.cn%252fdcp%252fxphone%252fksap.jsp&service=http%3A%2F%2Fi.hdu.edu.cn%2Fdcp%2Fxphone%2Fksap.jsp&serviceName=null&loginErrCnt=0&username='.$xh.'&password='.$password.'&lt='.$lt;
        $ch = curl_init($url);
        curl_setopt($ch,CURLOPT_HEADER,0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);//0显示,1不显示
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
        curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file);//保存cookie
        curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file);//使用cookie
        $data = curl_exec($ch);
        curl_close($ch);
        preg_match_all('/href="(.+)"/', $data, $arr);
        $url = $arr[1][0];

        // 访问url，获取url2
        $ch = curl_init($url);
        curl_setopt($ch,CURLOPT_HEADER,0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);//0显示,1不显示
        curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file);//保存cookie
        curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file);//使用cookie
        $data = curl_exec($ch);
        curl_close($ch);

        $url = 'http://i.hdu.edu.cn/dcp/xphone/yktxx.jsp';	//$post_fields = "__EVENTTARGET=&__EVENTARGUMENT=&__LASTFOCUS=&__VIEWSTATE=%2FwEPDwULLTIxMDUwNTQwMjIPZBYCAgEPZBYGAgEPEGQQFQ8ACTIwMDEtMjAwMgkyMDAyLTIwMDMJMjAwMy0yMDA0CTIwMDQtMjAwNQkyMDA1LTIwMDYJMjAwNi0yMDA3CTIwMDctMjAwOAkyMDA4LTIwMDkJMjAwOS0yMDEwCTIwMTAtMjAxMQkyMDExLTIwMTIJMjAxMi0yMDEzCTIwMTMtMjAxNAkyMDE0LTIwMTUVDwAJMjAwMS0yMDAyCTIwMDItMjAwMwkyMDAzLTIwMDQJMjAwNC0yMDA1CTIwMDUtMjAwNgkyMDA2LTIwMDcJMjAwNy0yMDA4CTIwMDgtMjAwOQkyMDA5LTIwMTAJMjAxMC0yMDExCTIwMTEtMjAxMgkyMDEyLTIwMTMJMjAxMy0yMDE0CTIwMTQtMjAxNRQrAw9nZ2dnZ2dnZ2dnZ2dnZ2dkZAIHD2QWBmYPZBYCZg8WAh4JaW5uZXJodG1sBSUyMDEzLTIwMTTlrablubTnrKwx5a2m5pyf5a2m5Lmg5oiQ57upZAIBD2QWBmYPFgIfAAUR5a2m5Y%2B377yaMTIwODQzMThkAgEPFgIfAAUS5aeT5ZCN77ya5qKB57%2Bw6Zu3ZAICDxYCHwAFG%2BWtpumZou%2B8mumAmuS%2FoeW3peeoi%2BWtpumZomQCAg9kFgRmDxYCHwAFLOS4k%2BS4mu%2B8muS%2FoeaBr%2BWuieWFqCjljZPotorlt6XnqIvluIjorqHliJIpZAIBDxYCHwAFFOihjOaUv%2BePre%2B8mjEyMDgwMjExZAIJDzwrAAsBAA8WCB4IRGF0YUtleXMWAB4LXyFJdGVtQ291bnQCEB4JUGFnZUNvdW50AgEeFV8hRGF0YVNvdXJjZUl0ZW1Db3VudAIQZBYCZg9kFiACAQ9kFhxmDw8WAh4EVGV4dAUeKDIwMTMtMjAxNC0xKS1BMDcxNDA0MC00MTM2Ni0xZGQCAQ8PFgIfBQUJMjAxMy0yMDE0ZGQCAg8PFgIfBQUBMWRkAgMPDxYCHwUFCEEwNzE0MDQwZGQCBA8PFgIfBQUY5qaC546H6K665LiO5pWw55CG57uf6K6hZGQCBQ8PFgIfBQUM5YWs5YWx5b%2BF5L%2BuZGQCBg8PFgIfBQUGJm5ic3A7ZGQCBw8PFgIfBQUDMy4wZGQCCA8PFgIfBQUCNzZkZAIJDw8WAh8FBQYmbmJzcDtkZAIKDw8WAh8FBQYmbmJzcDtkZAILDw8WAh8FBQnnkIblrabpmaJkZAIMDw8WAh8FBQYmbmJzcDtkZAINDw8WAh8FBQYmbmJzcDtkZAICD2QWHGYPDxYCHwUFHigyMDEzLTIwMTQtMSktQTIzMDEwMTEtNDA5MjQtMmRkAgEPDxYCHwUFCTIwMTMtMjAxNGRkAgIPDxYCHwUFATFkZAIDDw8WAh8FBQhBMjMwMTAxMWRkAgQPDxYCHwUFPeavm%2BazveS4nOaAneaDs%2BWSjOS4reWbveeJueiJsuekvuS8muS4u%2BS5ieeQhuiuuuS9k%2Bezu%2BamguiuujFkZAIFDw8WAh8FBQzlhazlhbHlv4Xkv65kZAIGDw8WAh8FBQYmbmJzcDtkZAIHDw8WAh8FBQMzLjBkZAIIDw8WAh8FBQI4OGRkAgkPDxYCHwUFBiZuYnNwO2RkAgoPDxYCHwUFBiZuYnNwO2RkAgsPDxYCHwUFFemprOWFi%2BaAneS4u%2BS5ieWtpumZomRkAgwPDxYCHwUFBiZuYnNwO2RkAg0PDxYCHwUFBiZuYnNwO2RkAgMPZBYcZg8PFgIfBQUeKDIwMTMtMjAxNC0xKS1XMDAwMTEzMS0wNzAzMy0xZGQCAQ8PFgIfBQUJMjAxMy0yMDE0ZGQCAg8PFgIfBQUBMWRkAgMPDxYCHwUFCFcwMDAxMTMxZGQCBA8PFgIfBQUl5aSn5a2m55Sf6IGM5Lia5Y%2BR5bGV5LiO5bCx5Lia5oyH5a%2B8MWRkAgUPDxYCHwUFDOivvuWkluW%2FheS%2FrmRkAgYPDxYCHwUFBiZuYnNwO2RkAgcPDxYCHwUFAzEuMGRkAggPDxYCHwUFAjg4ZGQCCQ8PFgIfBQUGJm5ic3A7ZGQCCg8PFgIfBQUGJm5ic3A7ZGQCCw8PFgIfBQUP5oub55Sf5bCx5Lia5aSEZGQCDA8PFgIfBQUGJm5ic3A7ZGQCDQ8PFgIfBQUGJm5ic3A7ZGQCBA9kFhxmDw8WAh8FBR4oMjAxMy0yMDE0LTEpLVcwMDAxMDMxLTA3MDMzLTFkZAIBDw8WAh8FBQkyMDEzLTIwMTRkZAICDw8WAh8FBQExZGQCAw8PFgIfBQUIVzAwMDEwMzFkZAIEDw8WAh8FBRDlvaLlir%2FkuI7mlL%2FnrZYxZGQCBQ8PFgIfBQUM6K%2B%2B5aSW5b%2BF5L%2BuZGQCBg8PFgIfBQUGJm5ic3A7ZGQCBw8PFgIfBQUDMC41ZGQCCA8PFgIfBQUCOTNkZAIJDw8WAh8FBQYmbmJzcDtkZAIKDw8WAh8FBQYmbmJzcDtkZAILDw8WAh8FBRXpqazlhYvmgJ3kuLvkuYnlrabpmaJkZAIMDw8WAh8FBQYmbmJzcDtkZAINDw8WAh8FBQYmbmJzcDtkZAIFD2QWHGYPDxYCHwUFHigyMDEzLTIwMTQtMSktUzA4MDIzMDAtNDA5NzAtMWRkAgEPDxYCHwUFCTIwMTMtMjAxNGRkAgIPDxYCHwUFATFkZAIDDw8WAh8FBQhTMDgwMjMwMGRkAgQPDxYCHwUFD01BVExBQuS4juS7v%2Becn2RkAgUPDxYCHwUFBuWunui3tWRkAgYPDxYCHwUFBiZuYnNwO2RkAgcPDxYCHwUFAzEuMGRkAggPDxYCHwUFAjk1ZGQCCQ8PFgIfBQUGJm5ic3A7ZGQCCg8PFgIfBQUGJm5ic3A7ZGQCCw8PFgIfBQUS6YCa5L%2Bh5bel56iL5a2m6ZmiZGQCDA8PFgIfBQUGJm5ic3A7ZGQCDQ8PFgIfBQUGJm5ic3A7ZGQCBg9kFhxmDw8WAh8FBR4oMjAxMy0yMDE0LTEpLVMwNDAzMjAwLTA1MDMwLTRkZAIBDw8WAh8FBQkyMDEzLTIwMTRkZAICDw8WAh8FBQExZGQCAw8PFgIfBQUIUzA0MDMyMDBkZAIEDw8WAh8FBRvohInlhrLkuI7mlbDlrZfnlLXot6%2Flrp7pqoxkZAIFDw8WAh8FBQblrp7ot7VkZAIGDw8WAh8FBQYmbmJzcDtkZAIHDw8WAh8FBQMxLjBkZAIIDw8WAh8FBQbkuK3nrYlkZAIJDw8WAh8FBQYmbmJzcDtkZAIKDw8WAh8FBQYmbmJzcDtkZAILDw8WAh8FBRLnlLXlrZDkv6Hmga%2FlrabpmaJkZAIMDw8WAh8FBQYmbmJzcDtkZAINDw8WAh8FBQYmbmJzcDtkZAIHD2QWHGYPDxYCHwUFHigyMDEzLTIwMTQtMSktUzEwMDIyNTAtMDYwNDktMWRkAgEPDxYCHwUFCTIwMTMtMjAxNGRkAgIPDxYCHwUFATFkZAIDDw8WAh8FBQhTMTAwMjI1MGRkAgQPDxYCHwUFGOaVsOaNrue7k%2BaehOivvueoi%2BiuvuiuoWRkAgUPDxYCHwUFBuWunui3tWRkAgYPDxYCHwUFBiZuYnNwO2RkAgcPDxYCHwUFAzEuMGRkAggPDxYCHwUFAjg0ZGQCCQ8PFgIfBQUGJm5ic3A7ZGQCCg8PFgIfBQUGJm5ic3A7ZGQCCw8PFgIfBQUP6K6h566X5py65a2m6ZmiZGQCDA8PFgIfBQUGJm5ic3A7ZGQCDQ8PFgIfBQUGJm5ic3A7ZGQCCA9kFhxmDw8WAh8FBR4oMjAxMy0yMDE0LTEpLVMwODA2MzAwLTA3MDIzLTdkZAIBDw8WAh8FBQkyMDEzLTIwMTRkZAICDw8WAh8FBQExZGQCAw8PFgIfBQUIUzA4MDYzMDBkZAIEDw8WAh8FBRVDKyvnqIvluo%2Forr7orqHlrp7pqoxkZAIFDw8WAh8FBQzlrp7ot7XpgInkv65kZAIGDw8WAh8FBQYmbmJzcDtkZAIHDw8WAh8FBQMxLjBkZAIIDw8WAh8FBQbkvJjnp4BkZAIJDw8WAh8FBQYmbmJzcDtkZAIKDw8WAh8FBQYmbmJzcDtkZAILDw8WAh8FBRLpgJrkv6Hlt6XnqIvlrabpmaJkZAIMDw8WAh8FBQYmbmJzcDtkZAINDw8WAh8FBQYmbmJzcDtkZAIJD2QWHGYPDxYCHwUFHigyMDEzLTIwMTQtMSktQTExMDEwMTUtNDA0NjYtNmRkAgEPDxYCHwUFCTIwMTMtMjAxNGRkAgIPDxYCHwUFATFkZAIDDw8WAh8FBQhBMTEwMTAxNWRkAgQPDxYCHwUFB%2BiLseivrTNkZAIFDw8WAh8FBQzlpJbor63mqKHlnZdkZAIGDw8WAh8FBQYmbmJzcDtkZAIHDw8WAh8FBQMyLjBkZAIIDw8WAh8FBQI3MmRkAgkPDxYCHwUFBiZuYnNwO2RkAgoPDxYCHwUFBiZuYnNwO2RkAgsPDxYCHwUFD%2BWkluWbveivreWtpumZomRkAgwPDxYCHwUFBiZuYnNwO2RkAg0PDxYCHwUFBiZuYnNwO2RkAgoPZBYcZg8PFgIfBQUeKDIwMTMtMjAxNC0xKS1UMTMwMDAxOS00MDczMS00ZGQCAQ8PFgIfBQUJMjAxMy0yMDE0ZGQCAg8PFgIfBQUBMWRkAgMPDxYCHwUFCFQxMzAwMDE5ZGQCBA8PFgIfBQUV5L2T6IKyLeS5kuS5k%2BeQgyjnlLcpZGQCBQ8PFgIfBQUM5qCh5a6a5b%2BF5L%2BuZGQCBg8PFgIfBQUGJm5ic3A7ZGQCBw8PFgIfBQUDMS4wZGQCCA8PFgIfBQUCNjRkZAIJDw8WAh8FBQYmbmJzcDtkZAIKDw8WAh8FBQYmbmJzcDtkZAILDw8WAh8FBRjkvZPogrLkuI7oibrmnK%2FmlZnlrabpg6hkZAIMDw8WAh8FBQYmbmJzcDtkZAINDw8WAh8FBQYmbmJzcDtkZAILD2QWHGYPDxYCHwUFHigyMDEzLTIwMTQtMSktQTA3MTUwMTItNDAyMjEtMmRkAgEPDxYCHwUFCTIwMTMtMjAxNGRkAgIPDxYCHwUFATFkZAIDDw8WAh8FBQhBMDcxNTAxMmRkAgQPDxYCHwUFDeWkp%2BWtpueJqeeQhjJkZAIFDw8WAh8FBQzlrabnp5Hlv4Xkv65kZAIGDw8WAh8FBQYmbmJzcDtkZAIHDw8WAh8FBQMzLjBkZAIIDw8WAh8FBQI3N2RkAgkPDxYCHwUFBiZuYnNwO2RkAgoPDxYCHwUFBiZuYnNwO2RkAgsPDxYCHwUFCeeQhuWtpumZomRkAgwPDxYCHwUFBiZuYnNwO2RkAg0PDxYCHwUFBiZuYnNwO2RkAgwPZBYcZg8PFgIfBQUeKDIwMTMtMjAxNC0xKS1BMDcxODAzMC0wNDAzNy0xZGQCAQ8PFgIfBQUJMjAxMy0yMDE0ZGQCAg8PFgIfBQUBMWRkAgMPDxYCHwUFCEEwNzE4MDMwZGQCBA8PFgIfBQUb5aSn5a2m54mp55CG5a6e6aqM77yI5LmZ77yJZGQCBQ8PFgIfBQUM5a2m56eR5b%2BF5L%2BuZGQCBg8PFgIfBQUGJm5ic3A7ZGQCBw8PFgIfBQUDMS4wZGQCCA8PFgIfBQUCODNkZAIJDw8WAh8FBQYmbmJzcDtkZAIKDw8WAh8FBQYmbmJzcDtkZAILDw8WAh8FBQnnkIblrabpmaJkZAIMDw8WAh8FBQYmbmJzcDtkZAINDw8WAh8FBQYmbmJzcDtkZAIND2QWHGYPDxYCHwUFHigyMDEzLTIwMTQtMSktQTA0MDIyNjAtNDAxNTktMWRkAgEPDxYCHwUFCTIwMTMtMjAxNGRkAgIPDxYCHwUFATFkZAIDDw8WAh8FBQhBMDQwMjI2MGRkAgQPDxYCHwUFFeiEieWGsuS4juaVsOWtl%2BeUtei3r2RkAgUPDxYCHwUFDOWtpuenkeW%2FheS%2FrmRkAgYPDxYCHwUFBiZuYnNwO2RkAgcPDxYCHwUFAzMuMGRkAggPDxYCHwUFAjYyZGQCCQ8PFgIfBQUGJm5ic3A7ZGQCCg8PFgIfBQUGJm5ic3A7ZGQCCw8PFgIfBQUS55S15a2Q5L%2Bh5oGv5a2m6ZmiZGQCDA8PFgIfBQUGJm5ic3A7ZGQCDQ8PFgIfBQUGJm5ic3A7ZGQCDg9kFhxmDw8WAh8FBR4oMjAxMy0yMDE0LTEpLUEwODA1MzcwLTQwMTIwLTFkZAIBDw8WAh8FBQkyMDEzLTIwMTRkZAICDw8WAh8FBQExZGQCAw8PFgIfBQUIQTA4MDUzNzBkZAIEDw8WAh8FBRjkv6Hmga%2FlronlhajmlbDlrabln7rnoYBkZAIFDw8WAh8FBQzlrabnp5Hlv4Xkv65kZAIGDw8WAh8FBQYmbmJzcDtkZAIHDw8WAh8FBQM0LjBkZAIIDw8WAh8FBQI5NmRkAgkPDxYCHwUFBiZuYnNwO2RkAgoPDxYCHwUFBiZuYnNwO2RkAgsPDxYCHwUFEumAmuS%2FoeW3peeoi%2BWtpumZomRkAgwPDxYCHwUFBiZuYnNwO2RkAg0PDxYCHwUFBiZuYnNwO2RkAg8PZBYcZg8PFgIfBQUeKDIwMTMtMjAxNC0xKS1BMDUwNzAyMC0wNjA0OS0xZGQCAQ8PFgIfBQUJMjAxMy0yMDE0ZGQCAg8PFgIfBQUBMWRkAgMPDxYCHwUFCEEwNTA3MDIwZGQCBA8PFgIfBQUV5pWw5o2u57uT5p6E77yI55Sy77yJZGQCBQ8PFgIfBQUM5LiT5Lia5b%2BF5L%2BuZGQCBg8PFgIfBQUGJm5ic3A7ZGQCBw8PFgIfBQUDNC4wZGQCCA8PFgIfBQUCNjBkZAIJDw8WAh8FBQYmbmJzcDtkZAIKDw8WAh8FBQYmbmJzcDtkZAILDw8WAh8FBQ%2ForqHnrpfmnLrlrabpmaJkZAIMDw8WAh8FBQYmbmJzcDtkZAINDw8WAh8FBQYmbmJzcDtkZAIQD2QWHGYPDxYCHwUFHigyMDEzLTIwMTQtMSktQjA4MDYyNzAtMDcwMjMtMWRkAgEPDxYCHwUFCTIwMTMtMjAxNGRkAgIPDxYCHwUFATFkZAIDDw8WAh8FBQhCMDgwNjI3MGRkAgQPDxYCHwUFD0MrK%2Beoi%2BW6j%2BiuvuiuoWRkAgUPDxYCHwUFDOS4k%2BS4mumZkOmAiWRkAgYPDxYCHwUFBiZuYnNwO2RkAgcPDxYCHwUFAzIuMGRkAggPDxYCHwUFAjkzZGQCCQ8PFgIfBQUGJm5ic3A7ZGQCCg8PFgIfBQUGJm5ic3A7ZGQCCw8PFgIfBQUS6YCa5L%2Bh5bel56iL5a2m6ZmiZGQCDA8PFgIfBQUGJm5ic3A7ZGQCDQ8PFgIfBQUGJm5ic3A7ZGRk&__EVENTVALIDATION=%2FwEWFgLwu7O6DgKOwemfDgKOwemfDgKc6PHxDgKf6O1nApbomfIPApnotegBApjoofIMApvo3egOApLoyfINApXopYsNAprozbADAsCqyt4FAsOqjp8DAsKqkt8CAt2q1h8C3Kq63wMC%2F8Dpnw4C%2F8Dpnw4C8K%2FD8QIC8a%2FD8QIC8JLJog4%3D&ddlxn=".$xn."&ddlxq=".$xq."&btnCx=+%B2%E9++%D1%AF+";
        $ch = curl_init($url);
        curl_setopt($ch,CURLOPT_HEADER,0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);//0显示,1不显示

        curl_setopt($ch, CURLOPT_HTTPHEADER, array("Referer:http://cas.hdu.edu.cn/cas/login"));
        curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file);//使用cookie
        $data = curl_exec($ch);
        $info = curl_getinfo($ch);
        if ($info['http_code'] == '302') {
            return false;
        }
        return true;
    }

    public function check(){
        if ($this->verify()){
            return TRUE;
        }else{
            return FALSE;
        }
    }

    function __destruct(){

    }
}
