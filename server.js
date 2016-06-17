var http=require("http");
var url=require("url");
var fs=require("fs");
var suffixFn = require("./js/suffixFn");
var server = http.createServer(function (req,res) {
    var urlObj=url.parse(req.url,true);
    var pathname=urlObj.pathname;
    var query=urlObj.query;
    var reg = /\.(HTML|JS|CSS|TXT|JSON|JPG|JPEG|PNG|GIF|BMP|ICO|SVG)/i;
    if (reg.test(pathname)) {
        try {
            var suffix = reg.exec(pathname)[1].toUpperCase();
            console.log(suffix);
            var suffixType = suffixFn.querySuffixType(suffix);
            console.log(suffixType);
            var conFile = /^(HTML|JS|CSS|TXT|JSON)$/i.test(suffix) ? fs.readFileSync("." + pathname, "utf8") : fs.readFileSync("." + pathname);
            res.writeHead(200, {'content-type': suffixType + ";charset=utf-8;"});
            res.end(conFile);
        } catch (e) {
            res.writeHead(404);
            res.end();
        }
        return;
    }
    if(pathname=="/getData"){
        var con=fs.readFileSync("./hotJobData.json","utf8");
        con=JSON.parse(con);
        var ary=[];
        for (var i = 0;i<14; i++) {
            var cur=con[i];
            ary.push(cur);
        }
        res.writeHead(200,{"content-type":"application/json;charset=utf-8;"});
        res.end(JSON.stringify({
            total:con.length,
            data:ary
        }));
        return;
    }
    res.writeHead(404);
    res.end();
})
server.listen(1111, function () {
    console.log("server start at port 1111");
})

