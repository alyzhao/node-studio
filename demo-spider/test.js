
let url = "http//";

function test(url) {
	url += "333";
	console.log(url);
}

test("12345");

console.log(url);


// 函数能访问全局变量, 但是如果函数有形参且名称相同, 那么函数内部的参数是形参, 且互补干扰, 基本类型是值传递

// 如果没有形参那么访问的是全局变量
