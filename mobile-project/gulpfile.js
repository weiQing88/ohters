var gulp = require('gulp');
var gulpPlugin = require('gulp-load-plugins')();
var open = require('open');
var amdOptimize = require('amd-optimize');


 var path = {
 	  'dev' : 'dev/',
 	  'dist' : 'dist/'
 };


gulp.task('js',function(){
	 gulp.src(path.dev + 'scripts/**/*.js')
	 .pipe(gulpPlugin.plumber())
	// .pipe(gulpPlugin.concat('components.js'))
	 .pipe(gulp.dest(path.dist + 'js'))
	 .pipe(gulpPlugin.connect.reload());
});




gulp.task('less',function(){
	 gulp.src([path.dev + 'css/*.css',path.dev + 'css/*.less'])
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

gulp.task('html',function(){
	gulp.src(path.dev + '**/*.html')
	.pipe(gulpPlugin.plumber())
	.pipe(gulp.dest(path.dist))
	.pipe(gulpPlugin.connect.reload());
});




gulp.task('libs',function(){
	 gulp.src(path.dev + 'libs/**/*.js')
	 .pipe(gulp.dest(path.dist + 'libs'))
	 .pipe(gulpPlugin.connect.reload());
});



gulp.task('libraries',function(){
	 gulp.src(path.dev + 'libraries/**/*')
	 .pipe(gulp.dest(path.dist + 'libraries'))
	 .pipe(gulpPlugin.connect.reload());
});





gulp.task('clean',function(){
	 gulp.src(path.dist + '**/*')
	 .pipe(gulpPlugin.clean());
});




gulp.task('serve',['js','less','image','html','libs','libraries'],function(){
	  gulpPlugin.connect.server({
	  	   root : [path.dist+'/'],
	  	   livereload : true,
	  	   port : 5459
	  });
	  open('http://localhost:5459');

	  gulp.watch(path.dev + 'scripts/**/*.js',['js']); 
	  gulp.watch(path.dev + 'css/index.less',['less']); 
      gulp.watch(path.dev + '**/*.html',['html']); 


});


gulp.task('default',['serve']);