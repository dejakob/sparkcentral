'use strict';

const paths = require('./paths.config.es5.js');

module.exports = KarmaConfigCreator;

/**
 * Set the configuration for karma/jasmine unit tests
 */
function KarmaConfigCreator (karmaConfig) {
    var port = 8666;
    var autoWatch = false;
    var basePath = './../';
    var files = paths.mocks;
    
    paths.src.forEach(function (srcFile) { files.push(srcFile) });
    paths.tests.forEach(function (testFile) { files.push(testFile) });

    var frameworks = [ 'jasmine' ];
    var browsers = [ 'PhantomJS' ];

    var preprocessors = {
        './src/**/*.js': [ 'babel', 'coverage' ],
        './spec/**/*.js': [ 'babel' ]
    };
    var babelPreprocessor = {
        options: {
            presets: [ 'es2015' ],
            sourceMap: 'inline'
        },
        filename: function filename(file) {
            return file.originalPath.replace(/\.js$/, '.es5.js');
        },
        sourceFileName: function sourceFileName(file) {
            return file.originalPath;
        }
    };

    var plugins = [
        'karma-babel-preprocessor',
        'karma-html2js-preprocessor',
        'karma-phantomjs-launcher',
        'karma-jasmine',
        'karma-coverage'
    ];

    var reporters = ['dots', 'coverage'];
    var coverageReporter = {
        reporters: [{
            type: 'cobertura',
            dir: '../test/coverage/xml/',
            file: 'coverage.xml'
        }, {
            type: 'html',
            dir: '../test/coverage/html/'
        }]
    };

    var singleRun = true;

    karmaConfig.set({
        autoWatch: autoWatch, basePath: basePath, frameworks: frameworks, files: files,
        preprocessors: preprocessors, babelPreprocessor: babelPreprocessor, port: port, plugins: plugins,
        reporters: reporters, coverageReporter: coverageReporter, singleRun: singleRun, browsers: browsers
    });
}