var should = require('should'),
    wrapper = require('../'),
    gutil = require('gulp-util'),
    fs = require('fs'),
    pj = require('path').join;

var getFakeFile = function (fileContent){

	return new gutil.File({
		path: './test/fixture/file.js',
		cwd: './test/',
		base: './test/fixture/',
		contents: new Buffer(fileContent || '')
	});
};

describe('gulp-wrapper', function () {

	describe('wrapper()', function () {

		it('should pass file when it isNull()', function (done) {

			//	make a wrapper stream
			var stream = wrapper(),
			//	make an empty file
			    emptyFile = {
			    	isNull: function () { return true; }
			    };

			stream.on('data', function (data) {
				data.should.equal(emptyFile);
				done();
			});

			stream.write(emptyFile);
		});

		it('should emit error when file isStream()', function(done){

			var stream = wrapper(),
			    streamFile = {
			    	isNull: function () { return false; },
			    	isStream: function () { return true; }
			    };

			stream.on('error', function (err) {
				err.message.should.equal('Streaming not supported');
				done();
			});

			stream.write(streamFile);
		});

		it('should add nothing without options', function(done){

			var fakeContent = '<div>sample HTML</div>',
				fakeFile    = getFakeFile(fakeContent),
				stream      = wrapper({});

			stream.on('data', function (file) {
				should.exist(file);
				should.exist(file.path);
				should.exist(file.relative);
				should.exist(file.contents);

				file.path.should.equal('./test/fixture/file.js');
				file.relative.should.equal('file.js');
				file.contents.toString().should.equal(fakeContent);

			});

			stream.once('end', function () {

				done();
			});

			stream.write(fakeFile);
			stream.end();
		});

		it('should add a "<script> header"', function(done){

			var fakeContent = '<div>sample HTML</div>',
			    header      = '<script>',
			    fakeFile    = getFakeFile(fakeContent),
			    stream      = wrapper({
					header: header
				});

			stream.on('data', function (file) {
				should.exist(file);
				should.exist(file.path);
				should.exist(file.relative);
				should.exist(file.contents);

				file.path.should.equal('./test/fixture/file.js');
				file.relative.should.equal('file.js');
				file.contents.toString().should.equal(header + fakeContent);

			});

			stream.once('end', function () {

				done();
			});

			stream.write(fakeFile);
			stream.end();
		});

		it('should add a "</script> footer"', function(done){

			var fakeContent = '<div>sample HTML</div>',
				footer      = '</script>',
				fakeFile    = getFakeFile(fakeContent),
				stream      = wrapper({
					footer: footer
				});

			stream.on('data', function (file) {
				should.exist(file);
				should.exist(file.path);
				should.exist(file.relative);
				should.exist(file.contents);

				file.path.should.equal('./test/fixture/file.js');
				file.relative.should.equal('file.js');
				file.contents.toString().should.equal(fakeContent + footer);

			});

			stream.once('end', function () {

				done();
			});

			stream.write(fakeFile);
			stream.end();
		});

		it('should add a "<script> header" and a "</script> footer"', function(done){

			var fakeContent = '<div>sample HTML</div>',
				header      = '<script>',
				footer      = '</script>',
				fakeFile    = getFakeFile(fakeContent),
				stream      = wrapper({
					header: header,
					footer: footer
				});

			stream.on('data', function (file) {
				should.exist(file);
				should.exist(file.path);
				should.exist(file.relative);
				should.exist(file.contents);

				file.path.should.equal('./test/fixture/file.js');
				file.relative.should.equal('file.js');
				file.contents.toString().should.equal(header + fakeContent + footer);

			});

			stream.once('end', function () {

				done();
			});

			stream.write(fakeFile);
			stream.end();
		});

		it('should add a "<script id="file.js"> header" and a "</script> footer"', function(done){

			var fakeContent = '<div>sample HTML</div>',
				header      = '<script id="${filename}">',
				footer      = '</script>',
				fakeFile    = getFakeFile(fakeContent),
				stream      = wrapper({
					header: header,
					footer: footer
				});

			stream.on('data', function (file) {
				should.exist(file);
				should.exist(file.path);
				should.exist(file.relative);
				should.exist(file.contents);

				file.path.should.equal('./test/fixture/file.js');
				file.relative.should.equal('file.js');
				file.contents.toString().should.equal('<script id="'+file.relative+'">' + fakeContent + footer);

			});

			stream.once('end', function () {

				done();
			});

			stream.write(fakeFile);
			stream.end();
		});


		it('should accept functions as header and footer options', function(done){

			var fakeContent = '<div>sample HTML</div>',
				header      = function(file) { return file.path; },
				footer      = function(file) { return file.path; },
				fakeFile    = getFakeFile(fakeContent),
				stream      = wrapper({
					header: header,
					footer: footer
				});

			stream.on('data', function (file) {
				should.exist(file);
				should.exist(file.path);
				should.exist(file.relative);
				should.exist(file.contents);

				file.path.should.equal('./test/fixture/file.js');
				file.relative.should.equal('file.js');
				file.contents.toString().should.equal(file.path + fakeContent + file.path);
			});

			stream.once('end', function () {
				done();
			});

			stream.write(fakeFile);
			stream.end();
		});

	});
});
