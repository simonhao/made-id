/**
 * covert filename to sid
 * @author: SimonHao
 * @date:   2015-12-28 18:02:57
 */

'use strict';

var mid = require('./id');

module.exports = function(filename, options){
  var id = mid(filename, options);

  return generate_sid(id, options.model);
};

function generate_sid(id, model){
  return id.split('/').join('-');
}