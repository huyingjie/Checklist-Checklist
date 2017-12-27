# gulp-markdown [![Build Status](https://travis-ci.org/sindresorhus/gulp-markdown.svg?branch=master)](https://travis-ci.org/sindresorhus/gulp-markdown)

> Markdown to HTML with [marked](https://github.com/chjj/marked)

*Issues with the output should be reported on the marked [issue tracker](https://github.com/chjj/marked/issues).*


## Install

```
$ npm install --save-dev gulp-markdown
```


## Usage

```js
var gulp = require('gulp');
var markdown = require('gulp-markdown');

gulp.task('default', function () {
	return gulp.src('intro.md')
		.pipe(markdown())
		.pipe(gulp.dest('dist'));
});
```


## API

### markdown(options)

See the marked [options](https://github.com/chjj/marked#options-1).

### markdown.marked

Access the `marked` object to customize the [lexer](https://github.com/chjj/marked#access-to-lexer-and-parser), [parser](https://github.com/chjj/marked#access-to-lexer-and-parser) or [renderer](https://github.com/chjj/marked#renderer).


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
