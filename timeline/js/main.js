
//Make sure the data processing is after the data transmission
$.ajaxSetup({
    async: false
});

var filenameList = ['IMG_20131116_230740.jpg', 'IMG_20131216_125730.jpg', 'IMG_20140305_224439.jpg', 'IMG_20140310_132752.jpg', 'IMG_20140325_235647.jpg', 'IMG_20140326_211313.jpg', 'IMG_20140326_212316.jpg', 'IMG_20140326_214223.jpg', 'IMG_20140327_082137.jpg', 'IMG_20140327_083705.jpg', 'IMG_20140327_083724.jpg', 'IMG_20140327_105758.jpg', 'IMG_20140327_105759.jpg', 'IMG_20140327_121933.jpg', 'IMG_20140327_193425.jpg', 'IMG_20140328_132940.jpg', 'IMG_20140329_104303.jpg', 'IMG_20140329_174717.jpg', 'IMG_20140329_175003.jpg', 'IMG_20140329_195319.jpg', 'IMG_20140329_195957.jpg', 'IMG_20140329_235215.jpg', 'IMG_20140330_000201.jpg', 'IMG_20140330_190345.jpg', 'IMG_20140330_190351.jpg', 'IMG_20140330_190518.jpg', 'IMG_20140330_190538.jpg', 'IMG_20140330_190547.jpg', 'IMG_20140330_191320.jpg', 'IMG_20140330_193045.jpg', 'IMG_20140330_194605.jpg', 'IMG_20140330_194625.jpg', 'IMG_20140330_195417.jpg', 'IMG_20140330_195524.jpg', 'IMG_20140330_195555.jpg', 'IMG_20140330_195709.jpg', 'IMG_20140330_195809.jpg', 'IMG_20140330_195845.jpg', 'IMG_20140330_200349.jpg', 'IMG_20140330_200804.jpg', 'IMG_20140330_214235.jpg', 'IMG_20140330_214243.jpg', 'IMG_20140330_214303.jpg', 'IMG_20140330_214325.jpg', 'IMG_20140330_214354.jpg', 'IMG_20140330_215107.jpg', 'IMG_20140330_215129.jpg', 'IMG_20140330_215212.jpg', 'IMG_20140331_182943.jpg', 'IMG_20140401_104123.jpg', 'IMG_20140401_211159.jpg', 'IMG_20140401_211227.jpg', 'IMG_20140402_141540.jpg', 'IMG_20140402_185300.jpg', 'IMG_20140402_185348.jpg', 'IMG_20140402_185919.jpg', 'IMG_20140402_202238.jpg', 'IMG_20140402_204728.jpg', 'IMG_20140403_111630.jpg', 'IMG_20140403_114259.jpg', 'IMG_20140403_114311.jpg', 'IMG_20140403_133416.jpg', 'IMG_20140403_133429.jpg', 'IMG_20140403_134925.jpg', 'IMG_20140403_155835.jpg', 'IMG_20140403_161101.jpg', 'IMG_20140404_161159.jpg', 'IMG_20140404_182353.jpg', 'IMG_20140405_164644.jpg', 'IMG_20140405_180256.jpg', 'IMG_20140405_203838.jpg', 'IMG_20140406_133642.jpg', 'IMG_20140406_134141.jpg', 'IMG_20140406_151803.jpg', 'IMG_20140406_151818.jpg', 'IMG_20140408_133956.jpg', 'IMG_20140408_161606.jpg', 'IMG_20140408_161659.jpg', 'IMG_20140409_202607.jpg', 'IMG_20140409_202646.jpg', 'IMG_20140411_150944.jpg', 'IMG_20140411_151050.jpg', 'IMG_20140411_232702.jpg', 'IMG_20140411_232709.jpg', 'IMG_20140412_075156.jpg', 'IMG_20140412_080741.jpg', 'IMG_20140412_082747.jpg', 'IMG_20140412_082841.jpg', 'IMG_20140412_103124.jpg', 'IMG_20140412_110640.jpg', 'IMG_20140412_130003.jpg', 'IMG_20140412_130940.jpg', 'IMG_20140412_131849.jpg', 'IMG_20140412_131905.jpg', 'IMG_20140412_201612.jpg', 'IMG_20140412_201629.jpg', 'IMG_20140412_205829.jpg', 'IMG_20140414_095053.jpg', 'IMG_20140414_095104.jpg', 'IMG_20140414_095451.jpg', 'IMG_20140414_192116.jpg', 'IMG_20140414_192142.jpg', 'IMG_20140414_194534.jpg', 'IMG_20140414_194641.jpg', 'IMG_20140414_195604.jpg', 'IMG_20140415_151813.jpg', 'IMG_20140415_193923.jpg', 'IMG_20140415_194304.jpg', 'IMG_20140415_195832.jpg', 'IMG_20140416_164635.jpg', 'IMG_20140416_164704.jpg', 'IMG_20140416_165649.jpg', 'IMG_20140416_181348.jpg', 'IMG_20140416_181407.jpg', 'IMG_20140416_182513.jpg', 'IMG_20140416_182519.jpg', 'IMG_20140416_182527.jpg', 'IMG_20140416_204926.jpg', 'IMG_20140416_210119.jpg', 'IMG_20140417_082342.jpg', 'IMG_20140417_110049.jpg', 'IMG_20140417_110123.jpg', 'IMG_20140417_172917.jpg', 'IMG_20140418_000545.jpg', 'IMG_20140418_223959.jpg', 'IMG_20140420_134703.jpg', 'IMG_20140420_220159.jpg', 'IMG_20140421_105739.jpg', 'IMG_20140422_104004.jpg', 'IMG_20140423_105825.jpg', 'IMG_20140424_111121.jpg', 'IMG_20140427_014506.jpg', 'IMG_20140428_201625.jpg', 'IMG_20140428_201659.jpg', 'IMG_20140430_134016.jpg', 'IMG_20140501_104828.jpg', 'IMG_20140501_104839.jpg', 'IMG_20140504_125157.jpg', 'IMG_20140507_121935.jpg', 'IMG_20140510_132355.jpg', 'IMG_20140510_132430.jpg', 'IMG_20140510_132449.jpg', 'IMG_20140510_133002.jpg', 'IMG_20140510_133840.jpg', 'IMG_20140510_133849.jpg', 'IMG_20140510_133907.jpg', 'IMG_20140510_134213.jpg', 'IMG_20140510_135238.jpg', 'IMG_20140510_135358.jpg', 'IMG_20140510_140504.jpg', 'IMG_20140510_140553.jpg', 'IMG_20140510_140558.jpg', 'IMG_20140510_141215.jpg', 'IMG_20140510_141735.jpg', 'IMG_20140510_141853.jpg', 'IMG_20140510_142032.jpg', 'IMG_20140510_144010.jpg', 'IMG_20140510_144828.jpg', 'IMG_20140510_144929.jpg', 'IMG_20140515_140213.jpg', 'IMG_20140515_183737.jpg', 'IMG_20140523_234531.jpg', 'IMG_20140524_000731.jpg', 'IMG_20140524_000741.jpg', 'IMG_20140524_000750.jpg', 'IMG_20140524_175548.jpg', 'IMG_20140524_181730.jpg', 'IMG_20140524_181837.jpg', 'IMG_20140524_182115.jpg', 'IMG_20140524_182522.jpg', 'IMG_20140524_183512.jpg', 'IMG_20140524_184500.jpg', 'IMG_20140524_184504.jpg', 'IMG_20140524_184638.jpg', 'IMG_20140524_212839.jpg', 'IMG_20140525_111747.jpg', 'IMG_20140525_111828.jpg', 'IMG_20140525_113044.jpg', 'IMG_20140525_115210.jpg', 'IMG_20140525_135054.jpg', 'IMG_20140525_173803.jpg', 'IMG_20140525_175516.jpg', 'IMG_20140525_175730.jpg', 'IMG_20140525_180212.jpg', 'IMG_20140525_180410.jpg', 'IMG_20140525_210315.jpg', 'IMG_20140525_210422.jpg', 'IMG_20140525_210433.jpg', 'IMG_20140525_210545.jpg', 'IMG_20140525_210633.jpg', 'IMG_20140525_215727.jpg', 'IMG_20140525_215731.jpg', 'IMG_20140525_215931.jpg', 'IMG_20140526_192539.jpg', 'IMG_20140526_192614.jpg', 'IMG_20140530_233420.jpg', 'IMG_20140531_135841.jpg', 'IMG_20140531_211949.jpg', 'IMG_20140531_221757.jpg', 'IMG_20140531_221808.jpg', 'IMG_20140531_221816.jpg', 'IMG_20140531_222808.jpg', 'IMG_20140601_144916.jpg', 'IMG_20140601_145120.jpg', 'IMG_20140601_194332.jpg', 'IMG_20140601_213051.jpg', 'IMG_20140601_221111.jpg', 'IMG_20140602_142024.jpg', 'IMG_20140603_191637.jpg', 'IMG_20140603_191828.jpg', 'IMG_20140603_192323.jpg', 'IMG_20140603_192412.jpg', 'IMG_20140605_090139.jpg', 'IMG_20140605_103259.jpg', 'IMG_20140605_103328.jpg', 'IMG_20140605_183723.jpg', 'IMG_20140605_184002.jpg', 'IMG_20140605_185133.jpg', 'IMG_20140605_185216.jpg', 'IMG_20140605_185222.jpg', 'IMG_20140605_192237.jpg', 'IMG_20140605_192307.jpg', 'IMG_20140606_001856.jpg', 'IMG_20140606_200829.jpg', 'IMG_20140606_200849.jpg', 'IMG_20140606_201658.jpg', 'IMG_20140606_203341.jpg', 'IMG_20140606_203349.jpg', 'IMG_20140606_203355.jpg', 'IMG_20140606_203405.jpg', 'IMG_20140606_204545.jpg', 'IMG_20140606_210942.jpg', 'IMG_20140606_211320.jpg', 'IMG_20140606_211426.jpg', 'IMG_20140607_135339.jpg', 'IMG_20140607_193037.jpg', 'IMG_20140607_193050.jpg', 'IMG_20140607_212247.jpg', 'IMG_20140608_003033.jpg', 'IMG_20140608_210215.jpg', 'IMG_20140608_211419.jpg', 'IMG_20140608_211643.jpg', 'IMG_20140608_215317.jpg', 'IMG_20140609_205143.jpg', 'IMG_20140610_202556.jpg', 'IMG_20140610_202612.jpg', 'IMG_20140610_202618.jpg', 'IMG_20140610_202752.jpg', 'IMG_20140610_204128.jpg', 'IMG_20140612_154245.jpg', 'IMG_20140612_154252.jpg', 'IMG_20140614_012331.jpg', 'IMG_20140614_012354.jpg', 'IMG_20140615_204022.jpg', 'IMG_20140615_204033.jpg', 'IMG_20140615_211622.jpg', 'IMG_20140616_111422.jpg', 'IMG_20140616_200719.jpg', 'IMG_20140621_131555.jpg', 'IMG_20140621_131753.jpg', 'IMG_20140623_021607.jpg', 'IMG_20140623_021621.jpg', 'IMG_20140623_021625.jpg', 'IMG_20140625_205519.jpg', 'IMG_20140627_103426.jpg', 'IMG_20140628_152200.jpg', 'IMG_20140630_162153.jpg', 'IMG_20140701_205217.jpg', 'IMG_20140701_205301.jpg', 'IMG_20140703_190724.jpg', 'IMG_20140703_191131.jpg', 'IMG_20140703_191148.jpg', 'IMG_20140704_203752.jpg', 'IMG_20140704_204114.jpg', 'IMG_20140704_204201.jpg', 'IMG_20140704_204236.jpg', 'IMG_20140704_204420.jpg', 'IMG_20140704_204621.jpg', 'IMG_20140704_204633.jpg', 'IMG_20140704_204646.jpg', 'IMG_20140704_204957.jpg', 'IMG_20140704_205625.jpg', 'IMG_20140704_205738.jpg', 'IMG_20140704_210223.jpg', 'IMG_20140704_210334.jpg', 'IMG_20140704_210352.jpg', 'IMG_20140704_212029.jpg', 'IMG_20140704_213309.jpg', 'IMG_20140704_214231.jpg', 'IMG_20140704_214235.jpg', 'IMG_20140704_214245.jpg', 'IMG_20140704_215643.jpg', 'IMG_20140704_215647.jpg', 'IMG_20140704_215649.jpg', 'IMG_20140704_215656.jpg', 'IMG_20140704_215701.jpg', 'IMG_20140704_215704.jpg', 'IMG_20140704_215710.jpg', 'IMG_20140704_215713.jpg', 'IMG_20140704_215715.jpg', 'IMG_20140704_215717.jpg', 'IMG_20140704_215719.jpg', 'IMG_20140704_215721.jpg', 'IMG_20140704_215723.jpg', 'IMG_20140704_215725.jpg', 'IMG_20140708_123849.jpg', 'IMG_20140708_123915.jpg', 'IMG_20140708_123937.jpg', 'IMG_20140708_123947.jpg', 'IMG_20140708_124011.jpg', 'IMG_20140709_142906.jpg', 'IMG_20140709_142925.jpg', 'IMG_20140709_154021.jpg', 'IMG_20140709_154024.jpg', 'IMG_20140711_133656.jpg', 'IMG_20140711_133713.jpg', 'IMG_20140711_133737.jpg', 'IMG_20140711_133826.jpg', 'IMG_20140712_150324.jpg', 'IMG_20140712_150632.jpg', 'IMG_20140712_151130.jpg', 'IMG_20140713_131028.jpg', 'IMG_20140713_131042.jpg', 'IMG_20140717_122829.jpg', 'IMG_20140717_123005.jpg', 'IMG_20140717_123122.jpg', 'IMG_20140717_183454.jpg', 'IMG_20140718_124823.jpg', 'IMG_20140719_074305.jpg', 'IMG_20140719_075415.jpg', 'IMG_20140719_080433.jpg', 'IMG_20140719_082339.jpg', 'IMG_20140719_085313.jpg', 'IMG_20140719_085438.jpg', 'IMG_20140719_085552.jpg', 'IMG_20140719_093112.jpg', 'IMG_20140719_093337.jpg', 'IMG_20140720_104017.jpg', 'IMG_20140720_104220.jpg', 'IMG_20140720_105218.jpg', 'IMG_20140720_105540.jpg', 'IMG_20140720_110513.jpg', 'IMG_20140720_110527.jpg', 'IMG_20140720_111136.jpg', 'IMG_20140720_111141.jpg', 'IMG_20140720_111431.jpg', 'IMG_20140720_111529.jpg', 'IMG_20140720_111534.jpg', 'IMG_20140720_111820.jpg', 'IMG_20140720_112600.jpg', 'IMG_20140720_112624.jpg', 'IMG_20140720_112751.jpg', 'IMG_20140720_112832.jpg', 'IMG_20140720_115310.jpg', 'IMG_20140720_120401.jpg', 'IMG_20140720_120741.jpg', 'IMG_20140720_121340.jpg', 'IMG_20140720_121658.jpg', 'IMG_20140720_121712.jpg', 'IMG_20140720_121827.jpg', 'IMG_20140720_122257.jpg', 'IMG_20140724_234731.jpg', 'IMG_20140724_234814.jpg', 'IMG_20140724_234934.jpg', 'IMG_20140724_235126.jpg', 'IMG_20140724_235218.jpg', 'IMG_20140724_235740.jpg', 'IMG_20140725_164729.jpg', 'IMG_20140725_164754.jpg', 'IMG_20140725_164802.jpg', 'IMG_20140725_170059.jpg', 'IMG_20140725_180615.jpg', 'IMG_20140725_183155.jpg', 'IMG_20140726_172400.jpg', 'IMG_20140726_172436.jpg', 'IMG_20140726_172810.jpg', 'IMG_20140726_173036.jpg', 'IMG_20140726_173053.jpg', 'IMG_20140726_173109.jpg', 'IMG_20140726_173130.jpg', 'IMG_20140726_173201.jpg', 'IMG_20140726_173241.jpg', 'IMG_20140726_173653.jpg', 'IMG_20140726_173745.jpg', 'IMG_20140726_173750.jpg', 'IMG_20140726_181427.jpg', 'IMG_20140726_181435.jpg', 'IMG_20140726_182809.jpg', 'IMG_20140726_182814.jpg', 'IMG_20140726_182816.jpg', 'IMG_20140726_184003.jpg', 'IMG_20140727_150858.jpg', 'IMG_20140727_151536.jpg', 'IMG_20140727_151553.jpg', 'IMG_20140727_151608.jpg', 'IMG_20140727_151655.jpg', 'IMG_20140727_151953.jpg', 'IMG_20140727_152131.jpg', 'IMG_20140727_152140.jpg', 'IMG_20140727_152216.jpg', 'IMG_20140730_124203.jpg', 'IMG_20140731_212838.jpg', 'IMG_20140801_192325.jpg', 'IMG_20140802_214843.jpg', 'IMG_20140803_221154.jpg', 'IMG_20140803_221157.jpg', 'IMG_20140803_221229.jpg', 'IMG_20140803_221239.jpg', 'IMG_20140803_221240.jpg', 'IMG_20140803_221243.jpg', 'IMG_20140803_221313.jpg', 'IMG_20140803_221319.jpg', 'IMG_20140803_221419.jpg', 'IMG_20140803_221436.jpg', 'IMG_20140803_221438.jpg', 'IMG_20140803_221442.jpg', 'IMG_20140803_221459.jpg', 'IMG_20140803_221511.jpg', 'IMG_20140803_221516.jpg', 'IMG_20140803_221629.jpg', 'IMG_20140803_221633.jpg', 'IMG_20140803_221636.jpg', 'IMG_20140803_221650.jpg', 'IMG_20140803_221734.jpg', 'IMG_20140803_221743.jpg', 'IMG_20140803_221746.jpg', 'IMG_20140803_221749.jpg', 'IMG_20140803_221751.jpg', 'IMG_20140803_221758.jpg', 'IMG_20140803_221800.jpg', 'IMG_20140803_221802.jpg', 'IMG_20140803_221805.jpg', 'IMG_20140805_183438.jpg', 'IMG_20140806_200547.jpg', 'IMG_20140806_200659.jpg', 'IMG_20140808_113833.jpg', 'IMG_20140808_172435.jpg', 'IMG_20140808_172444.jpg', 'IMG_20140808_180312.jpg', 'IMG_20140808_180334.jpg', 'IMG_20140808_180339.jpg', 'IMG_20140808_183142.jpg', 'IMG_20140809_151910.jpg', 'IMG_20140809_152850.jpg', 'IMG_20140809_152941.jpg', 'IMG_20140809_153146.jpg', 'IMG_20140809_153455.jpg', 'IMG_20140809_153608.jpg', 'IMG_20140809_154142.jpg', 'IMG_20140809_154145.jpg', 'IMG_20140809_220405.jpg', 'IMG_20140810_092226.jpg', 'IMG_20140810_092302.jpg', 'IMG_20140820_120435.jpg', 'IMG_20140821_220552.jpg', 'IMG_20140822_105253.jpg', 'IMG_20140822_105545.jpg', 'IMG_20140822_141935.jpg', 'IMG_20140829_100504.jpg', 'IMG_20140829_102206.jpg', 'IMG_20140829_205407.jpg', 'IMG_20140829_205504.jpg', 'IMG_20140829_205751.jpg', 'IMG_20140829_210231.jpg', 'IMG_20140829_210247.jpg', 'IMG_20140829_210829.jpg', 'IMG_20140829_211339.jpg', 'IMG_20140829_213034.jpg', 'IMG_20140829_213051.jpg', 'IMG_20140831_102604.jpg', 'IMG_20140831_102629.jpg', 'IMG_20140831_102842.jpg', 'IMG_20140831_102853.jpg', 'IMG_20140831_102856.jpg', 'IMG_20140831_103500.jpg', 'IMG_20140831_104014.jpg', 'IMG_20140831_112011.jpg', 'IMG_20140831_113347.jpg', 'IMG_20140831_114713.jpg', 'IMG_20140831_135739.jpg', 'IMG_20140831_140025.jpg', 'IMG_20140831_144657.jpg', 'IMG_20140831_144809.jpg', 'IMG_20140831_145136.jpg', 'IMG_20140831_145144.jpg', 'IMG_20140831_145149.jpg', 'IMG_20140831_145209.jpg', 'IMG_20140831_162456.jpg', 'IMG_20140831_162852.jpg', 'IMG_20140831_163257.jpg', 'IMG_20140831_163305.jpg', 'IMG_20140831_164216.jpg', 'IMG_20140831_164221.jpg', 'IMG_20140831_171501.jpg', 'IMG_20140831_171515.jpg', 'IMG_20140831_172403.jpg', 'IMG_20140831_172500.jpg', 'IMG_20140913_201129.jpg', 'IMG_20140914_155822.jpg', 'IMG_20141014_132929.jpg', 'IMG_20141107_190815.jpg', 'IMG_20141109_152021.jpg', 'IMG_20141119_235543.jpg', 'IMG_20141204_015809.jpg', 'IMG_20141204_020401.jpg', 'IMG_20141204_020504.jpg', 'IMG_20141204_020553.jpg', 'IMG_20141204_020630.jpg', 'IMG_20141224_164448.jpg', 'IMG_20141226_193946.jpg', 'IMG_20150111_192003.jpg', 'IMG_20150111_192015.jpg', 'IMG_20150111_192024.jpg', 'IMG_20150209_170250.jpg', 'IMG_20150209_170333.jpg', 'IMG_20150215_172901.jpg', 'IMG_20150219_190206.jpg', 'IMG_20150219_191650.jpg', 'IMG_20150219_191658.jpg', 'IMG_20150219_191700.jpg', 'IMG_20150219_191706.jpg', 'IMG_20150228_134052.jpg', 'IMG_20150228_134217.jpg', 'IMG_20150313_094547.jpg', 'IMG_20150313_221625.jpg', 'IMG_20150313_222124.jpg'];
//var filenameList = ['IMG_20131116_230740.jpg', 'IMG_20131216_125730.jpg']
//filenameList = filenameList.slice(0,400);
var pic_text = [];
var clickTime = [];
for(var i=0; i<filenameList.length; i++){
    pic_text.push("这是拍的第"+(i+1)+"张照片");
    var d = new Date();
    clickTime.push(d);
}
a=["准备送给朋友的加拿大话费卡","刚到美国！","在Davis自己煮的第一顿饭~",
    "Davis的黄昏很漂亮","随便拍的一些东西","加州的好天气",
    "在Davis上课很充实~", "明天准备去优胜美地了！","一些好风景~",
    "就快要回国了", "去上海考托福。。"]
