
var write = require('fs').createWriteStream
  , dirname = require('path').dirname
  , decorate = require('resultify')
  , mkdirp = require('mkdirp')

module.exports = decorate(writep)
module.exports.plain = writep

/**
 * fs.createWriteStream but makes parent directories if required
 * 
 * @param {String} path
 * @param {Stream} stream
 * @param {Function} cb
 */

function writep(path, stream, cb){
	mkdirp(dirname(path), 0777, function(e){
		stream.pipe(write(path))
			.on('error', cb)
			.on('finish', cb)
	})
}