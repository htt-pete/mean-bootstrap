'use strict';

// import packages
var gulp = require('gulp');
var notify = require('gulp-notify');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var path = require('path');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');

var paths = {
    server: {
        js: 'server/**/*.js',
        start: 'server/app.js'
    },
    client: {
        js: './public/dev/js/**/*.js',
        sass: './public/dev/sass/**/*.scss',
        css: './public/build',
        compress: [
            './public/dev/lib/angular/angular.js',
            './public/dev/lib/angular-route/anugular-route.js',
            './public/dev/lib/angular-bootstrap/ui-bootstrap-tpls.js',
            './public/dev/js/**/*.js',
            '!public/dev/js/views/**/*.js'
        ]
    },
}

gulp.task('server-lint', function() {
    return lint(paths.server.js);
});

gulp.task('clientLint', function() {
    return lint(paths.client.js);
});

/**
 * compile SASS
 */
gulp.task('sass', function () {
    gulp.src(paths.client.sass)
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./public/build'));
});

/**
 * concat and minify all javascript files
 */
gulp.task('js-build', function() {
    gulp.src(paths.client.compress)
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/build'));
});


/**
 * lint javascript source files
 */
function lint(lintSrc) {
    return gulp.src(lintSrc)
                .pipe(jshint('./.jshintrc'))
                .pipe(notify({
                    onLast: true,
                    message: function (file) {
                        if (file.jshint.success) {
                          // Don't show something if success
                          return false;
                        }

                        // create a string that contains error details
                        var errors = file.jshint.results.map(function (data) {
                          if (data.error) {
                            return "line " + data.error.line + ' : ' +  data.error.reason;
                          }
                        }).join("\n"); // join error messages with a new line

                        return errors;
                    },
                    title: function (file) {
                        return 'File : ' + file.relative;
                    },
                    sound: "Submarine",
                    icon: path.join(__dirname, "gulp.png")
                }));
}

/**
 * Gulp task for running dev tools for server
 */
gulp.task('server-dev', function() {
    nodemon({
        script: paths.server.start,
        ext: 'html js',
        ignore: ['ignored.js']
    })
    .on('change', ['server-lint'])
    .on('restart', function () {
      console.log('restarted!')
    })
});

/**
 * Gulp task for running dev tools for client
 * lint JS, compile JS, compile SASS etc
 */
gulp.task('client-dev', function() {
  gulp.watch([paths.client.js], ['clientLint']);
  gulp.watch([paths.client.sass], ['sass']);
});