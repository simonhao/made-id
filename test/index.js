/**
 * 测试用例
 * @author: SimonHao
 * @date:   2015-10-08 14:09:07
 */

'use strict';

var mpath = require('../lib/path.js');
var mid = require('../lib/id.js');

var options = {
  basedir: __dirname,
  entry: 'index.js',
  ext: '.js'
};

/*options.filename = __dirname + '/comm/page/index.js';

console.log(mpath('inherits', options))*/

console.log(mid('/Users/IetnHao/Projects/Made-Id/node_modules/inherits/inherits_browser.js', options));