var j=0;
for(var i=0; i<filenameList.length; i+=50){
    pic_text[i] = a[j++];
}

var currentPicNum = 0;

////////////////////////  CONSTANT ////////////////////
var Constant = {
    PI: 3.1415,
    margin: {top: 0, right: 0, bottom: 0, left: 0},
    maxRadius: 20,
    minRadius: 5,
    areaRatio: 1,
    radiusClassify: 10,

    spiralInterval: 2.0,
    spiralStepPerCircumference : 100,
    extraDetectionAngle : 20,

    //连续多少天只选一天作为delegator
    continuousDay : 20,
    delegatorSize: 2.5,
    nonDelegatorSize: 0.2,
    init: function() {
        this.width = screen.availWidth - this.margin.left - this.margin.right;
        this.height = screen.availHeight - this.margin.top - this.margin.bottom;
        this.layoutRadius = this.width > this.height ? this.height : this.width;

        this.spiralMaxInterval = this.maxRadius*4;
        this.maxLength = this.width/2*this.areaRatio;
        this.maxSpiralStep = this.spiralStepPerCircumference*Math.ceil(this.spiralMaxInterval/this.spiralInterval);
        this.spiralRadiusDelta = this.spiralInterval / this.spiralStepPerCircumference;
        this.spiralAngleDelta = 2*Math.PI / this.spiralStepPerCircumference;

        delete this.init;
        return this;
    }
}.init();


