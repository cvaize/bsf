const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const magicImporter = require('node-sass-magic-importer');
const watchInclude = require('../plugins/gulp-watch-include');

module.exports = function (watchPaths, combine, settings){
    return watchInclude({
        output: (pipe)=>{
            combine(pipe, settings)
        },
        getIncludePaths: ({filepath}, cb)=>{
            // filepath - путь к файлу у, которого нужно узнать зависимости
            if(filepath.includes('.scss')){
                sass.compiler.render({
                    file: filepath,
                    importer: magicImporter(),
                    includePaths: ['node_modules'],
                }, function(err, result) {
                    cb(!result ? [] : result.stats.includedFiles.filter(includedFile => !includedFile.includes('node_modules') && !includedFile.includes(filepath)))
                })
            }else{
                cb([])
            }
        },
        watchPaths
    });
}
