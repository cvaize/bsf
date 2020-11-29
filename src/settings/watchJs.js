const path = require('path');
const watchInclude = require('../plugins/gulp-watch-include');
const detective = require('detective-es6');

module.exports = function (watchPaths, combine, settings){

    return watchInclude({
        output: (pipe)=>{
            combine(pipe, settings)
        },
        getIncludePaths: ({filepath, file}, cb)=>{
            // filepath - путь к файлу у, которого нужно узнать зависимости
            if(filepath.includes('.js')){
                let dirname = path.dirname(file.path)
                let dependencies = detective(file.contents.toString())
                    .filter(value => /^\./g.test(value))
                    .map(value => path.join(dirname, (/\.js$/g.test(value)?value:value+'.js')))
                cb(dependencies)
            }else{
                cb([])
            }
        },
        watchPaths
    });
}