var data = [];
for(var i=0; i<filenameList.length; i++){
    var obj = {};
    obj.filename = filenameList[i];
    var split = filenameList[i].split(/_|\./);

    var date = split[1].match(/(\d{4})(\d{2})(\d{2})/).slice(1),
        time = split[2].match(/(\d{2})(\d{2})(\d{2})/).slice(1);
    date.forEach(function(x,i,ar){ar[i]=Number(x)});
    time.forEach(function(x,i,ar){ar[i]=Number(x)});
    obj.time = new Date(date[0],date[1],date[2], time[0],time[1],time[2]);
    obj.day = date[2];
    var start = new Date(obj.time.getFullYear(), 0, 0);
    var diff = obj.time - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    obj.angle = (day/366.0)*360 ;

    data.push(obj);
}
data.sort(function(a,b){return a.time - b.time});


var len = d3.scale.pow().exponent(0.1)
    .domain([data[0].time.getTime(), data[data.length-1].time.getTime()])
    .range([0, Constant.layoutRadius/2 - Constant.maxRadius]);

var radius = d3.scale.pow().exponent(3)
    .domain([data[0].time.getTime(), data[data.length-1].time.getTime()])
    .range([Constant.minRadius, Constant.maxRadius]);

var totalArea = 0;
for(var i=0; i<data.length; i++){
    data[i].len = len(data[i].time.getTime());
    data[i].r = radius(data[i].time.getTime());
    totalArea += data[i].r * data[i].r;
}

