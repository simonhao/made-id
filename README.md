#Made-ID
[![Build Status](https://travis-ci.org/simonhao/made-id.svg?branch=master)](https://travis-ci.org/simonhao/made-id)

find moduel real path use id and generate short_id from path

## Install
> npm install made-id

## Options
``` javascript
options = {
  basedir: '', //use for find module
  entry: '', //module entry file, such as: index.jade
  ext: '', //module ext file name, such as: .jade
};
```

## API
### .id(filename, options)
generate module id from filename

### .sid(filename, options)
```
options.dev
```
default: false
if options.dev is true, this will genreate a sid like id. you can find module's path according sid.

### .path(id, options)
find module real path
```
options.filename
```

## Usage
``` javascript
var mid = require('../index.js');

var options = {
  basedir: '/home/simonhao/project/pomelo/src/',
  entry: 'view.jade',
  ext: '.jade'
};

console.log('filename ==> id');
console.log(mid.id('/home/simonhao/project/pomelo/src/comm/module/header/view.jade', options));
// comm/module/header

console.log(mid.id('/home/simonhao/project/pomelo/src/comm/style/footer.jade', options));
// comm/style/footer

```

