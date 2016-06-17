/**
 * Created by Administrator on 2016/5/13.
 */
!function () {


    /*顶部黑色导航条*/
    !function () {
        var lg_tbar_right = document.getElementById("lg_tbar_right");
        var olis = lg_tbar_right.getElementsByTagName("li");
        for (var i = 0; i < olis.length; i++) {
            var obj = olis[i];
            obj.onmouseenter = function () {
                this.style.color = "#fff";
            }
            obj.onmouseleave = function () {
                this.style.color = "";
            }
            obj.onclick= function () {
                window.open("../拉勾网/register.html");
            }
        }
    }()
    //左边栏划过显示详细信息
    !function () {
        var mainNavs = document.getElementById("mainNavs"),
            mainBoxs = mainNavs.getElementsByClassName("mainBox"),
            len = mainBoxs.length;
        for (var i = 0; i < len; i++) {
            mainBoxs[i].onmouseover = function () {
                var T = this,
                    innerEle = T.getElementsByClassName("inner")[0];
                tools.addClass(T, "current");
                innerEle.style.display = "block";
            }
            mainBoxs[i].onmouseout = function () {
                var T = this,
                    innerEle = T.getElementsByClassName("inner")[0];
                tools.removeClass(T, "current");
                innerEle.style.display = "none";
            }
        }
    }()

    //搜索框交互
    ;(function(){
        var searchBox=document.getElementById("searchBox");
        var searchTextBox=document.getElementById("searchTextBox");
        var searchList=document.getElementById("searchList");
        var searchBtn=searchBox.getElementsByTagName("button")[0];
        document.body.onclick = function () {
            searchList.parentNode.style.display = 'none';
        };
        searchList.onclick = function (e) {
            e = e || window.event;
            var target = e.srcElement || e.target;
            //打开一个新页面
            window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(target.innerHTML), '_blank');
        };

        searchBtn.onclick = function (e) {
            var val = searchTextBox.value;
            if (val) {
                jsonp('http://suggestion.baidu.com/su',
                    {wd: val}, 'cb', function (data) {
                        var list = data.s;
                        var fragement = document.createDocumentFragment();
                        for (var i = 0, len = list.length; i < len; i++) {
                            var li = document.createElement('li');
                            li.innerHTML = list[i];
                            fragement.appendChild(li);
                        }
                        searchList.innerHTML = '';
                        searchList.parentNode.style.display = 'block';
                        searchList.appendChild(fragement);
                    });
            }
        };

        searchBox.onclick = function (e) {
            e.stopPropagation();
            e.cancelBubble = true;
        }

    })()




    ~function () {//轮播图
        var oBanInner = document.getElementById("banInner");
        var oul = oBanInner.getElementsByTagName("ul")[0];
        var oControl = document.getElementById("banControl");
        var olis = oControl.getElementsByTagName("li");
        var step = 0;
        //实现自动轮播
        function autoMove() {
            if (step >= 2) {
                step = 0;
                animate(oul, {top: -step * 160}, 700);
                return;
            }
            step++;
            animate(oul, {top: -step * 160}, 700);
        }
        oul.timer1 = setInterval(autoMove, 2000);

        oBanInner.onmouseover = function () {
            clearInterval(oul.timer1);
        }
        oBanInner.onmouseout = function () {
            oul.timer1 = setInterval(autoMove, 2000);
        }
        //点击控制按钮实现轮播
        for (var i = 0; i < olis.length; i++) {
            var cur = olis[i];
            cur.i = i;
            cur.onmouseenter = function () {
                clearInterval(oul.timer1);
                step = this.i;
                animate(oul, {top: -step * 160}, 700);
            }
        }
        for (var j = 0; j < olis.length; j++) {
            var current = olis[j];
            cur.onmouseleave = function () {
                oul.timer1 = setInterval(autoMove, 2000);
            }
        }
    }()

    //遮罩层跟随鼠标效果
    ;(function(){
        var oUl=document.getElementById("ad");
        var olis=oUl.getElementsByTagName("li");
        var oMark=oUl.getElementsByTagName("div");

        function deraction(pageX,pageY){
            var offset=tools.offset(this);
            var w=this.offsetWidth;
            var h=this.offsetHeight;
            var x=(pageX-offset.left-(w/2))*(w>h?h/w:1);
            var y=(pageY-offset.top-(h/2))*(h>w?w/h:1);
            return Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
        }
        mouseAnimate(300);
        function mouseAnimate(interval){
            interval=interval||200;
            for(var i=0;i<olis.length;i++){
                var cur=olis[i];
                cur.i=i;
                cur.onmouseenter= function (e) {
                    this.posL=0;
                    this.posT=0;
                    this.tarL=0;
                    this.tarT=0;
                    this.dire=deraction.call(this, e.pageX, e.pageY);
                    this.dire===0?this.posT="-113":null;
                    this.dire===1?this.posL="113":null;
                    this.dire===2?this.posT="113":null;
                    this.dire===3?this.posL="-113":null;
                    oMark[this.i].style.left=this.posL+"px";
                    oMark[this.i].style.top=this.posT+"px";
                    oMark[this.i].style.display="block";
                    animate(oMark[this.i],{
                        top:this.tarT,
                        left:this.tarL
                    },interval)
                }
                cur.onmouseleave= function (e) {
                    this.posL=0;
                    this.posT=0;
                    this.tarL=0;
                    this.tarT=0;
                    this.dire=deraction.call(this, e.pageX, e.pageY);
                    this.dire===0?this.tarT="-113":null;
                    this.dire===1?this.tarL="113":null;
                    this.dire===2?this.tarT="113":null;
                    this.dire===3?this.tarL="-113":null;
                    var that=this;
                    animate(oMark[this.i],{
                        top:this.tarT,
                        left:this.tarL
                    },interval,1,function () {
                        oMark[that.i].style.display="none";
                    })
                    /*oMark[this.i].style.display="none";*/
                }
            }
        }
    })()
    //热门职位和最新职位tab切换  选项卡
    ;(function () {
        var jobTab=document.getElementById("jobTab");
        var oLis=jobTab.getElementsByTagName("ul")[0].getElementsByTagName("li");
        var oDivs=document.getElementsByClassName("joblis");
        for(var i=0;i<oLis.length;i++){
            var cur = oLis[i];
            cur.i=i;
            cur.onclick= function () {
                for (var j = 0; j < oLis.length; j++) {
                    tools.removeClass(oLis[j],"liSelect");
                    tools.removeClass(oDivs[j],"divSelect");
                }
                tools.addClass(this,"liSelect");
                tools.addClass(oDivs[this.i],"divSelect");
            }
        }
    })()








    //热门职位部分绑定后台数据
    ;(function () {
        var hotJob = document.getElementById("hotJob");
        bindData();
        function bindData() {
            function callback(jsonData) {
                console.log(typeof jsonData);
                var data = jsonData.data;
                console.log(data);
                console.log(data.job);

                var str = "";
                for (var i = 0; i < data.length; i++) {
                    var cur = data[i];
                    str += '<ul class="clearFix">';
                    str += '<li class="top_l">' + cur["job"] + '[' + cur["addr"] + ']<span>' + cur["data"] + '</span></li>';
                    str += '<li class="top_r">' + cur.com + '</li>';
                    str += '<li class="mid_l">' + cur.salary + '<span>' + cur.exp + '</span></li>';
                    str += '<li class="mid_r">' + cur.cur + '</li>';
                    str += '<li class="bot_l">' + cur.des + '</li>';
                    str += '<li class="bot_r"><span>' + cur.bene + '</span><span>' + cur.bene + '</span><span>' + cur.bene + '</span></li>';
                    str += "</ul>";
                }
                hotJob.innerHTML = str;
            }

            //ajax
            var xhr = new XMLHttpRequest();
            xhr.open("get", "getData?_=" + Math.random(), true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
                    callback(JSON.parse(xhr.responseText));
                }
            };
            xhr.send(null);
        }
    })()



    ;(function () {//回到顶部
        var toTop = document.getElementById("toTop");
        toTop.onclick = function (){
            var duration = 500;
            var distance = tools.getWin('scrollTop');
            var interval = 15;
            var step = (distance/duration)*interval;
            var that=this;
            var timer = window.setInterval(function (){
                if(tools.getWin('scrollTop')-step <= 0){
                    window.clearInterval(timer);
                    tools.getWin('scrollTop',0);
                    that.style.display = 'none';
                    return;
                }
                var srcollTop = tools.getWin('scrollTop');
                srcollTop -= step;
                tools.getWin('scrollTop',srcollTop);
            },interval);

        }
        window.onscroll = showBtn;
        function showBtn(){
            var winScrollTop = tools.getWin('scrollTop');
            if(winScrollTop <= 0){
                toTop.style.display = 'none';
                return;
            }
            toTop.style.display="block";

            //底部登录条距离底部位置修改
            var loginToolBar = document.getElementById("loginToolBar"),
                docScrollH = tools.getWin("scrollHeight"),
                docClientH = tools.getWin("clientHeight");
            console.log("docClientH:"+docClientH + "docScrollH:" + docScrollH+"winScrollTop:"+winScrollTop)
            if(docScrollH - docClientH - winScrollTop < 68){
                loginToolBar.style.bottom = "68px";
            }else{
                loginToolBar.style.bottom = "0px";
            }
        }

    })()

    ;(function () {//我要反馈
        var reback = document.getElementById("reback");
        var rebackImg = reback.getElementsByTagName("div")[0];
        reback.onmouseenter = function () {
            rebackImg.style.backgroundPositionY = -30 + "px";
        };
        reback.onmouseleave = function () {
            rebackImg.style.backgroundPositionY = 0;
        }
    })()

}()
