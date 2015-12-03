// Aqui nós carregamos o gulp e os plugins através da função `require` do nodejs
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');


//Criamos outra tarefa com o nome 'dist'
gulp.task('renomear', function() {
	gulp.src('css/*.css')
	.pipe(minifyCss())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('css-min'));
});


//Minifica css
gulp.task('minify-css', function() {
  return gulp.src('css/css-min.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('css-min'));
});

//Monitorar CSSs e JSs
gulp.task('monitorar', function(){
	gulp.watch('css/*.css', ['renomear']);
})

//Criamos uma tarefa 'default' que vai rodar quando rodamos `gulp` no projeto
gulp.task('default', ['monitorar', 'renomear'], function() {});