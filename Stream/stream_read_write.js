const Readable = require('stream').Readable;
const Writable = require('stream').Writable;

let readStream = new Readable();
let writStream = new Writable();

readStream.push('I');
readStream.push('Love');
readStream.push('You');
readStream.push(null);

writStream._write = function(chunk, encode, cb) {
	console.log(chunk.toString());
	cb();
}

readStream.pipe(writStream);