//重新调整各个圆的大小
var radiusRevisedRatio = Math.sqrt((Constant.maxLength*Constant.maxLength)/totalArea);
for(var i=0; i<data.length; i++){
    data[i].r *= radiusRevisedRatio;
}
Constant.maxRadius *= radiusRevisedRatio;
Constant.minRadius *= radiusRevisedRatio;
Constant.spiralMaxInterval *= radiusRevisedRatio;

//开始设置delegator
var nextDelegatorTime = data[0].time;
nextDelegatorTime.setDate(nextDelegatorTime.getDate() + Constant.continuousDay);
var index = 0;
while(index < data.length){
    data[index].r *= Constant.delegatorSize;
    index++;
    while(index < data.length && data[index].time < nextDelegatorTime){
        data[index].r *= Constant.nonDelegatorSize;
        index++;
    }
    nextDelegatorTime.setDate(nextDelegatorTime.getDate() + Constant.continuousDay);
}
//////////////////////////////////////开始使用spiral detect消除重叠
//UTIL FUNCTION
var dis = function(x, y){return Math.sqrt(x*x+y*y)}
function dis2(x1,y1,x2,y2){
    return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2))
}
var angle = function(x, y){
    var t;
    if( Math.abs(x) <= 0.0001){
        if(y>0) t = 90
        else t = 270
    }
    else{
        t = Math.atan(y/x)/Math.PI*180
        if(x<0) t = 180 + t
        else if(t<0) t = 360 + t
    }
    return 360-t
}

