/**
 * Created by Administrator on 2016/6/1.
 */
var tools = (function () {
    //->hasClass:验证当前元素中是否包含className这个样式类名
    function hasClass(curEle, className) {
        var reg = new RegExp("(^| +)" + className + "( +|$)");
        return reg.test(curEle.className);
    }

    //->addClass:给元素增加样式类名
    function addClass(curEle, className) {
        var ary = className.replace(/(^ +| +$)/g, "").split(/ +/g);
        for (var i = 0, len = ary.length; i < len; i++) {
            var curName = ary[i];
            if (!this.hasClass(curEle, curName)) {
                curEle.className += " " + curName;
            }
        }
    }

    //->removeClass:给元素移除样式类名
    function removeClass(curEle, className) {
        var ary = className.replace(/(^ +| +$)/g, "").split(/ +/g);
        for (var i = 0, len = ary.length; i < len; i++) {
            var curName = ary[i];
            if (this.hasClass(curEle, curName)) {
                var reg = new RegExp("(^| +)" + curName + "( +|$)", "g");
                curEle.className = curEle.className.replace(reg, " ");
            }
        }
    }

    function parents(ele) {//获取包括自己和其所有的父亲节点
        var ary = [];
        while (ele) {
            ary.push(ele);
            ele = ele.parentNode;
        }
        return ary;
    }

    function offset(ele) {
        var left = ele.offsetLeft;
        var top = ele.offsetTop;
        var eleParent = ele.offsetParent;
        while (eleParent) {
            if (window.navigator.userAgent.indexOf('MSIE 8.0') == -1) { //标准浏览器
                left += eleParent.clientLeft;
                top += eleParent.clientTop;
            }
            left += eleParent.offsetLeft;
            top += eleParent.offsetTop;
            eleParent = eleParent.offsetParent;
        }
        return {left: left, top: top};
    }
     function getWin(attr, val) { //一个参数的时候是读取，两个参数可以赋值
        if (val !== undefined) {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
        return document.documentElement[attr] || document.body[attr];
    }
    function getCss (curEle, attr) {
        //
        var reg = /^(-?\d+(\.\d+)?)(?:px|em|pt|deg|rem)$/;
        var val = null;
        if (/MSIE (?:6|7|8)/.test(window.navigator.userAgent)) {
            //这里处理filter的滤镜问题  alpha(opacity=40);
            if (attr === 'opacity') {
                //alpha(opacity=40)
                val = curEle.currentStyle['filter'];
                var reg1 = /^alpha\(opacity=(\d+(\.\d+)?)\)/;
                return reg1.test(val) ? RegExp.$1 / 100 : 1;
            }
            val = curEle.currentStyle[attr];
        } else {
            val =   attr === 'opacity' ?   window.getComputedStyle(curEle,null)[attr]/1 : window.getComputedStyle(curEle,null)[attr];
        }
        return reg.test(val) ? parseFloat(val) : val; //如果正则验证通过，寿命返回值是带单位的，那么我们就要人为去掉这个单位。否则不变
    }


    return {
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        parents: parents,
        offset: offset,
        getWin:getWin,
        getCss:getCss
    }
})()