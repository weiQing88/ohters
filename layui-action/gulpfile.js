var gulp = require('gulp');
var gulpPlugin = require('gulp-load-plugins')();
var open = require('open');
var amdOptimize = require('amd-optimize');
var fileinclude = require('gulp-file-include');
var babel = require('gulp-babel');


 var path = {
 	  'dev' : 'src/',
 	  'dist' : 'dist/'
 };


gulp.task('modules',function(){
	 gulp.src(path.dev + 'modules/**/*.js')
	 .pipe(gulpPlugin.plumber())
	 //.pipe(gulpPlugin.concat('components.js'))
	 .pipe(gulpPlugin.uglify())
	 .pipe(gulp.dest(path.dist + 'modules'))
	 .pipe(gulpPlugin.connect.reload());
});



gulp.task('es6',function(){
     gulp.src(path.dev + 'js/**/*.js')
     .pipe(gulpPlugin.plumber())
     .pipe(babel())
     .pipe(gulp.dest(path.dev + 'js/**/*.js'))
	 .pipe(gulpPlugin.connect.reload());

});

gulp.task('js',['es6'],function(){
	 gulp.src(path.dev + 'js/**/*.js')
	 .pipe(gulpPlugin.plumber())
	 //.pipe(gulpPlugin.concat('components.js'))
	 // .pipe(gulpPlugin.uglify())
	 .pipe(gulp.dest(path.dist + 'js'))
	 .pipe(gulpPlugin.connect.reload());
});




gulp.task('less',function(){
	 gulp.src([path.dev + 'css/*.css',path.dev + 'less/*.less']) 
	 .pipe(gulpPlugin.plumber())
	 .pipe(gulpPlugin.less())
	 .pipe(gulp.dest(path.dist + 'css'))
	 .pipe(gulpPlugin.connect.reload());
});




gulp.task('image',function(){
	 gulp.src(path.dev + 'images/*')
	 .pipe(gulpPlugin.plumber())
	 .pipe(gulpPlugin.imagemin())
	 .pipe(gulp.dest(path.dist + 'images'))
	 .pipe(gulpPlugin.connect.reload());
});




gulp.task('file',function(){
     gulp.src(['index.html','test.html'])
	     .pipe(fileinclude({
	     	   prefix: '@@',
	     	   basepath : '@file'
	     }))
	    .pipe(gulp.dest(path.dev + 'views')) 
});



gulp.task('html',['file'],function(){
	gulp.src(path.dev + 'views/*.html')
	.pipe(gulpPlugin.plumber())
	.pipe(gulp.dest(path.dist))
	.pipe(gulpPlugin.connect.reload());
});




gulp.task('libraries',function(){
	 gulp.src(path.dev + 'libraries/**/*')
	 .pipe(gulp.dest(path.dist + 'libraries'))
	 .pipe(gulpPlugin.connect.reload());
});




gulp.task('clean',function(){
	 gulp.src(path.dist)
	     .pipe(gulpPlugin.clean());
});




gulp.task('serve',['js','modules','less','image','html','libraries'],function(){
	  gulpPlugin.connect.server({
	  	   root : [path.dist+'/'],
	  	   livereload : true,
	  	   port : 1990
	  });
	//  open('http://localhost:1990');

	   gulp.watch(path.dev + 'modules/**/*.js',['modules']); 
	   gulp.watch(path.dev + 'js/**/*.js',['js']); 
	   gulp.watch(path.dev + 'less/index.less',['less']); 
       // gulp.watch(path.dev + '**/*.html',['html']); 
       gulp.watch('./**/*.html',['html']); 


});


gulp.task('default',['serve']);