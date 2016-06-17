/**
 * Created by Administrator on 2016/5/10.
 */
function animate(ele, obj, duration,fn) {
    console.log(obj.left);
    clearInterval(ele.timer);
    var oBegin = {};
    var oChange = {};
    for (var attr in obj) {
        var target = obj[attr];
        var begin = animate.getCss(ele, attr);
        var change = target - begin;
        var flag = 0;
        if (change) {
            oBegin[attr] = begin;
            oChange[attr] = change;
            flag++;
        }
    }
    if (!flag)return;
    var time = 0;
    var interval = 15;
    ele.timer = setInterval(move, interval);
    function move() {
        time += interval;
        if (time < duration) {
            for (var key in oChange) {
                var begin = oBegin[key];
                var change = oChange[key];
                var val = animate.linear(time, begin, change, duration);
                animate.setCss(ele, key, val);
            }
        } else {
            clearInterval(ele.timer);
            ele.timer = null;
            for (var k in oChange) {
                var target = obj[k];
                animate.setCss(ele, k, target);
            }
            fn&&fn();
        }
    }

}
animate.linear = function (t, b, c, d) {
    return b + c / d * t;
};

animate.getCss = function (ele, attr) {
    if (window.getComputedStyle) {
        return parseFloat(window.getComputedStyle(ele, null)[attr]);
    } else {
        if (attr === "opacity") {
            var val = ele.currentStyle.filter;
            var reg = /alpha\(opacity=(\d+(?:\.\d+)?)\)/;
            if (reg.test(val)) {
                return RegExp.$1 / 100;
            } else {
                return 1;
            }
        } else {
            parseFloat(ele.currentStyle[attr]);
        }
    }
};

animate.setCss=function(ele,attr,val){
    if(attr=="opacity"){
        ele.style.opacity=val;
        ele.style.filter="alpha(opacity="+val*100+")";
    }else{
        ele.style[attr]=val+"px";
    }
}