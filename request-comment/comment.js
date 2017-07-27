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



const request = http.request(options, (res) => {
	console.log(`状态码: ${res.statusCode}`);
	console.log(`响应头: ${JSON.stringify(res.headers)}`);
	res.setEncoding('utf8');
	res.on('data', (chunk) => {
		console.log(Buffer.isBuffer(chunk));
	});

	res.on('end', () => {
		console.log('响应结束...')
	});

	res.on('error', (error) => {
		console.log('Error: ' + error.message);
	})

});

request.write(postData);
request.end();


