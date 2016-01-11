/**
 * search module path
 * @author: SimonHao
 * @date:   2015-12-28 11:52:41
 */

'use strict';


var path = require('path');
var fs   = require('fs');
var util = require('./util');

/**
 * 查找ID对应的文件名
 * @param  {string} id                要查找的模块的ID
 * @param  {object} options           设置
 * @param  {string} options.basedir   模块基目录
 * @param  {string} options.filename  要查找的模块ID所在的文件名
 * @param  {string} options.entry     模块的默认入口文件
 * @param  {string} options.ext       模块的默认扩展名
 * @return {string}                   模块ID对应的文件名
 */
module.exports = function(id, options){
  if(id[0] === '.') return find_from_current(id, options);
  if(id[0] === '/') return find_from_basedir(id, options);

  return find_from_current(id, options) ||  find_from_basedir(id, options) || find_from_node_modules(id, options);
};

/**
 * 从当前文件开始寻找
 */
function find_from_current(id, options){
  if(!options.filename || !path.isAbsolute(options.filename)) return;

  return find_file(path.dirname(options.filename), id, options);
}

/**
 * 从基目录开始寻找
 */
function find_from_basedir(id, options){
  if(!options.basedir || !path.isAbsolute(options.basedir)) return;

  return find_file(options.basedir, id, options);
}

/**
 * 从 node_modules 中寻找
 */
function find_from_node_modules(id, options){
  var basedir = options.filename ? path.dirname(options.filename) : options.basedir;
  var folders = find_node_module_folder(basedir);

  var entry;

  for(var i = 0; i< folders.length; i++){
    entry = find_node_module_entry(folders[i], id, options);

    if(entry) return entry;
  }
}

/**
 * 从目录中查找文件
 */
function find_file(basedir, id, options){
  var filename;

  filename = path.join(basedir, id);
  if(fs.existsSync(filename) && fs.statSync(filename).isFile()) return filename;

  filename = path.join(basedir, id, options.entry);
  if(fs.existsSync(filename) && fs.statSync(filename).isFile()) return filename;

  filename = path.join(basedir, id + options.ext);
  if(fs.existsSync(filename) && fs.statSync(filename).isFile()) return filename;
}

/**
 * 寻找 node_modules 文件夹
 */
function find_node_module_folder(basedir){
  var dirsep = basedir.split(path.sep);
  var result = [];

  var dirpart, dirname;

  for(var i = dirsep.length; i > 0; i--){
    if(dirsep[i-1] === 'node_modules') continue;

    dirpart = dirsep.slice(0, i);
    dirpart.push('node_modules');
    dirname = dirpart.join(path.sep);

    if(fs.existsSync(dirname) && fs.statSync(dirname).isDirectory()){
      result.push(dirname);
    }
  }

  return result;
}

/**
 * 寻找模块的入口文件
 */
function find_node_module_entry(modules_folder, id, options){
  var package_info = util.get_package_info(modules_folder, id);

  if(!package_info) return;

  var module_dir = path.join(modules_folder, id);
  var module_entry = package_info.browser || package_info.main || '';

  return find_file(module_dir, module_entry, options);
}