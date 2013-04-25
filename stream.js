
var mkdirp = require('mkdirp')
  , Promise = require('laissez-faire/full')
  , dirname = require('path').dirname
  , write = require('fs').createWriteStream

/**
 * fs.createWriteStream but makes parent directories if required
 * 
 * @param {String} path
 * @param {Stream} stream
 * @return {Promise} nil
 */

module.exports = function(path, stream){
	var p = new Promise
	mkdirp(dirname(path), 0777, function(e){
		stream.pipe(write(path))
			.on('error', function(e){ p.reject(e) })
			.on('finish', function(){ p.fulfill() })
	})
	return p
}
