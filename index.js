
var mkdirp = require('mkdirp')
  , Promise = require('laissez-faire/full')
  , dirname = require('path').dirname
  , write = require('fs').writeFile

/**
 * fs.writeFile but makes parent directories if required
 * 
 * @param {String} path
 * @param {String} text
 * @return {Promise} nil
 */

module.exports = function(path, text){
	var p = new Promise
	write(path, text, function(e){
		if (e) mkdirp(dirname(path), 0777, function(e){
			if (e) p.reject(e)
			else write(path, text, function(e){
				if (e) p.reject(e)
				else p.fulfill()
			})
		})
		else p.fulfill()
	})
	return p
}
