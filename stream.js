
var write = require('fs').createWriteStream
var dirname = require('path').dirname
var lift = require('lift-result/cps')
var mkdirp = require('mkdirp')

/**
 * fs.createWriteStream but makes parent directories if required
 *
 * @param {String} path
 * @param {Stream} stream
 * @param {Function} cb
 */

module.exports = lift(function(path, stream, cb){
	mkdirp(dirname(path), 0777, function(e){
		stream.pipe(write(path))
			.on('error', cb)
			.on('finish', cb)
	})
})