//按照每个角度存放对应的点
Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};
var angleList = [];
for(var i=0; i<360; i++){
    angleList.push([]);
}

var stepscale = d3.scale.linear()
    .domain([0,Constant.maxLength])
    .range([50,200]);
// data中每一项的格式
//{
//    r: 半径,
//    len: 到中心点长度,
//    angle: 角度,
//    time: 具体时间
//}
var perfectcount = 0; // the number of perfect non-overlapping points
for(var i=0; i<data.length; i++){
    var l = data[i].len;
    var tx = l*Math.cos(-Math.PI*data[i]["angle"]/180);
    var ty = l*Math.sin(-Math.PI*data[i]["angle"]/180);
    var r = data[i].r;
    var result = spiralDetect(tx, ty, r);

    var x = result.x
    var y = result.y
    var newangle = angle(x, y)
    var newlength = dis(x, y)
    var newpoint = {"x":x, "y":y, "len":newlength, "r":r}
    var angleindex = Math.round(newangle)%360
    var templ = angleList[angleindex]
    var j;

    //nodes inserted by their length within each degree
    for(j=0; j<templ.length; j++){
        if(newpoint.len < templ[j].len)
            break;
    }
    templ.insert(j, newpoint);

    data[i]["len"] = newlength;
    data[i]["angle"] = newangle;
}

