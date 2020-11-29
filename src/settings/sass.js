const gulp = require('gulp');
const sass = require('gulp-sass');
const magicImporter = require('node-sass-magic-importer');
const using = require('gulp-using');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const minifyCss = require('gulp-clean-css');
const manifest = require('../plugins/gulp-manifest');
sass.compiler = require('node-sass');


// https://github.com/kenangundogan/gulpSassCompiler
module.exports = function (input, settings){

    let {
        dest = './',
        mapsPath = './maps',
        manifestSettings = {
            path: 'mix-manifest.json',
            publicPath: './public'
        },
        autoprefixerSettings = {
            cascade: false
        },
        isUseSourcemaps = true,
        isUseManifest = true,
        isUseAutoprefixer = true,
        isUseMinifyCss = true
    } = settings || {};

    if(isUseSourcemaps){
        input = input.pipe(sourcemaps.init())
    }

    input = input.pipe(sass({
        importer: magicImporter(),
        includePaths: ['node_modules'],
    }).on('error', sass.logError))
        .pipe(using({color: 'green'}))

    if(isUseMinifyCss){
        input = input.pipe(minifyCss())
    }

    if(isUseAutoprefixer){
        input = input.pipe(autoprefixer(autoprefixerSettings))
    }

    if(isUseSourcemaps){
        input = input.pipe(sourcemaps.write(mapsPath))
    }

    input = input.pipe(gulp.dest(dest))

    if(isUseManifest){
        input = input.pipe(manifest(manifestSettings))
    }

    return input;
}
