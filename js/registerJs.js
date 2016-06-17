(function () {
    var form_head=document.getElementById("form_head");
    var oLis=form_head.getElementsByTagName("li");
    var oDivs=document.getElementsByClassName("formbody");
    var oSpan = form_head.getElementsByTagName("span")[0];
    for (var i = 0; i < oLis.length; i++) {
        var cur = oLis[i];
        cur.i=i;
        cur.onclick= function () {
            for (var j = 0; j < oLis.length; j++) {
                tools.removeClass(oLis[j],"active");
                oDivs[j].style.display="none";
                oSpan.style.left = "0px";
            }
            tools.addClass(this,"active");
            oDivs[this.i].style.display="block";
            if(this.i === 1){
                oSpan.style.left = "150px";
            }
        }
    }
    
    
    
    
    
    
    
    

})()
