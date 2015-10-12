//调用插件
$(function(){
  $("#test").ProvinceCity();
});
$.fn.ProvinceCity = function(){
    var _self = this;
    //定义3个默认值
    _self.data("province",["请选择", "请选择"]);
    _self.data("city1",["请选择", "请选择"]);
    _self.data("city2",["请选择", "请选择"]);
    //插入3个空的下拉框
    _self.append("<select></select>");
    _self.append("<select></select>");
    _self.append("<select></select>");
    //分别获取3个下拉框
    var $sel1 = _self.find("select").eq(0);
    var $sel2 = _self.find("select").eq(1);
    var $sel3 = _self.find("select").eq(2);
    //默认省级下拉
    if(_self.data("province")){
        $sel1.append("<option value='"+_self.data("province")[1]+"'>"+_self.data("province")[0]+"</option>");
    }
    $.each( GP , function(index,data){
        $sel1.append("<option value='"+data+"'>"+data+"</option>");
    });
    //默认的1级城市下拉
    if(_self.data("city1")){
        $sel2.append("<option value='"+_self.data("city1")[1]+"'>"+_self.data("city1")[0]+"</option>");
    }
    //默认的2级城市下拉
    if(_self.data("city2")){
        $sel3.append("<option value='"+_self.data("city2")[1]+"'>"+_self.data("city2")[0]+"</option>");
    }
    //省级联动 控制
    var index1 = "" ;
    $sel1.change(function(){
        //清空其它2个下拉框
        $sel2[0].options.length=0;
        $sel3[0].options.length=0;
        index1 = this.selectedIndex;
        if(index1==0){  //当选择的为 “请选择” 时
            if(_self.data("city1")){
                $sel2.append("<option value='"+_self.data("city1")[1]+"'>"+_self.data("city1")[0]+"</option>");
            }
            if(_self.data("city2")){
                $sel3.append("<option value='"+_self.data("city2")[1]+"'>"+_self.data("city2")[0]+"</option>");
            }
        }else{
            $.each( GT[index1-1] , function(index,data){
                $sel2.append("<option value='"+data+"'>"+data+"</option>");
            });
            $.each( GC[index1-1][0] , function(index,data){
                $sel3.append("<option value='"+data+"'>"+data+"</option>");
            })
        }
    }).change();
    //1级城市联动 控制
    var index2 = "" ;
    $sel2.change(function(){
        $sel3[0].options.length=0;
        index2 = this.selectedIndex;
        $.each( GC[index1-1][index2] , function(index,data){
            $sel3.append("<option value='"+data+"'>"+data+"</option>");
        })
    });
    return _self;
};

