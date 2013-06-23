
var dirname = require('path').dirname
  , write = require('fs').writeFile
  , decorate = require('resultify')
  , mkdirp = require('mkdirp')

module.exports = decorate(writep)
module.exports.plain = writep

/**
 * fs.writeFile but makes parent directories if required
 * 
 * @param {String} path
 * @param {String} text
 * @param {Function} cb
 */

function writep(path, text, cb){
	write(path, text, function(e){
		if (!e) return cb(null)
		if (e.code == 'ENOENT') {
			return mkdirp(dirname(path), 0777, function(e){
				if (e) cb(e)
				else write(path, text, cb)
			})
		}
		cb(e)
	})
}