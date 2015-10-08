/**
 * Made-Id入口文件
 * @author: SimonHao
 * @date:   2015-10-08 13:09:38
 */

'use strict';

var fs   = require('fs');
var path = require('path');
/**
 * comm options
 * @param {string} options.basedir  set basedir
 * @param {string} options.entry    set default entry file, eg: index.jade
 * @param {string} options.ext      set file extname, eg: .jade
 */

/**
 * covert filename to id
 * @param  {string} filename filename
 * @param  {object} options  covert options
 * @return {string}          id
 */
exports.id = function(filename, options){
  var relative_info = path.parse(path.relative(options.basedir, path.normalize(filename)));

  if(relative_info.base === options.entry){

    return relative_info.dir.split(path.sep).join('/');
  }else if(relative_info.ext === options.ext){

    return relative_info.dir.split(path.sep).join('/') + '/' + relative_info.name;
  }else{

    return relative_info.dir.split(path.sep).join('/') + '/' + relative_info.base;
  }
};

/**
 * covert file to sid
 * @param  {string} filename      filename
 * @param  {object} options       cover options
 * @param  {string} options.dev   set dev mode
 * @return {string}               sid
 */
exports.sid = function(filename, options){
  var id = exports.id(filename, options);

  if(options.dev){
    return id.split('/').join('-');
  }else{
    return id.split('/').join('-');
  }
};

/**
 * covert id to filename
 * @param  {string} id                id
 * @param  {object} options           covert options
 * @param  {string} options.filename  set id current filename
 * @return {string}                   filename
 */
exports.path = function(id, options){

  var filename = '';

  filename = path.join(options.basedir, id, options.entry);
  if(fs.existsSync(filename)){
      return filename;
  }

  filename = path.join(options.basedir, id + options.ext);
  if(fs.existsSync(filename)){
      return filename;
  }

  filename = path.join(options.basedir, id);
  if(fs.existsSync(filename)){
      return filename;
  }

  var dirname = path.dirname(options.filename);

  filename = path.join(dirname, id, options.entry);
  if(fs.existsSync(filename)){
      return filename;
  }

  filename = path.join(dirname, id + options.ext);
  if(fs.existsSync(filename)){
      return filename;
  }

  filename = path.join(dirname, id);
  if(fs.existsSync(filename)){
      return filename;
  }

  return id;
};




