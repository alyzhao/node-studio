const fs = require('fs');
const path = require('path');
const os = require('os');

const homePath = os.homedir();
const partPath = 'AppData/Local/Packages/Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy/LocalState/Assets';
const targetPath = path.resolve(homePath, partPath);

function dealPic(files, type) {
	files.forEach((item, index) => {
		let picPath = path.resolve(targetPath, item);
		if (type == 1) {
			let extName = path.extname(picPath);
			if (extName !== '.jpg') {
				let newFilePath = picPath + '.jpg';
				fs.renameSync(picPath, newFilePath);
			}
		} else {
			try {
				let stat = fs.statSync(picPath);
				let birthtime = new Date(stat.birthtime).getTime();
				let rs = fs.createReadStream(picPath);

				let dirPath = path.resolve(process.cwd(), './images')
				let existsFloder = fs.existsSync(dirPath);

				if (!existsFloder) {
					fs.mkdirSync(dirPath);
				}
				
				let ws = fs.createWriteStream(path.resolve(dirPath, birthtime + '.jpg'));
				rs.pipe(ws);
			} catch (e) {
				console.log(e);
			}
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
	if (typeof chunk === 'string' && chunk.slice(0, -2) !== 'nocopy') {
		process.stdout.write(`复制到新文件夹当中!\n`);
		process.stdout.write(`新文件夹路径: 当前目录下的 images 文件夹下!\n`);		
		const dirPath = path.resolve(__dirname, './images');
		console.log('dirPath', dirPath);
		dealPic(files, 0);
	}
	if (typeof chunk === 'string' && chunk.slice(0, -2) === 'q') {
		process.stdin.emit('end');
	} 
})

process.stdin.on('end', () => {
	process.stdout.write('bye bye\n');
})