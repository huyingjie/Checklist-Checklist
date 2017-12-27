
// gulp-wrapper
//
//  A plugin used to wrap files with custom strings



var through2    = require('through2'),
    gutil       = require('gulp-util');
var PluginError = gutil.PluginError;


module.exports = function(opt) {

  'use strict';

  if(typeof opt !== 'object'){
    opt = {};
  }

  return through2.obj(function (file, enc, callback) {

    //  check if file is there
    if (file.isNull()) {
        this.push(file);
        return callback();
      }

    if (file.isStream()){
        return this.emit('error', new PluginError('gulp-wrapper',  'Streaming not supported'));
      }

        //  get the file's name
    var fileName = file.path.replace(file.base, ''),  //  replace front slash from windowsLand
        //  set the new contents
        newContentString = file.contents.toString(),
        header,
        footer;

    //  normalize windows platform slashes
    if(process.platform.match(/^win/)){
      fileName = fileName.replace(/\\/g, '/');
    }

    //  set now the header and footer values according to the
    //  options passed...

    //  -------------------------------  if header given is a function...
    if(typeof opt.header === 'function'){
      //  execute the function with `file` as an argument
      header = opt.header(file);

    //  -------------------------------  if header given is a string...
    } else if(typeof opt.header === 'string'){
      //  inject the file name if needed
      header = opt.header.replace(/\${filename}/g, fileName);

    //  -------------------------------  if header given is anything else...
    } else if(typeof opt.header !== 'string'){
      header = '';
    }

    //  -------------------------------  if footer given is a function...
    if(typeof opt.footer === 'function'){
      //  execute the function with `file` as an argument
      footer = opt.footer(file);

    //  -------------------------------  if footer given is a string...
    } else if(typeof opt.footer === 'string'){
      //  inject the file name if needed
      footer = opt.footer.replace(/\${filename}/g, fileName);

    //  -------------------------------  if footer given is anything else...
    } else if(typeof opt.footer !== 'string'){
      footer = '';
    }


    //  wrap the contents
    newContentString = header + newContentString + footer;

    //  change the file contents
    file.contents = new Buffer(newContentString);

    //  push the file into the output
    this.push(file);
    callback();
  });
};
