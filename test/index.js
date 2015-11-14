/**
 * 测试用例
 * @author: SimonHao
 * @date:   2015-10-08 14:09:07
 */

'use strict';

var mid = require('../index.js');

var options = {
  basedir: '/home/simonhao/project/pomelo/src/',
  entry: 'view.jade',
  ext: '.jade'
};

console.log('filename ==> id');
console.log(mid.id('/home/simonhao/project/pomelo/src/comm/module/header/view.jade', options));
console.log(mid.id('/home/simonhao/project/pomelo/src/comm/style/footer.jade', options));

var style_options = {
  basedir: '/home/simonhao/project/pomelo/src/',
  entry: 'style.styl',
  ext: '.styl'
};
console.log(mid.id('/home/simonhao/project/pomelo/src/comm/module/header/style.styl', style_options));
console.log(mid.id('/home/simonhao/project/pomelo/src/comm/style/footer.styl', style_options));

console.log('filename ==> sid');
console.log(mid.sid('/home/simonhao/project/pomelo/src/comm/module/header/view.jade', options));
console.log(mid.sid('/home/simonhao/project/pomelo/src/comm/style/footer.jade', options));

options.model = 'dev';

console.log('filename ==> sid dev-mode');
console.log(mid.sid('/home/simonhao/project/pomelo/src/comm/module/header/view.jade', options));
console.log(mid.sid('/home/simonhao/project/pomelo/src/comm/style/footer.jade', options));

options.filename = '/home/simonhao/project/pomelo/src/comm/module/layout/view.jade';

console.log('id ==> filename');
console.log(mid.path(mid.id('/home/simonhao/project/pomelo/src/comm/module/header/view.jade', options), options));
console.log(mid.path(mid.id('/home/simonhao/project/pomelo/src/comm/style/footer.jade', options), options));