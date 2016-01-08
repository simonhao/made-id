/**
 * utils
 * @author: SimonHao
 * @date:   2015-12-28 17:01:15
 */

'use strict';

var fs   = require('fs');
var path = require('path');

/**
 * 获取 package.json 的信息
 */
exports.get_package_info = function(modules_folder, id){
  var basedir = path.join(modules_folder, id);
  if(!fs.existsSync(basedir) || !fs.statSync(basedir).isDirectory()) return;

  var package_file = path.join(basedir, 'package.json');
  if(!fs.existsSync(package_file) || !fs.statSync(package_file).isFile()) return;

  var package_str, package_info;
  package_str = fs.readFileSync(package_file, 'utf-8');

  try{
    package_info = JSON.parse(package_str);
  }catch(err){
    console.error('package file', package_file, 'has syntax error');
    console.error(err);
  }

  return package_info;
};