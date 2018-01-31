const fs = require('fs');
const path = require('path');
const os = require('os');

const homePath = os.homedir();
const partPath = 'AppData/Local/Packages/Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy/LocalState/Assets';
const targetPath = path.resolve(homePath, partPath);

function dealPic(files, type = 0) {
	files.forEach((item, index) => {
		let picPath = path.resolve(targetPath, item);
		if (type == 1) {
			let extName = path.extname(picPath);
			if (extName !== '.jpg') {
				let newFilePath = picPath + '.jpg';
				fs.renameSync(picPath, newFilePath);
			}
		} else {
			let stat = fs.statSync(picPath);
			let birthtime = new Date(stat.birthtime).getTime();
			let rs = fs.createReadStream(picPath);

			let existsFloder = fs.existsSync(path.resolve(__dirname, './images'));

			if (!existsFloder) {
				fs.mkdirSync(path.resolve(__dirname, './images'));
			}
			
			let ws = fs.createWriteStream(path.resolve(__dirname, './images', birthtime + '.jpg'));
			rs.pipe(ws);
		}
	})
}

let files = fs.readdirSync(targetPath);

process.stdin.setEncoding('utf-8');

process.stdin.on('readable', () => {
	const chunk = process.stdin.read();

	let files = fs.readdirSync(targetPath);
	if (typeof chunk === 'string' && chunk.slice(0, -2) === 'nocopy') {
		process.stdout.write(`在原文件夹中修改!\n`);
		process.stdout.write(`原文件夹路径: ${targetPath}\n`);		
		dealPic(files, 1);
	}
	if (typeof chunk === 'string' && chunk.slice(0, -2) === 'copy') {
		process.stdout.write(`复制到新文件夹当中!\n`);
		process.stdout.write(`新文件夹路径: 当前目录下的 images 文件夹下!\n`);		
		dealPic(files);
	}
	if (typeof chunk === 'string' && chunk.slice(0, -2) === 'q') {
		process.stdin.emit('end');
	} 
})

process.stdin.on('end', () => {
	process.stdout.write('bye bye\n');
})