var http = require("http");
var fs = require("fs");
var url = require("url");


var server = http.createServer(function(req, res) {
	res.setHeader("content-type","text/html;charset=utf-8");
	if(req.url == "/favicon.ico") {
		return;
	}
	var urlObj = url.parse(req.url,true);
	var path = urlObj.pathname;
	var data = urlObj.query;
	if(path == "/tijiao") {
		// 拿数据，创建文件，写数据
		console.log(data);
		console.log(data.message)
		fs.writeFile("files/"+data.username+".txt",data.message,function(err) {
			if(err) {
				console.log("数据写入失败");
				console.log(err);
				return;
			}
			console.log("数据写入成功");
			res.end("data write succes");
		});
		return;
	}
	if(path == "/show") {
		// 显示所有数据
		fs.readdir("files",function(err,files) {
			if(err) {
				console.log("数据读取失败");
				console.log(err);
				return;
			};
			(function iterate(i) {
				if(i >= files.length) {
					res.end("<font color='green'>显示完成</font>");
					return;
				}
				// 开始读取文件内容
				fs.readFile("files/"+files[i],"utf-8",function(err, data) {
					if(err) {
						console.log(files[i]+"读取失败");
						return ;
					}
					res.write("<h3>"+files[i]+"的内容：</h3>");
					var arr = data.split("\n");
					// console.log(files[i]+"的内容：");
					for(var j=0; j<arr.length; j++) {
						// console.log(arr[j]);
						res.write("<p>"+arr[j]+"</p>");
					}
					// 自调一下
					iterate(++i);
				})
			})(0);
		});
		return;
	}

	fs.readFile("form.html","utf-8",function(err, data) {
		if(err) {
			console.log("内容读取失败");
			console.log(err);
			return;
		}
		res.end(data);
	});

	// res.end("error req end");
});


server.listen(4000);