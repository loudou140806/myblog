<?php
return array(
	//'配置项'=>'配置值'
//    'maxSize'    =>    3145728,
//    'rootPath'   =>    './Public/uploads/',
//    'savePath'   =>    '',
//    'saveName'   =>    'com_create_guid',
//    'exts'       =>    array('jpg', 'gif', 'png', 'jpeg'),
//    'autoSub'    =>    true,
//    'subName'    =>    array('date','Ymd'),
    'UPLOAD_SITEIMG_QINIU' => array (
        'maxSize' => 5 * 1024 * 1024,//文件大小
        'rootPath' => './Public/uploads/',
        'exts'     =>   array('jpg', 'gif', 'png', 'jpeg'),
        'saveName' => 'com_create_guid',
        'subName'    => 'default',
        'driver' => 'Qiniu',
        'driverConfig' => array (
            'secrectKey' => 'SA-7BcL3a2flE4mpCP_ggul_wTZvwMiF2GKvn0sA',
            'accessKey' => '2gktQG-lAlb8heQKTN6qFtfw-gpz55qAbQz39S4a',
            'domain' => 'flea.qiniudn.com',
            'bucket' => 'flea',
        )

    )
);