function spiralDetect(x, y, r){
    var maxmin = 0;
    var resultx=x, resulty=y;
    var testx, testy;
    var stepa=0;
    var stepr=0;
    var maxX =  Constant.maxLength-r;
    var minX = -maxX;
    for(var i=0; i<Constant.maxSpiralStep; i++){
        testx = x + stepr*Math.cos(stepa)
        testy = y + stepr*Math.sin(stepa)
        //avoid the bottomest node exceed the margin
        if(testx > maxX || testx < minX || testy > maxX || testy < minX)
            break;
        var temp = detect(testx, testy, r)
        if(temp.success){
            resultx = testx
            resulty = testy
            perfectcount++;
            break
        }
        else if(maxmin < temp.min){
            maxmin = temp.min;
            resultx = testx;
            resulty = testy;
        }
        //find next point on the spiral
        stepr += Constant.spiralRadiusDelta;
        stepa += Constant.spiralAngleDelta;
    }
    return {"x":resultx,"y":resulty}
}

console.log(perfectcount+"/"+data.length);

function detect(x, y, r){
    var success = true;
    var min = 10000;
    var a = angle(x,y);
    var l = dis(x,y);
    var threhold = r + Constant.maxRadius;
    var minl = l-threhold, maxl = l+threhold;
    var da;
    if(threhold >= l) da = 90;
    else da = Math.ceil(Math.asin(threhold/l)) + Constant.extraDetectionAngle;
    if(da>90) da=90;

    for(var i=(Math.round(a)-da+360)%360, count=1; count<=2*da; i++, count++){
        var index = i % 360;
        var current = angleList[index];
        for(var j=0; j<current.length; j++){
            if(current[j].len < minl) continue;
            if(current[j].len > maxl) break;

            var d = dis2(current[j].x,current[j].y,x,y);
            if(d < current[j].r + r) success = false;
            if(d < min) min = d
        }
    }

    return {"min":min, "success":success};
}













