const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const {terser} = require('rollup-plugin-terser');
const gulp = require('gulp');
const using = require('gulp-using');
const sourcemaps = require('gulp-sourcemaps');
const rollup = require('gulp-better-rollup');
const manifest = require('../plugins/gulp-manifest');

// https://www.npmjs.com/package/gulp-better-rollup
module.exports = function (input, settings){

    let {
        dest = './',
        mapsPath = './maps',
        manifestSettings = {
            path: 'mix-manifest.json',
            publicPath: './public'
        },
        isUseSourcemaps = true,
        isUseManifest = true
    } = settings || {};

    if(isUseSourcemaps){
        input = input.pipe(sourcemaps.init())
    }

    input = input.pipe(rollup({
        // There is no `input` option as rollup integrates into the gulp pipeline
        plugins: [
            resolve({ browser: true }),
            commonjs(),
            terser()
        ]
    }, {
        // Rollups `sourcemap` option is unsupported. Use `gulp-sourcemaps` plugin instead
        format: 'cjs',
    })).pipe(using({color: 'green'}))

    if(isUseSourcemaps){
        input = input.pipe(sourcemaps.write(mapsPath))
    }
    input = input.pipe(gulp.dest(dest))

    if(isUseManifest){
        input = input.pipe(manifest(manifestSettings))
    }

    return input;
}
