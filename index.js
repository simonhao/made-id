/**
 * Made-Id入口文件
 * @author: SimonHao
 * @date:   2015-10-08 13:09:38
 */

'use strict';

var fs     = require('fs');
var crypto = require('crypto');
var path   = require('path');
/**
 * comm options
 * @param {string} options.basedir  设置根目录
 * @param {string} options.entry    设置入口文件, eg: index.jade
 * @param {string} options.ext      设置扩展名, eg: .jade
 */

/**
 * 将文件名转换为ID
 * @param  {string} filename  文件名
 * @param  {object} options   设置，参考comm options
 * @return {string}           ID
 */
exports.id = function(filename, options){
  var path_info, path_buf;

  if(path.isAbsolute(filename)){
    path_info = path.parse(path.relative(options.basedir, filename));
    path_buf  = [];

    if(path_info.dir){
      path_buf = path_info.dir.split(path.sep);
    }

    if(path_info.base === options.entry){

    }else if(path_info.ext === options.ext){
      path_buf.push(path_info.name);
    }else{
      path_buf.push(path_info.base);
    }

    return path_buf.join('/');
  }else{
    console.error('filename is\'t absolute', filename);
  }
};

function gen_short_id(str){
  return str.split('/').join('-');
}

/**
 * 将文件名转换为SID
 * @param  {string} filename      文件名
 * @param  {object} options       设置，参考comm options
 * @param  {string} options.dev   设置转换模式是否为开发模式
 * @return {string}               SID
 */
exports.sid = function(filename, options){
  var id = exports.id(filename, options);

  if(options.model === 'dev'){
    return id.split('/').join('-');
  }else{
    return gen_short_id(id);
  }
};

/**
 * 从ID获取真实路径名
 * @param  {string} id                ID
 * @param  {object} options           设置，参考comm options
 * @param  {string} options.filename  设置该ID所在的文件
 * @return {string}                   真实路径名
 */
exports.path = function(id, options){
  var filename = '';

  filename = path.join(options.basedir, id, options.entry);
  if(fs.existsSync(filename) && fs.statSync(filename).isFile()){
      return filename;
  }

  filename = path.join(options.basedir, id + options.ext);
  if(fs.existsSync(filename) && fs.statSync(filename).isFile()){
      return filename;
  }

  filename = path.join(options.basedir, id);
  if(fs.existsSync(filename) && fs.statSync(filename).isFile()){
      return filename;
  }

  var dirname = path.dirname(options.filename);

  filename = path.join(dirname, id, options.entry);
  if(fs.existsSync(filename) && fs.statSync(filename).isFile()){
      return filename;
  }

  filename = path.join(dirname, id + options.ext);
  if(fs.existsSync(filename) && fs.statSync(filename).isFile()){
      return filename;
  }

  filename = path.join(dirname, id);
  if(fs.existsSync(filename) && fs.statSync(filename).isFile()){
      return filename;
  }
};