var svg = d3.select(".timeline")
    .attr("viewBox", "0 0 " + Constant.width + " " + Constant.height )
    //.style("background-color", "rgb(213, 216, 239)");

var defs = svg.append("defs")
    .selectAll(".pic")
    .data(data).enter()
    .append("pattern")
    .attr("id", function(d, i){
        return "image"+i;
    })
    .attr("x", "0")
    .attr("y", "0")
    .attr("height", function(d,i){
      return 4*d.r;
    })
    .attr("width", function(d,i){
        return 4*d.r;
    })
    .append("image")
    .attr("x", function(d,i){
        return -d.r;
    })
    .attr("y", function(d,i){
        return -d.r;
    })
    .attr("height", function(d,i){
        return 4*d.r;
    })
    .attr("width", function(d,i){
        return 4*d.r;
    })
    .attr("xlink:href", function(d, i){
        if(d.r >= Constant.maxRadius/2) return "image/middle/" + d.filename;
         return "image/smaller/" + d.filename;
    });

var spiral = svg.append("g")
    .attr("transform",
    "translate(" + (Constant.margin.left + Constant.layoutRadius/2) + "," + (Constant.margin.top + Constant.height/2) + ")")

//作为背景的circle
//spiral
//    .append("circle")
//    .attr("cx", 0)
//    .attr("cy", 0)
//    .attr("r", Constant.layoutRadius/2)
//    .style("stroke", "black")
//    .style("stroke-width", 0.25)
    //.style('fill', 'rgb(213, 216, 239)')


