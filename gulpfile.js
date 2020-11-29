const bsf = require('./src/index');

bsf([
    {
        type: 'sass',
        src: './tests/resources/sass/components/*.scss',
        dest: './tests/public/css/components/',
        manifestSettings: {
            path: 'mix-manifest.json',
            publicPath: './tests/public'
        },
        isUseSourcemaps : true,
        isUseManifest : true,
        isUseAutoprefixer : true,
        isUseMinifyCss : true
    },
    {
        type: 'js',
        src: './tests/resources/js/components/*.js',
        dest: './tests/public/js/components/',
        manifestSettings: {
            path: 'mix-manifest.json',
            publicPath: './tests/public'
        },
    },
    {
        type: 'js',
        src: './tests/resources/js/app.js',
        dest: './tests/public/js/',
        manifestSettings: {
            path: 'mix-manifest.json',
            publicPath: './tests/public'
        },
    }
]);
