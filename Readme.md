
# writefile

  safer file writing for node

## Getting Started

_With npm_  

	$ npm install writefile --save

then in your app:

```js
var writefile = require('writefile')
```

## API

- [fromBuffer()](#fromBuffer)
- [fromStream()](#fromStream)

### fromBuffer(path:String, text:String)

  fs.writeFile() but makes parent directories if required

### fromStream(path:String, text:Stream)

  fs.createWriteStream() but makes parent directories if required

## Running the tests

```bash
$ npm install
$ node test
```

## License 

[MIT](License)