spiral
    .selectAll(".pic")
    .data(data).enter()
    .append("circle")
    .attr("cx", function(d){
        return d.len;
    })
    .attr("cy", 0)
    .attr("r", function(d){
        return d.r;
        //return 20;
    })
    .attr("id", function(d,i){
        return "pic_"+i;
    })
    .attr("class","pic")
    .style("stroke", "black")     // displays small black dot
    .style("stroke-width", 0.25)
    .attr("transform", function(d){
        return "rotate("+(d.angle-90)+",0,0)"
    })
    //.style("fill", "rgb(213, 216, 239)")
    .style("fill", function(d, i){
        return "url(#image"+i+")";
    });

for(var i=0; i<data.length; i++){

    $('#pic_'+i).qtip({ // Grab some elements to apply the tooltip to
        content: {
            text: pic_text[i]
        },
        style: { classes: 'qtip-bootstrap',
            tip:{
                'font-size': 50
            }}
    });

    (function(index){
        $('#pic_'+index).click(function(){
            var d = new Date();
            if(d-clickTime[index] <= 300) {
                currentPicNum = index;
                $("#myPhoto").attr("src", "image/origin/" + filenameList[index])
                //$("#myPhoto").attr("src", "image/ajax-loader.gif")
                    .css({'max-height': '600px', 'width': '100%', 'display': 'block', 'margin':'auto'});
                $('#myModal').modal('toggle');
                $('#pictext').text(pic_text[index]);
                var t = data[index].time;
                $('#datetext').text((t.getMonth()==0?1:t.getMonth())+"月" +
                     (t.getDay()==0?1: t.getDay()) + "日，" + t.getFullYear()+"年");
            }
            clickTime[index] = d;
        })}
    )(i);

}

$('#myModal').on('hidden.bs.modal', function () {
    $('#pictext').text('');
    $("#myPhoto").attr("src", "image/ajax-loader.gif")
        .css({'max-height': 'none', 'width': '50px', 'display': 'block', 'margin':'auto'});
})

$("#newtext").focusout(function(){
    var s = $("#newtext").val();
    $("#pictext").text(s);
    pic_text[currentPicNum] = s;
})

var abstratcShown = false;
$("#abstractBtn").click(function(){
    if(abstratcShown){
        $("#abstractText").text("显示摘要");
    }
    else{
        $("#abstractText").text("关闭摘要");
    }
    abstratcShown = !abstratcShown;
    for(var i=0; i<data.length; i+=50)
        $("#pic_"+i).qtip('toggle', abstratcShown);
});

$("#abstractBtn").click()