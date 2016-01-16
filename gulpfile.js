var gulp    = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('dev', function (cb) {
    var started = false;
    return nodemon({
        script: './dev/server/server.js'
    }).on('start', function () {
        if (!started) {
            cb();
            started = true; 
        } 
    });
});
