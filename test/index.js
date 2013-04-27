
var writefile = require('..')
  , fs = require('fs')
  , exec = require('child_process').exec
  , equals = require('fs-equals')
  , streamFile = require('../stream')
  , Stream = require('stream').PassThrough

var a = __dirname+'/a/target'
var b = __dirname+'/b/target'
var c = __dirname+'/c/target'
var txt = fs.readFileSync(a, 'utf8')

writefile(b, txt).then(function(){
	return equals(a, b)
}).then(function(answer){
	console.assert(answer)
	console.log('done fs.writeFile()')
}).then(function(){
	exec('rm -r '+__dirname+'/b', function(error, stdout, stderr){
		if (error) throw error
		if (stderr) throw stderr
		console.assert(!fs.existsSync(b))
	})
})

var stream = new Stream
streamFile(c, stream).then(function(){
	return equals(a, c)
}).then(function(answer){
	console.assert(answer)
	console.log('done fs.createReadStream()')
}).then(function(){
	exec('rm -r '+__dirname+'/c', function(error, stdout, stderr){
		if (error) throw error
		if (stderr) throw stderr
		console.assert(!fs.existsSync(c))
	})
})
stream.end(txt)
