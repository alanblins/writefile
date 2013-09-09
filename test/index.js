
var Stream = require('stream').PassThrough
var exec = require('child_process').exec
var equals = require('fs-equals/assert')
var streamFile = require('../stream')
var writefile = require('..')
var fs = require('fs')

var a = __dirname+'/a/target'
var b = __dirname+'/b/target'
var c = __dirname+'/c/target'
var txt = fs.readFileSync(a, 'utf8')

writefile(b, txt).then(function(){
	return equals(a, b)
}).then(function(){
	console.log('done fs.writeFile()')
}).then(function(){
	exec('rm -r '+__dirname+'/b', function(error, stdout){
		if (error) throw error
		console.assert(!fs.existsSync(b))
	})
})

var stream = new Stream
streamFile(c, stream).then(function(){
	return equals(a, c)
}).then(function(){
	console.log('done fs.createReadStream()')
}).then(function(){
	exec('rm -r '+__dirname+'/c', function(error, stdout){
		if (error) throw error
		console.assert(!fs.existsSync(c))
	})
})
stream.end(txt)