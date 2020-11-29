const gulp = require('gulp');
const path = require('path');
const mergeStream = require('merge-stream');
const js = require('./settings/js');
const sass = require('./settings/sass');
const watchJs = require('./settings/watchJs');
const watchSass = require('./settings/watchSass');

function eachSettings(settings, mod){
    let tasks = []

    for (let i = 0; i < settings.length; i++) {
        settings[i].src = path.resolve(settings[i].src);
        settings[i].dest = path.resolve(settings[i].dest);
        let setting = mod(settings[i]);
        setting && tasks.push(setting);
    }

    return tasks;
}

function getJs(settings){
    return eachSettings(settings, setting =>
        setting.type === 'js' ? js(gulp.src(setting.src), setting) : null
    );
}
function getSass(settings){
    return eachSettings(settings, setting =>
        setting.type === 'sass' ? sass(gulp.src(setting.src), setting) : null
    );
}
function getWatchJs(settings){
    return eachSettings(settings, setting =>
        setting.type === 'js' ? watchJs(setting.src, js, setting) : null
    );
}
function getWatchSass(settings){
    return eachSettings(settings, setting =>
        setting.type === 'sass' ? watchSass(setting.src, sass, setting) : null
    );
}

module.exports = function (settings = []){

    gulp.task('js', function () {
        return mergeStream(getJs(settings));
    });

    gulp.task('sass', function () {
        return mergeStream(getSass(settings));
    });

    gulp.task('sass-js', function () {
        return mergeStream(getJs(settings).concat(getSass(settings)))
    });

    gulp.task('js:watch', function () {
        return getWatchJs(settings);
    });

    gulp.task('sass:watch', function () {
        return getWatchSass(settings);
    });

    gulp.task('sass-js:watch', function () {
        return getWatchJs(settings).concat(getWatchSass(settings))
    });
}
