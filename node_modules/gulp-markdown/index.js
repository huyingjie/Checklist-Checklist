'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var marked = require('marked');

module.exports = function (options) {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-markdown', 'Streaming not supported'));
			return;
		}

		marked(file.contents.toString(), options, function (err, data) {
			if (err) {
				cb(new gutil.PluginError('gulp-markdown', err, {fileName: file.path}));
				return;
			}

			file.contents = new Buffer(data);
			file.path = gutil.replaceExtension(file.path, '.html');

			cb(null, file);
		});
	});
};

module.exports.marked = marked;