/********** 省级数据 **********/
var GP =['安徽','澳门','北京','福建','甘肃','广东','广西','贵州','海南','河北','河南','黑龙江','湖北','湖南','吉林','江苏','江西','辽宁','内蒙古','宁夏','青海','山东','山西','陕西','上海','四川','台湾','天津','西藏','香港','新疆','云南','浙江','重庆','海外'];
/********** 市级数据 **********/
var GT = [
['合肥','安庆','蚌埠','亳州','巢湖','池州','滁州','阜阳','淮北','淮南','黄山','六安','马鞍山','宿州','铜陵','芜湖','宣城'],
['澳门'],
['昌平','朝阳','崇文','大兴','东城','房山','丰台','海淀','怀柔','门头沟','密云','平谷','石景山','顺义','通州','西城','宣武','延庆'],
['福州','龙岩','南平','宁德','莆田','泉州','三明','厦门','漳州'],
['兰州','白银','定西','甘南','嘉峪关','金昌','酒泉','临夏','陇南','平凉','庆阳','天水','武威','张掖'],
['广州','潮州','东莞','佛山','河源','惠州','江门','揭阳','茂名','梅州','清远','汕头','汕尾','韶关','深圳','阳江','云浮','湛江','肇庆','中山','珠海'],
['桂林','百色','北海','崇左','防城港','贵港','河池','贺州','来宾','柳州','南宁','钦州','梧州','玉林'],
['贵阳','安顺','毕节','六盘水','黔东南','黔南','黔西南','铜仁','遵义'],
['海口','白沙','保亭','昌江','澄迈','儋州','定安','东方','乐东','临高','陵水','南沙群岛','琼海','琼中','三亚','屯昌','万宁','文昌','五指山','西沙群岛','中沙群岛'],
['石家庄','保定','沧州','承德','邯郸','衡水','廊坊','秦皇岛','唐山','邢台','张家口'],
['郑州','安阳','鹤壁','焦作','开封','洛阳','漯河','南阳','平顶山','濮阳','三门峡','商丘','新乡','信阳','许昌','周口','驻马店'],
['哈尔滨','大庆','大兴安岭','鹤岗','黑河','鸡西','佳木斯','牡丹江','七台河','齐齐哈尔','双鸭山','绥化','伊春'],
['武汉','鄂州','恩施','黄冈','黄石','荆门','荆州','潜江','神农架','十堰','随州','天门','仙桃','咸宁','襄樊','孝感','宜昌'],
['长沙','常德','郴州','衡阳','怀化','娄底','邵阳','湘潭','湘西','益阳','永州','岳阳','张家界','株洲'],
['长春','白城','白山','吉林','辽源','四平','松原','通化','延边'],
['南京','常州','淮安','连云港','南通','苏州','宿迁','泰州','无锡','徐州','盐城','扬州','镇江'],
['南昌','抚州','赣州','吉安','景德镇','九江','萍乡','上饶','新余','宜春','鹰潭'],
['沈阳','鞍山','本溪','朝阳','大连','丹东','抚顺','阜新','葫芦岛','锦州','辽阳','盘锦','铁岭','营口'],
['呼和浩特','阿拉善','巴彦淖尔','包头','赤峰','鄂尔多斯','呼伦贝尔','通辽','乌海','乌兰察布','锡林郭勒','兴安'],
['银川','固原','石嘴山','吴忠','中卫'],
['西宁','果洛','海北','海东','海南','海西','黄南','玉树'],
['济南','滨州','德州','东营','菏泽','济宁','莱芜','聊城','临沂','青岛','日照','泰安','威海','潍坊','烟台','枣庄','淄博'],
['太原','长治','大同','晋城','晋中','临汾','吕梁','朔州','忻州','阳泉','运城'],
['西安','安康','宝鸡','汉中','商洛','铜川','渭南','咸阳','延安','榆林'],
['宝山','长宁','崇明','奉贤','虹口','黄浦','嘉定','金山','静安','卢湾','闵行','南汇','浦东','普陀','青浦','松江','徐汇','杨浦','闸北'],
['成都','阿坝','巴中','达州','德阳','甘孜','广安','广元','乐山','凉山','泸州','眉山','绵阳','内江','南充','攀枝花','遂宁','雅安','宜宾','资阳','自贡'],
['台北','阿莲','安定','安平','八德','八里','白河','白沙','板桥','褒忠','宝山','卑南','北斗','北港','北门','北埔','北投','补子','布袋','草屯','长宾','长治','潮州','车城','成功','城中区','池上','春日','刺桐','高雄','花莲','基隆','嘉义','苗栗','南投','屏东','台东','台南','台中','桃园','新竹','宜兰','彰化'],
['宝坻','北辰','大港','东丽','汉沽','和平','河北','河东','河西','红桥','蓟县','津南','静海','南开','宁河','塘沽','武清','西青'],
['拉萨','阿里','昌都','林芝','那曲','日喀则','山南'],
['北区','大埔区','东区','观塘区','黄大仙区','九龙','葵青区','离岛区','南区','荃湾区','沙田区','深水埗区','屯门区','湾仔区','西贡区','香港','新界','油尖旺区','元朗区','中西区'],
['乌鲁木齐','阿克苏','阿拉尔','阿勒泰','巴音郭楞','博尔塔拉','昌吉','哈密','和田','喀什','克拉玛依','克孜勒苏柯尔克孜','石河子','塔城','图木舒克','吐鲁番','五家渠','伊犁'],
['昆明','保山','楚雄','大理','德宏','迪庆','红河','丽江','临沧','怒江','曲靖','思茅','文山','西双版纳','玉溪','昭通'],
['杭州','湖州','嘉兴','金华','丽水','宁波','衢州','绍兴','台州','温州','舟山'],
['巴南','北碚','璧山','长寿','城口','大渡口','大足','垫江','丰都','奉节','涪陵','合川','江北','江津','九龙坡','开县','梁平','南岸','南川','彭水','綦江','黔江','荣昌','沙坪坝','石柱','双桥','铜梁','潼南','万盛','万州','巫山','巫溪','武隆','秀山','永川','酉阳','渝北','渝中','云阳','忠县'],
['阿根廷','埃及','爱尔兰','奥地利','奥克兰','澳大利亚','巴基斯坦','巴西','保加利亚','比利时','冰岛','朝鲜','丹麦','德国','俄罗斯','法国','菲律宾','芬兰','哥伦比亚','韩国','荷兰','加拿大','柬埔寨','喀麦隆','老挝','卢森堡','罗马尼亚','马达加斯加','马来西亚','毛里求斯','美国','秘鲁','缅甸','墨西哥','南非','尼泊尔','挪威','葡萄牙','其它地区','日本','瑞典','瑞士','斯里兰卡','泰国','土耳其','委内瑞拉','文莱','乌克兰','西班牙','希腊','新加坡','新西兰','匈牙利','以色列','意大利','印度','印度尼西亚','英国','越南','智利']
];
/********** 市二级数据 **********/
var GC =
[
[
['长丰','肥东','肥西','合肥市'],
['安庆市','枞阳','怀宁','潜山','宿松','太湖','桐城','望江','岳西'],
['蚌埠市','固镇','怀远','五河'],
['亳州市','利辛','蒙城','涡阳'],
['巢湖市','含山','和县','庐江','无为'],
['池州市','东至','青阳','石台'],
['滁州市','定远','凤阳','来安','明光','全椒','天长'],
['阜南','阜阳市','界首','临泉','太和','颍上'],
['淮北市','濉溪'],
['凤台','淮南市'],
['黄山市','祁门','歙县','休宁','黟县'],
['霍邱','霍山','金寨','六安市','寿县','舒城'],
['当涂','马鞍山市'],
['砀山','灵璧','泗县','宿州市','萧县'],
['铜陵市','铜陵县'],
['繁昌','南陵','芜湖市','芜湖县'],
['广德','绩溪','泾县','旌德','郎溪','宁国','宣城市']
],
[
['澳门']
],
[
['昌平'],
['朝阳'],
['崇文'],
['大兴'],
['东城'],
['房山'],
['丰台'],
['海淀'],
['怀柔'],
['门头沟'],
['密云'],
['平谷'],
['石景山'],
['顺义'],
['通州'],
['西城'],
['宣武'],
['延庆']
],
[
['长乐','福清','福州市','连江','罗源','闽侯','闽清','平潭','永泰'],
['长汀','连城','龙岩市','上杭','武平','永定','漳平'],
['光泽','建瓯','建阳','南平市','浦城','邵武','顺昌','松溪','武夷山','政和'],
['福安','福鼎','古田','宁德市','屏南','寿宁','霞浦','柘荣','周宁'],
['莆田市','仙游'],
['安溪','德化','惠安','金门','晋江','南安','泉州市','石狮','永春'],
['大田','建宁','将乐','明溪','宁化','清流','三明市','沙县','泰宁','永安','尤溪'],
['厦门市'],
['长泰','东山','华安','龙海','南靖','平和','云霄','漳浦','漳州市','诏安']
],
[
['皋兰','兰州市','永登','榆中'],
['白银市','会宁','景泰','靖远'],
['定西市','临洮','陇西','岷县','通渭','渭源','漳县'],
['迭部','合作','临潭','碌曲','玛曲','夏河','舟曲','卓尼'],
['嘉峪关市'],
['金昌市','永昌'],
['阿克塞','敦煌','瓜州','金塔','酒泉市','肃北','玉门'],
['东乡族','广河','和政','积石山','康乐','临夏市','临夏县','永靖'],
['成县','宕昌','徽县','康县','礼县','两当','陇南市','文县','西和'],
['崇信','华亭','泾川','静宁','灵台','平凉市','庄浪'],
['合水','华池','环县','宁县','庆城','庆阳市','镇原','正宁'],
['甘谷','秦安','清水','天水市','武山','张家川'],
['古浪','民勤','天祝','武威市'],
['高台','临泽','民乐','山丹','肃南','张掖市']
],
[
['从化','广州市','增城'],
['潮安','潮州市','饶平'],
['东莞'],
['佛山市'],
['东源','和平','河源市','连平','龙川','紫金'],
['博罗','惠东','惠州市','龙门'],
['恩平','鹤山','江门市','开平','台山'],
['惠来','揭东','揭西','揭阳市','普宁'],
['电白','高州','化州','茂名市','信宜'],
['大埔','丰顺','蕉岭','梅县','梅州市','平远','五华','兴宁'],
['佛冈','连南','连山','连州','清新','清远市','阳山','英德'],
['南澳','汕头市'],
['海丰','陆丰','陆河','汕尾市'],
['乐昌','南雄','仁化','乳源','韶关市','始兴','翁源','新丰'],
['深圳市'],
['阳春','阳东','阳江市','阳西'],
['罗定','新兴','郁南','云安','云浮市'],
['雷州','廉江','遂溪','吴川','徐闻','湛江市'],
['德庆','封开','高要','广宁','怀集','四会','肇庆市'],
['中山市'],
['珠海市']
],
[
['恭城','灌阳','桂林市','荔蒲','临桂','灵川','龙胜','平乐','全州','兴安','阳朔','永福','资源'],
['百色市','德保','靖西','乐业','凌云','隆林','那坡','平果','田东','田林','田阳','西林'],
['北海市','合浦'],
['崇左市','大新','扶绥','龙州','宁明','凭祥','天等'],
['东兴','防城港市','上思'],
['贵港市','桂平','平南'],
['巴马','大化','东兰','都安','凤山','河池市','环江','罗城','南丹','天峨','宜州'],
['富川','贺州市','昭平','钟山'],
['合山','金秀','来宾市','武宣','象州','忻城'],
['柳城','柳江','柳州市','鹿寨','融安','融水','三江'],
['宾阳','横县','隆安','马山','南宁市','上林','武鸣'],
['灵山','浦北','钦州市'],
['苍梧','岑溪','蒙山','藤县','梧州市'],
['北流','博白','陆川','容县','兴业','玉林市']
],
[
['贵阳市','开阳','清镇','息烽','修文'],
['安顺市','关岭','平坝','普定','镇宁','紫云'],
['毕节市','大方','赫章','金沙','纳雍','黔西','威宁','织金'],
['六盘水市','六枝','盘县','水城'],
['岑巩','从江','丹寨','黄平','剑河','锦屏','凯里','雷山','黎平','麻江','榕江','三穗','施秉','台江','天柱','镇远'],
['长顺','都匀','独山','福泉','贵定','惠水','荔波','龙里','罗甸','平塘','三都','瓮安'],
['安龙','册亨','普安','晴隆','望谟','兴仁','兴义','贞丰'],
['德江','江口','石阡','思南','松桃','铜仁市','万山','沿河','印江','玉屏'],
['赤水','道真','凤冈','湄潭','仁怀','绥阳','桐梓','务川','习水','余庆','正安','遵义市','遵义县']
],
[
['海口'],
['白沙'],
['保亭'],
['昌江'],
['澄迈'],
['儋州'],
['定安'],
['东方'],
['乐东'],
['临高'],
['陵水'],
['南沙群岛'],
['琼海'],
['琼中'],
['三亚'],
['屯昌'],
['万宁'],
['文昌'],
['五指山'],
['西沙群岛'],
['中沙群岛']
],
[
['藁城','晋州','井陉','灵寿','鹿泉','栾城','平山','深泽','石家庄市','无极','辛集','新乐','行唐','元氏','赞皇','赵县','正定','高邑'],
['安国','安新','保定市','博野','定兴','定州','阜平','高碑店','高阳','涞水','涞源','蠡县','满城','清苑','曲阳','容城','顺平','唐县','望都','雄县','徐水','易县','涿州'],
['泊头','沧县','沧州市','东光','海兴','河间','黄骅','孟村','南皮','青县','任丘','肃宁','吴桥','献县','盐山'],
['承德市','承德县','丰宁','宽城','隆化','滦平','平泉','围场','兴隆'],
['成安','磁县','大名','肥乡','馆陶','广平','邯郸市','邯郸县','鸡泽','临漳','邱县','曲周','涉县','魏县','武安','永年'],
['安平','阜城','故城','衡水市','冀州','景县','饶阳','深州','武强','武邑','枣强'],
['霸州','大厂','大城','固安','廊坊市','三河','文安','香河','永清'],
['昌黎','抚宁','卢龙','秦皇岛市','青龙'],
['乐亭','滦南','滦县','迁安','迁西','唐海','唐山市','玉田','遵化'],
['柏乡','广宗','巨鹿','临城','临西','隆尧','内丘','南宫','南和','宁晋','平乡','清河','任县','沙河','威县','新河','邢台市','邢台县'],
['赤城','崇礼','沽源','怀安','怀来','康保','尚义','万全','蔚县','宣化','阳原','张北','张家口市','涿鹿']
],
[
['登封','巩义','新密','新郑','荥阳','郑州市','中牟'],
['安阳市','安阳县','滑县','林州','内黄','汤阴'],
['鹤壁市','浚县','淇县'],
['博爱','济源','焦作市','孟州','沁阳','温县','武陟','修武'],
['开封市','开封县','兰考','杞县','通许','尉氏'],
['栾川','洛宁','洛阳市','孟津','汝阳','嵩县','新安','偃师','伊川','宜阳'],
['临颍','漯河市','舞阳'],
['邓州','方城','内乡','南阳市','南召','社旗','唐河','桐柏','西峡','淅川','新野','镇平'],
['宝丰','郏县','鲁山','平顶山市','汝州','舞钢','叶县'],
['范县','南乐','濮阳市','濮阳县','清丰','台前'],
['灵宝','卢氏','三门峡市','陕县','渑池','义马'],
['民权','宁陵','商丘市','睢县','夏邑','永城','虞城','柘城'],
['长垣','封丘','辉县','获嘉','卫辉','新乡市','新乡县','延津','原阳'],
['固始','光山','淮滨','潢川','罗山','商城','息县','新县','信阳市'],
['长葛','襄城','许昌市','许昌县','鄢陵','禹州'],
['郸城','扶沟','淮阳','鹿邑','商水','沈丘','太康','西华','项城','周口市'],
['泌阳','平舆','确山','汝南','上蔡','遂平','西平','新蔡','正阳','驻马店市']
],
[
['巴彦','宾县','方正','哈尔滨市','木兰','尚志','双城','通河','五常','延寿','依兰'],
['大庆市','杜尔伯特','林甸','肇源','肇州'],
['呼玛','呼中','加格达奇','漠河','松岭','塔河','新林'],
['鹤岗市','萝北','绥滨'],
['北安','黑河市','嫩江','孙吴','五大连池','逊克'],
['虎林','鸡东','鸡西市','密山'],
['抚远','富锦','桦川','桦南','佳木斯市','汤原','同江'],
['东宁','海林','林口','牡丹江市','穆棱','宁安','绥芬河'],
['勃利','七台河'],
['拜泉','富裕','甘南','克东','克山','龙江','讷河','齐齐哈尔市','泰来','依安'],
['宝清','集贤','饶河','双鸭山市','友谊'],
['安达','海伦','兰西','明水','青冈','庆安','绥化市','绥棱','望奎','肇东'],
['嘉荫','铁力','伊春市']
],
[
['武汉市'],
['鄂州市'],
['巴东','恩施市','鹤峰','建始','来凤','利川','咸丰','宣恩'],
['红安','黄冈市','黄梅','罗田','麻城','蕲春','团风','武穴','浠水','英山'],
['大冶','黄石','阳新'],
['京山','荆门市','沙洋','钟祥'],
['公安','洪湖','监利','江陵','荆州市','石首','松滋'],
['潜江'],
['神农架'],
['丹江口','房县','十堰市','郧西','郧县','竹山','竹溪'],
['广水','随州市'],
['天门市'],
['仙桃市'],
['赤壁','崇阳','嘉鱼','通城','通山','咸宁市'],
['保康','谷城','老河口','南漳','襄樊市','宜城','枣阳'],
['安陆','大悟','汉川','孝昌','孝感市','应城','云梦'],
['长阳','当阳','五峰','兴山','宜昌市','宜都','远安','枝江','秭归']
],
[
['长沙市','长沙县','浏阳','宁乡','望城'],
['安乡','常德市','汉寿','津市','澧县','临澧','石门','桃源'],
['安仁','郴州市','桂东','桂阳','嘉禾','临武','汝城','宜章','永兴','资兴'],
['常宁','衡东','衡南','衡山','衡阳市','衡阳县','耒阳','祁东'],
['辰溪','洪江','怀化市','会同','靖州','麻阳','通道','新晃','溆浦','沅陵','芷江','中方'],
['冷水江','涟源','娄底市','双峰','新化'],
['城步','洞口','隆回','邵东','邵阳市','邵阳县','绥宁','武冈','新宁','新邵'],
['韶山','湘潭市','湘潭县','湘乡'],
['保靖','凤凰','古丈','花垣','吉首','龙山','泸溪','永顺'],
['安化','南县','桃江','益阳市','沅江'],
['道县','东安','江华','江永','蓝山','宁远','祁阳','双牌','新田','永州市'],
['华容','临湘','汨罗','平江','湘阴','岳阳市','岳阳县'],
['慈利','桑植','张家界市'],
['茶陵','醴陵','炎陵','攸县','株洲市','株洲县']
],
[
['长春市','德惠','九台','农安','榆树'],
['白城市','大安','洮南','通榆','镇赉'],
['白山','长白','抚松','靖宇','临江'],
['桦甸','吉林市','蛟河','磐石','舒兰','永吉'],
['东丰','东辽','辽源市'],
['公主岭','梨树','双辽','四平市','伊通'],
['长岭','扶余','前郭尔罗斯','乾安','松原市'],
['辉南','集安','柳河','梅河口','通化市','通化县'],
['延吉市','敦化','和龙','珲春','龙井','图们','汪清','安图']
],
[
['高淳','溧水','南京市'],
['常州市','金坛','溧阳'],
['洪泽','淮安市','金湖','涟水','盱眙'],
['东海','赣榆','灌南','灌云','连云港市'],
['海安','海门','南通市','启东','如东','如皋','通州'],
['常熟','昆山','苏州市','太仓','吴江','张家港'],
['沭阳','泗洪','泗阳','宿迁市'],
['姜堰','靖江','泰兴','泰州市','兴化'],
['江阴','无锡市','宜兴'],
['丰县','沛县','邳州','睢宁','铜山','新沂','徐州市'],
['滨海','大丰','东台','阜宁','建湖','射阳','响水','盐城市'],
['宝应','高邮','江都','扬州市','仪征'],
['丹阳','句容','扬中','镇江市']
],
[
['安义','进贤','南昌市','南昌县','新建'],
['崇仁','东乡','抚州市','广昌','金溪','乐安','黎川','南城','南丰','宜黄','资溪'],
['安远','崇义','大余','定南','赣县','赣州市','会昌','龙南','南康','宁都','全南','瑞金','上犹','石城','信丰','兴国','寻乌','于都'],
['安福','吉安市','吉安县','吉水','井冈山','遂川','泰和','万安','峡江','新干','永丰','永新'],
['浮梁','景德镇市','乐平'],
['德安','都昌','湖口','九江市','九江县','彭泽','瑞昌','武宁','星子','修水','永修'],
['莲花','芦溪','萍乡市','上栗'],
['德兴','广丰','横峰','鄱阳','铅山','上饶市','上饶县','万年','婺源','弋阳','余干','玉山'],
['分宜','新余市'],
['丰城','奉新','高安','靖安','上高','铜鼓','万载','宜春市','宜丰','樟树'],
['贵溪','鹰潭市','余江']
],
[
['法库','康平','辽中','沈阳市','新民'],
['鞍山市','海城','台安','岫岩'],
['本溪市','本溪县','桓仁'],
['北票','朝阳市','朝阳县','建平','喀喇沁左翼','凌源'],
['长海','大连市','普兰店','瓦房店','庄河'],
['丹东市','东港','凤城','宽甸'],
['抚顺市','抚顺县','清原','新宾'],
['阜新市','阜新县','彰武'],
['葫芦岛市','建昌','绥中','兴城'],
['北镇','黑山','锦州市','凌海','义县'],
['灯塔','辽阳市','辽阳县'],
['大洼','盘锦市','盘山'],
['昌图','调兵山','开原','铁岭市','铁岭县','西丰'],
['大石桥','盖州','营口市']
],
[
['和林格尔','呼和浩特市','清水河','土默特左旗','托克托','武川'],
['阿拉善右旗','阿拉善左旗','额济纳旗'],
['巴彦淖尔市','磴口','杭锦后旗','乌拉特后旗','乌拉特前旗','乌拉特中旗','五原'],
['包头市','达尔罕茂明安联合旗','固阳','土默特右旗'],
['阿鲁科尔沁旗','敖汉旗','巴林右旗','巴林左旗','赤峰市','喀喇沁旗','克什克腾旗','林西','宁城','翁牛特旗'],
['达拉特旗','鄂尔多斯市','鄂托克旗','鄂托克前旗','杭锦旗','乌审旗','伊金霍洛旗','准格尔旗'],
['阿荣旗','陈巴尔虎旗','额尔古纳','鄂伦春旗','鄂温克族旗','根河','呼伦贝尔市','满洲里','莫力达瓦旗','新巴尔虎右旗','新巴尔虎左旗','牙克石','扎兰屯'],
['霍林郭勒','开鲁','科尔沁左翼后旗','科尔沁左翼中旗','库伦旗','奈曼旗','通辽市','扎鲁特旗'],
['乌海'],
['察哈尔右翼后旗','察哈尔右翼前旗','察哈尔右翼中旗','丰镇','化德','凉城','商都','四子王旗','乌兰察布市','兴和','卓资'],
['阿巴嘎旗','东乌珠穆沁旗','多伦','二连浩特','苏尼特右旗','苏尼特左旗','太仆寺旗','西乌珠穆沁旗','锡林郭勒市','镶黄旗','正蓝旗','正镶白旗'],
['阿尔山','科尔沁右翼前旗','科尔沁右翼中旗','突泉','乌兰浩特','扎赉特旗']
],
[
['贺兰','灵武','银川市','永宁'],
['固原市','泾源','隆德','彭阳','西吉'],
['平罗','石嘴山市'],
['青铜峡','同心','吴忠市','盐池'],
['海原','中宁','中卫市']
],
[
['大通','湟源','湟中','西宁市'],
['班玛','达日','甘德','久治','玛多','玛沁'],
['刚察','海晏','门源','祁连'],
['互助','化隆','乐都','民和','平安','循化'],
['共和','贵德','贵南','同德','兴海'],
['大柴旦','德令哈','都兰','格尔木','冷湖','茫崖','天峻','乌兰'],
['河南','尖扎','同仁','泽库'],
['称多','囊谦','曲麻莱','玉树','杂多','治多']
],
[
['济南市','济阳','平阴','商河','章丘'],
['滨州市','博兴','惠民','无棣','阳信','沾化','邹平'],
['德州市','乐陵','临邑','陵县','宁津','平原','齐河','庆云','武城','夏津','禹城'],
['东营市','广饶','垦利','利津'],
['曹县','成武','单县','定陶','东明','菏泽市','巨野','鄄城','郓城'],
['济宁市','嘉祥','金乡','梁山','曲阜','泗水','微山','汶上','兖州','鱼台','邹城'],
['莱芜市'],
['茌平','东阿','高唐','冠县','聊城市','临清','莘县','阳谷'],
['苍山','费县','莒南','临沭','临沂市','蒙阴','平邑','郯城','沂南','沂水'],
['即墨','胶南','胶州','莱西','平度','青岛市'],
['莒县','日照市','五莲'],
['东平','肥城','宁阳','泰安市','新泰'],
['荣成','乳山','威海市','文登'],
['安丘','昌乐','昌邑','高密','临朐','青州','寿光','潍坊市','诸城'],
['长岛','海阳','莱阳','莱州','龙口','蓬莱','栖霞','烟台市','招远'],
['滕州','枣庄市'],
['高青','桓台','沂源','淄博市']
],
[
['古交','娄烦','清徐','太原市','阳曲'],
['长治市','长治县','长子','壶关','黎城','潞城','平顺','沁县','沁源','屯留','武乡','襄垣'],
['大同市','大同县','广灵','浑源','灵丘','天镇','阳高','左云'],
['高平','晋城市','陵川','沁水','阳城','泽州'],
['和顺','介休','晋中市','灵石','平遥','祁县','寿阳','太谷','昔阳','榆社','左权'],
['安泽','大宁','汾西','浮山','古县','洪洞','侯马','霍州','吉县','临汾市','蒲县','曲沃','隰县','乡宁','襄汾','翼城','永和'],
['方山','汾阳','交城','交口','岚县','临县','柳林','吕梁市','石楼','文水','孝义','兴县','中阳'],
['怀仁','山阴','朔州市','应县','右玉'],
['保德','代县','定襄','繁峙','河曲','静乐','岢岚','宁武','偏关','神池','五台','五寨','忻州市','原平'],
['平定','阳泉市','盂县'],
['河津','稷山','绛县','临猗','平陆','芮城','万荣','闻喜','夏县','新绛','永济','垣曲','运城市']
],
[
['高陵','户县','蓝田','西安市','周至'],
['安康市','白河','汉阴','岚皋','宁陕','平利','石泉','旬阳','镇坪','紫阳'],
['宝鸡市','凤县','凤翔','扶风','麟游','陇县','眉县','岐山','千阳','太白'],
['城固','佛坪','汉中市','留坝','略阳','勉县','南郑','宁强','西乡','洋县','镇巴'],
['丹凤','洛南','山阳','商洛市','商南','镇安','柞水'],
['铜川市','宜君'],
['白水','澄城','大荔','富平','韩城','合阳','华县','华阴','蒲城','潼关','渭南市'],
['彬县','长武','淳化','泾阳','礼泉','乾县','三原','武功','咸阳市','兴平','旬邑','永寿'],
['安塞','富县','甘泉','黄陵','黄龙','洛川','吴起','延安市','延长','延川','宜川','志丹','子长'],
['定边','府谷','横山','佳县','靖边','米脂','清涧','神木','绥德','吴堡','榆林市','子洲']
],
[
['宝山'],
['长宁'],
['崇明'],
['奉贤'],
['虹口'],
['黄浦'],
['嘉定'],
['金山'],
['静安'],
['卢湾'],
['闵行'],
['南汇'],
['浦东'],
['普陀'],
['青浦'],
['松江'],
['徐汇'],
['杨浦'],
['闸北']
],
[
['成都市','崇州','大邑','都江堰','金堂','彭州','郫县','蒲江','邛崃','双流','新津'],
['阿坝','黑水','红原','金川','九寨沟','理县','马尔康','茂县','壤塘','若尔盖','松潘','汶川','小金'],
['巴中市','南江','平昌','通江'],
['达县','达州市','大竹','开江','渠县','万源','宣汉'],
['德阳市','广汉','罗江','绵竹','什邡','中江'],
['巴塘','白玉','丹巴','道孚','稻城','得荣','德格','甘孜','九龙','康定','理塘','泸定','炉霍','色达','石渠','乡城','新龙','雅江'],
['广安市','华蓥','邻水','武胜','岳池'],
['苍溪','广元市','剑阁','青川','旺苍'],
['峨边','峨眉山','夹江','犍为','井研','乐山市','马边','沐川'],
['布拖','德昌','甘洛','会东','会理','金阳','雷波','美姑','冕宁','木里','宁南','普格','西昌','喜德','盐源','越西','昭觉'],
['古蔺','合江','泸县','泸州市','叙永'],
['丹棱','洪雅','眉山市','彭山','青神','仁寿'],
['安县','北川','江油','绵阳市','平武','三台','盐亭','梓潼'],
['隆昌','内江市','威远','资中'],
['阆中','南部','南充市','蓬安','西充','仪陇','营山'],
['米易','攀枝花市','盐边'],
['大英','蓬溪','射洪','遂宁市'],
['宝兴','汉源','芦山','名山','石棉','天全','雅安市','荥经'],
['长宁','高县','珙县','江安','筠连','南溪','屏山','兴文','宜宾市','宜宾县'],
['安岳','简阳','乐至','资阳市'],
['富顺','荣县','自贡市']
],
[
['台北'],
['阿莲'],
['安定'],
['安平'],
['八德'],
['八里'],
['白河'],
['白沙'],
['板桥'],
['褒忠'],
['宝山'],
['卑南'],
['北斗'],
['北港'],
['北门'],
['北埔'],
['北投'],
['补子'],
['布袋'],
['草屯'],
['长宾'],
['长治'],
['潮州'],
['车城'],
['成功'],
['城中区'],
['池上'],
['春日'],
['刺桐'],
['高雄'],
['花莲'],
['基隆'],
['嘉义'],
['苗栗'],
['南投'],
['屏东'],
['台东'],
['台南'],
['台中'],
['桃园'],
['新竹'],
['宜兰'],
['彰化']
],
[
['宝坻'],
['北辰'],
['大港'],
['东丽'],
['汉沽'],
['和平'],
['河北'],
['河东'],
['河西'],
['红桥'],
['蓟县'],
['津南'],
['静海'],
['南开'],
['宁河'],
['塘沽'],
['武清'],
['西青']
],
[
['达孜','当雄','堆龙德庆','拉萨市','林周','墨竹工卡','尼木','曲水'],
['措勤','噶尔','改则','革吉','普兰','日土','札达'],
['八宿','边坝','察雅','昌都','丁青','贡觉','江达','类乌齐','洛隆','芒康','左贡'],
['波密','察隅','工布江达','朗县','林芝','米林','墨脱'],
['安多','巴青','班戈','比如','嘉黎','那曲','尼玛','聂荣','申扎','索县'],
['昂仁','白朗','定结','定日','岗巴','吉隆','江孜','康马','拉孜','南木林','聂拉木','仁布','日喀则市','萨嘎','萨迦','谢通门','亚东','仲巴'],
['措美','错那','贡嘎','加查','浪卡子','隆子','洛扎','乃东','琼结','曲松','桑日','扎囊']
],
[
['北区'],
['大埔区'],
['东区'],
['观塘区'],
['黄大仙区'],
['九龙'],
['葵青区'],
['离岛区'],
['南区'],
['荃湾区'],
['沙田区'],
['深水埗区'],
['屯门区'],
['湾仔区'],
['西贡区'],
['香港'],
['新界'],
['油尖旺区'],
['元朗区'],
['中西区']
],
[
['乌鲁木齐市','乌鲁木齐县'],
['阿克苏市','阿瓦提','拜城','柯坪','库车','沙雅','温宿','乌什','新和'],
['阿拉尔'],
['阿勒泰','布尔津','福海','富蕴','哈巴河','吉木乃','青河'],
['博湖','和静','和硕','库尔勒','轮台','且末','若羌','尉犁','焉耆'],
['博乐','精河','温泉'],
['昌吉市','阜康','呼图壁','吉木萨尔','玛纳斯','米泉','木垒','奇台'],
['巴里坤','哈密市','伊吾'],
['策勒','和田市','和田县','洛浦','民丰','墨玉','皮山','于田'],
['巴楚','伽师','喀什市','麦盖提','莎车','疏附','疏勒','塔什库尔干塔吉克','叶城','英吉沙','岳普湖','泽普'],
['克拉玛依'],
['阿合奇','阿克陶','阿图什','乌恰'],
['石河子'],
['额敏','和布克赛尔','沙湾','塔城市','托里','乌苏','裕民'],
['图木舒克'],
['鄯善','吐鲁番市','托克逊'],
['五家渠'],
['察布查尔锡伯','巩留','霍城','奎屯','尼勒克','特克斯','新源','伊宁市','伊宁县','昭苏']
],
[
['安宁','呈贡','富民','晋宁','昆明市','禄劝','石林','嵩明','寻甸','宜良'],
['保山市','昌宁','龙陵','施甸','腾冲'],
['楚雄市','大姚','禄丰','牟定','南华','双柏','武定','姚安','永仁','元谋'],
['宾川','大理市','洱源','鹤庆','剑川','弥渡','南涧','巍山','祥云','漾濞','永平','云龙'],
['梁河','陇川','潞西','瑞丽','盈江'],
['德钦','维西','香格里拉'],
['个旧','河口','红河','建水','金平','开远','泸西','绿春','蒙自','弥勒','屏边','石屏','元阳'],
['华坪','丽江市','宁蒗','永胜','玉龙'],
['沧源','凤庆','耿马','临沧市','双江','永德','云县','镇康'],
['福贡','贡山','兰坪','泸水'],
['富源','会泽','陆良','罗平','马龙','曲靖市','师宗','宣威','沾益'],
['江城','景东','景谷','澜沧','孟连','墨江','普洱','思茅市','西盟','镇沅'],
['富宁','广南','麻栗坡','马关','丘北','文山','西畴','砚山'],
['景洪','勐海','勐腊'],
['澄江','峨山','华宁','江川','通海','新平','易门','玉溪市','元江'],
['大关','鲁甸','巧家','水富','绥江','威信','盐津','彝良','永善','昭通市','镇雄']
],
[
['杭州电子科技大学','富阳','杭州市','建德','临安','桐庐'],
['安吉','长兴','德清','湖州市'],
['海宁','海盐','嘉善','嘉兴市','平湖','桐乡'],
['东阳','金华市','兰溪','磐安','浦江','武义','义乌','永康'],
['缙云','景宁','丽水市','龙泉','青田','庆元','松阳','遂昌','云和'],
['慈溪','奉化','宁波市','宁海','象山','余姚'],
['常山','江山','开化','龙游','衢州市'],
['上虞','绍兴市','绍兴县','嵊州','新昌','诸暨'],
['临海','三门','台州市','天台','温岭','仙居','玉环'],
['苍南','洞头','乐清','平阳','瑞安','泰顺','温州市','文成','永嘉'],
['岱山','嵊泗','舟山市']
],
[
['巴南'],
['北碚'],
['璧山'],
['长寿'],
['城口'],
['大渡口'],
['大足'],
['垫江'],
['丰都'],
['奉节'],
['涪陵'],
['合川'],
['江北'],
['江津'],
['九龙坡'],
['开县'],
['梁平'],
['南岸'],
['南川'],
['彭水'],
['綦江'],
['黔江'],
['荣昌'],
['沙坪坝'],
['石柱'],
['双桥'],
['铜梁'],
['潼南'],
['万盛'],
['万州'],
['巫山'],
['巫溪'],
['武隆'],
['秀山'],
['永川'],
['酉阳'],
['渝北'],
['渝中'],
['云阳'],
['忠县']
],
[
['阿根廷'],
['埃及'],
['爱尔兰'],
['奥地利'],
['奥克兰'],
['澳大利亚'],
['巴基斯坦'],
['巴西'],
['保加利亚'],
['比利时'],
['冰岛'],
['朝鲜'],
['丹麦'],
['德国'],
['俄罗斯'],
['法国'],
['菲律宾'],
['芬兰'],
['哥伦比亚'],
['韩国'],
['荷兰'],
['加拿大'],
['柬埔寨'],
['喀麦隆'],
['老挝'],
['卢森堡'],
['罗马尼亚'],
['马达加斯加'],
['马来西亚'],
['毛里求斯'],
['美国'],
['秘鲁'],
['缅甸'],
['墨西哥'],
['南非'],
['尼泊尔'],
['挪威'],
['葡萄牙'],
['其它地区'],
['日本'],
['瑞典'],
['瑞士'],
['斯里兰卡'],
['泰国'],
['土耳其'],
['委内瑞拉'],
['文莱'],
['乌克兰'],
['西班牙'],
['希腊'],
['新加坡'],
['新西兰'],
['匈牙利'],
['以色列'],
['意大利'],
['印度'],
['印度尼西亚'],
['英国'],
['越南'],
['智利']
]
];


