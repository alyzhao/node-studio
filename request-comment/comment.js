var http = require('http');
var querystring = require('querystring');

const postData = querystring.stringify({
	'oid': 12595919,
	'type': 1,
	'message': '期待下一次更新！',
	'plat': 1,
	'jsonp': 'jsonp',
	'csrf': 'f5234cc73b76fe2e42bc25705718e235'
});

const options = {
	hostname: 'www.bilibili.com',
	port: 80,
	method: 'POST',
	path: '/video/av12595919/',
	headers: {
		'Accept': 'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding': 'gzip, deflate, br',
		'Accept-Language': 'zh-CN,zh;q=0.8',
		'Connection': 'keep-alive',
		'Content-Length': postData.length,
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie': 'fts=1478858375; buvid3=69B5136F-1149-45CA-859B-9D614EA11F3628564infoc; sid=87uk1k53; pgv_pvi=5853003776; UM_distinctid=15b9a45e3ae1-065aec9792f6fb-396b4e08-1fa400-15b9a45e3afe2; rpdid=oqmlqwolildoplilpolxw; biliMzIsnew=1; biliMzTs=0; DedeUserID=63050903; DedeUserID__ckMd5=21aa1a382fb9ac3b; SESSDATA=fdc2276f%2C1503070509%2C6c4fc0d2; bili_jct=f5234cc73b76fe2e42bc25705718e235; LIVE_BUVID=edc45a7dd0e33cd76a782b8c756810ff; LIVE_BUVID__ckMd5=b8ef30a7f19c7632; user_face=http%3A%2F%2Fstatic.hdslb.com%2Fimages%2Fmember%2Fnoface.gif; finger=edc6ecda; pgv_si=s1847496704; purl_token=bilibili_1501157566; _dfcaptcha=1b1419c024f93b61949b990ad1382fdf; _cnt_pm=0; _cnt_notify=0',
		'Host': 'api.bilibili.com',
		'Origin': 'https://www.bilibili.com',
		'Referer': 'https://www.bilibili.com/video/av12595919/',
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
	}
};

const imoocFormData = querystring.stringify({
	'content': "老师讲的真心棒!!!",
	'mid': 8837
});

const imoocOptions = {
	hostname: 'www.imooc.com',
	port: 80,
	path: '/course/docomment',
	method: 'POST',
	headers: {
		'Accept': 'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Cache-Control':'no-cache',
		'Connection':'keep-alive',
		'Content-Length':imoocFormData.length,
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'imooc_uuid=a40a2d31-dcdf-4321-9de9-b6326bd366bd; imooc_isnew_ct=1493096962; UM_distinctid=15cf2bc5db5543-0693fb43d57b18-5393662-100200-15cf2bc5db64ca; CNZZDATA1261110065=110790494-1498719523-null%7C1498719523; PHPSESSID=ll141d1mf5lljqs587d5b53ib0; channel=491b6f5ab9637e8f6dffbbdd8806db9b_phpkecheng; loginstate=1; apsid=NkYzIyMGEwODgyZDUzNjJkZTUxMjE1NTcxZWM4ZjUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANTYzNDc4OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzMzc3Mjk3NzA2QHFxLmNvbQAAAAAAAAAAAAAAAAAAADQ1ZWVmYWNlYmUyN2JhN2E5ODQ3ZTg5OGE1MzM0OGY3Qa96WUGvelk%3DMW; last_login_username=3377297706%40qq.com; bdshare_firstime=1501214313413; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1501053016,1501053029,1501212194,1501212405; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1501214797; imooc_isnew=2; cvde=597aae74a8d09-128',
		'Host':'www.imooc.com',
		'Origin':'http://www.imooc.com',
		'Pragma':'no-cache',
		'Referer':'http://www.imooc.com/video/8837',
		'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest'
	}
}



const request = http.request(imoocOptions, (res) => {
	console.log(`状态码: ${res.statusCode}`);
	console.log(`响应头: ${JSON.stringify(res.headers)}`);
	// res.setEncoding('utf8');
	res.on('data', (chunk) => {
		console.log(Buffer.isBuffer(chunk));
		let resData = chunk.toString();
		console.log('resData: ' + resData);
	});

	res.on('end', () => {
		console.log('响应结束...')
	});

	res.on('error', (error) => {
		console.log('Error: ' + error.message);
	})

});

request.write(imoocFormData);
request.end();


