<?php
namespace Home\Controller;
use Think\Controller;
use Think\Upload;
class FileController extends Controller
{
    public function index()
    {
        $this->display('Goods:upload');
    }

    public function upload()
    {
        $setting=C('UPLOAD_SITEIMG_QINIU');
        $Upload = new \Think\Upload($setting);
        $info = $Upload->upload($_FILES);

        if (!$info) {// 上传错误提示错误信息
            $this->error($Upload->getError());
        } else {// 上传成功
            $this->success('上传成功！');
        }
        $model = M('Goods');
        // 取得成功上传的文件信息

        $data['photo'] = $info[0]['savename'];
        $data['create_time'] = NOW_TIME;
        $model->add($data);

    }
}
