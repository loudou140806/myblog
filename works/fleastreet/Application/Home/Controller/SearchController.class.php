<?php
namespace Home\Controller;
use Think\Controller;
use Vendor\Phpanalysis;
class SearchController extends Controller {
    public function index(){
        $this->display('index');
    }
    public function search(){
        if(IS_POST && isset($_POST['search'])){
            $str = $_POST['searchcontent'];
            if(empty($str)){
                $this->error('搜索不为空','index');
            }
            vendor('Phpanalysis');

            ini_set('display_errors', 'On');
            ini_set('memory_limit', '64M');
            error_reporting(E_ALL);

            header('Content-Type: text/html; charset=utf-8');

            $do_fork = $do_unit = true;
            $do_multi = $do_prop = $pri_dict = false;

            //初始化类
            $pa = new Phpanalysis('utf-8', 'utf-8', $pri_dict);

            //载入词典
            $pa->LoadDict();

            //执行分词
            $str = $pa->strFilter($str);
            $pa->SetSource($str);
            $pa->differMax = $do_multi;
            $pa->unitWord = $do_unit;

            $pa->StartAnalysis($do_fork);

            $result = $pa->GetFinallyResult(' ', $do_prop);
            $result = ltrim($result);
            $result = explode(' ',$result);
            $count = count($result);
            //分词结束
            $user = M('hdu_shop');
            for($i=0;$i<$count;$i++){
                $result[$i] = '%'.$result[$i].'%';
            }
            $where['description'] = array('like',$result,'OR');
            $out = $user->where($where)->select();
            if(empty($out)){
                $this->error('查询失败','index');
            }

            $this->assign('result',$out);
            $this->display('search');
        }else{
            $this->error('搜索失败','index');
        }
    }
}