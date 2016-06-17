var a=[];
var jobAry=["java","php","web","node","c"];
var addrAry=["北京","广州","上海","深圳"];
var date=["2分钟前发布","刚刚发布","1天前发布","一个月前发布"];
var salary=["10k-15k","15k-18k","30k-50k"];
var exp=["3年经验/本科","5年经验/本科","经验不限/本科"];
var des=["大数据分析、期权激励、牛人、巨大发展空间","项目奖，期权，五险一金，逆向跨境电商"];
var com=["淘宝","腾讯","百度","华为"];
var cul=["移动互联网 / 成长型(B轮)","电子商务 · O2O / 初创型(未融资)","移动互联网 · 硬件 / 成长型(A轮)"];
var bene=["五险一金","股票期权","技术前沿","技能培训","节日礼物","年底双薪"];

function ran(n,m){
    return Math.round(Math.random()*(m-n)+n);
}
for(var i=0;i<83;i++){
    var obj={};
    obj["job"]=jobAry[ran(0,4)];
    obj["addr"]=addrAry[ran(0,3)];
    obj["data"]=date[ran(0,3)];
    obj["salary"]=salary[ran(0,2)];
    obj["exp"]=exp[ran(0,2)];
    obj["des"]=des[ran(0,1)];
    obj["com"]=com[ran(0,3)];
    obj["cur"]=cul[ran(0,2)];
    obj["bene"]=bene[ran(0,5)];
    a.push(obj);
}

console.log(JSON.stringify(a));