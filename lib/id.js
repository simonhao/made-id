/**
 * convert path to id
 * @author: SimonHao
 * @date:   2015-12-28 16:31:10
 */

'use strict';

var fs   = require('fs');
var path = require('path');

/**
 * 将给定的文件名转换为ID
 * @param {string} filename 文件名
 * @param {object} options  设置
 * @param {string} options.basedir 基目录
 * @param {string} options.entry   默认入口文件
 * @param {string} options.ext     文件扩展名
 * @return {string} 返回文件的ID
 */
module.exports = function(filename, options){

  if(!path.isAbsolute(filename)){
    console.error('filename must absolute', filename);
    return;
  }

  if(is_node_module(filename, options.basedir)){
    return get_node_module_id(filename, options);
  }else{
    return get_base_module_id(filename, options);
  }
};

function get_base_module_id(filename, options){
  if(!options.basedir || !path.isAbsolute(options.basedir)) return;

  return get_id(path.relative(options.basedir, filename), options);
}

function get_node_module_id(filename, options){
  var path_parts = filename.split('node_modules' + path.sep);
  var relative_path = path_parts[path_parts.length - 1];

  return get_id(relative_path, options);
}

function get_id(relative_path, options){
  var path_info = path.parse(relative_path);
  var path_buf = [];

  if(path_info.dir){
    path_buf = path_info.dir.split(path.sep);
  }

  if(path_info.base === options.entry){
    if(!path_info.dir) path_buf.push(path_info.name);
  }else if(path_info.ext === options.ext){
    path_buf.push(path_info.name);
  }else{
    path_buf.push(path_info.base);
  }

  return path_buf.join('/');
}

function is_node_module(filename, basedir){
  return path.relative(basedir, path.dirname(filename))[0] === '.' && filename.indexOf('node_modules') >= 0;
}