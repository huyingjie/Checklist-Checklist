var gulp = require('gulp');
var markdown = require('gulp-markdown');
var rename = require("gulp-rename");
var wrapper = require('gulp-wrapper');
var ga = require('gulp-ga');

gulp.task('default', function () {
	return gulp.src('README.md')
	.pipe(markdown())
	.pipe(rename("index.html"))
	.pipe(wrapper({
		header: '<html>\n<head>\n<meta charset="utf-8">\n<meta name="description" content="A curated list of awesome Checklist by Yingjie Hu">\n<meta name="author" content="Yingjie Hu">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>Awesome Checklist Checklist</title>\n<script defer src="https://use.fontawesome.com/releases/v5.0.1/js/all.js"></script>\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css">\n<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>\n<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.6/umd/popper.min.js"></script>\n<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"></script>\n<link rel="stylesheet" href="src/style/main.css">\n</head>\n<body>\n<a href="https://github.com/huyingjie/Checklist-Checklist"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"></a>\n',
		footer: '</body>\n</html>'
	}))
	.pipe(ga({url: 'checklist.yingjiehu.com', uid: 'UA-46021277-1'}))
	.pipe(gulp.dest(''));
});
