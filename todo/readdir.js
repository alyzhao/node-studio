const fs = require('fs');
const path = require('path');
const os = require('os');

const homePath = os.homedir();		// 返回用户的 home 目录

// const userInfo = os.userInfo(); 		// 返回用户信息
/*
{ uid: -1,
  gid: -1,
  username: 'gegehehehe',
  homedir: 'C:\\Users\\gegehehehe',
  shell: null 
}
*/

let psPathPart = 'AppData/Local/Packages/Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy/LocalState/Assets';

const psPath = path.resolve(homePath, psPathPart);

console.log('psPath', psPath);

const path_dir = path.resolve(__dirname, '..');


fs.readdir(psPath, (err, files) => {
	if (err) {
		console.log(err);
	} else {
		console.log(files);

		files.forEach((item, index) => {
			let oldFilePath = path.resolve(psPath, item);
			// let newFilePath = path.resolve(psPath, item + '.jpg');
			// fs.renameSync(oldFilePath, newFilePath);

			let stat = fs.statSync(oldFilePath);
			let birthtime = new Date(stat.birthtime).getTime();

			let rs = fs.createReadStream(oldFilePath);

			let existsFloder = fs.existsSync(path.resolve(__dirname, './images'));

			if (!existsFloder) {
				fs.mkdirSync(path.resolve(__dirname, './images'));
			}

			let ws = fs.createWriteStream(path.resolve(__dirname, './images', birthtime + '.jpg'));

			rs.pipe(ws);

			// fs.copyFile(oldFilePath, newFilePath, (err) => {
			// 	if (err) throw err;
			// 	console.log(err);
			// })
		})



	}
})