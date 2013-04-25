
var writefile = require('..')
  , streamFile = require('../stream')
  , fs = require('fs')
  , exec = require('child_process').exec
  , Stream = require('stream').PassThrough

var target = __dirname+'/a/b/c/target'
var txt = fs.readFileSync(target, 'utf8')
rmdir(function(){
	writefile(target, txt).end(function(){
		console.assert(fs.existsSync(target))
		console.log('done fs.writeFile()')

		rmdir(function(){
			var stream = new Stream
			streamFile(target, stream).end(function(){
				console.assert(fs.existsSync(target))
				console.log('done fs.createReadStream()')
			})
			stream.end(txt)
		})
	})
})

function rmdir(cb){
	exec('rm -r '+__dirname+'/a', function(error, stdout, stderr){
		if (error) throw error
		if (stderr) throw stderr
		console.assert(!fs.existsSync(__dirname+'/a'))
		cb()
	})
}
