/*
 *
 * A simple Gulp 4 Starter Kit
 *
 * @author A.kauniyyah <alaunalkauniyyah3@gmail.com>
 * @copyright 2019 A.kauniyyah | Front-end Web developer
 *
 * ________________________________________________________________________________
 *
 * gulpfile.js
 *
 * The gulp task runner file.
 *
 */

// -- General
const gulp = require('gulp');
const fs = require('fs');
const del = require("del");
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const noop = require('gulp-noop');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const config = require('./gulpfile.config');
const runSequence = require('gulp4-run-sequence');
const directoryExists = require("directory-exists");

// -- HTML templates nunjuncks
const nunjucksRender = require('gulp-nunjucks-render');
const beautify = require('gulp-jsbeautifier');
const data = require('gulp-data');

// -- Js Blundle with Rollup
const rollup = require('rollup');
const rollupBabel = require('rollup-plugin-babel');
const cleanup = require('rollup-plugin-cleanup');
const {
    nodeResolve
} = require('@rollup/plugin-node-resolve');
const rollupCommonjs = require('@rollup/plugin-commonjs');
const {
    terser
} = require('rollup-plugin-terser');

// -- Css bundle with Tailwindcss
const postcss = require('gulp-postcss');
const csso = require('gulp-csso');
const cleanCss = require('gulp-clean-css');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const postcssVariables = require('postcss-variables');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sass = require('gulp-sass');
const tailwindConfig = require('./tailwind.config');



// -- fetch command line arguments

const arg = (argList => {
    let arg = {},
        a, opt, thisOpt, curOpt;
    for (a = 0; a < argList.length; a++) {
        thisOpt = argList[a].trim();
        opt = thisOpt.replace(/^\-+/, '');
        if (opt === thisOpt) {
            if (curOpt) arg[curOpt] = opt;
            curOpt = null;
        } else {
            curOpt = opt;
            arg[curOpt] = true;
        }
    }
    return arg;
})(process.argv);


// -- Environment configuration.

const isProd = arg.production === true;


// -- ErrorHandler

const onError = err => {
    notify.onError({
        title: "Gulp",
        subtitle: "Failure!",
        message: "Error: <%= error.message %>",
        sound: "Beep"
    })(err);
};


// -- filter Input file js

const inputFile = () => {
    const dir = config.paths.scripts.input;
    const rawFiles = fs.readdirSync(dir);
    let inputFile = [];


    rawFiles.forEach(function(file) {
        file = dir + '' + file;
        let stat = fs.statSync(file);

        if (stat && !stat.isDirectory()) {
            inputFile.push(file);
        }
    });

    return inputFile;
};


// -- Run Server, live-server and reload setup

gulp.task('live-server', () => {

    const scfg = require('./self.config');

    return browserSync.init({
        port: config.paths.portLiveServer,
        host: '127.0.0.1',
        open: 'external',
        proxy: scfg.liveServer.host
    });
});

gulp.task('runServer', () => {
    return browserSync.init({
        server: {
            baseDir: ['build']
        },
        port: config.paths.portServe,
        open: true
    });
});

gulp.task('reload', done => {
    browserSync.reload();
    done();
});

// -- clean of build dir

gulp.task('clean', () => del(['./build']));


// -- styles use tailwindcss

gulp.task('compile-styles', done => {

    if (!config.settings.styles) return done();

    return gulp.src(config.paths.tailwind.input)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(isProd ? noop() : sourcemaps.init())
        .pipe(postcss([
            postcssImport,
            tailwindcss(tailwindConfig),
            postcssNested,
            postcssVariables,
            autoprefixer,
            cssnano({
                preset: 'default',
                discardComments: {
                    removeAll: true
                }
            })
        ]))
        .pipe(csso())
        .pipe(cleanCss({
            level: {
                1: {
                    specialComments: 0
                }
            }
        }))
        .pipe(isProd ? noop() : sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.paths.tailwind.output));

});


// -- Script js use rollup

gulp.task('compile-scripts', done => {

    if (!config.settings.scripts) return done();

    const rollupSet = rollup.rollup({
        input: inputFile(),
        preserveEntrySignatures: false,
        plugins: [
            nodeResolve({
                module: true,
                jsnext: true,
                browser: true,
                preferBuiltins: false
            }),
            rollupCommonjs({
                include: 'node_modules/**'
            }),
            rollupBabel({
                exclude: 'node_modules/**',
            }),
            cleanup({
                comments: 'none'
            })
        ]
    });

    const rollupSetES5 = rollup.rollup({
        input: inputFile(),
        preserveEntrySignatures: false,
        plugins: [
            nodeResolve({
                browser: true,
                preferBuiltins: false
            }),
            rollupCommonjs({
                include: 'node_modules/**'
            }),
            rollupBabel({
                exclude: 'node_modules/**',
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            modules: false,
                            useBuiltIns: 'usage',
                            corejs: {
                                version: "3.8",
                                proposals: true
                            },
                            targets: {
                                browsers: '> 0.25%, not dead',
                                node: 8
                            }
                        }
                    ]
                ]
            }),
            cleanup({
                comments: 'none'
            })
        ]
    });

    const outputSet = {
        sourcemap: isProd ? false : true,
        plugins: isProd ? [terser(config.uglify.prod)] : [terser(config.uglify.dev)],
        chunkFileNames: 'm-[name].js'

    };

    return (
        rollupSet.then(bundle => {
            return bundle.write(Object.assign({
                dir: config.paths.scripts.output,
                format: 'es',
            }, outputSet));
        }),
        rollupSetES5.then(bundle => {
            return bundle.write(Object.assign({
                dir: config.paths.scripts.outputNomodule,
                format: 'system'
            }, outputSet));
        })
    );

});


// -- Nunjucks html template compile

gulp.task('compile-html', done => {

    if (!config.settings.public) return done();

    const siteConf = require(config.paths.public.data);

    return gulp.src(config.paths.public.input)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(data(function() {
            return siteConf.data;
        }))
        .pipe(nunjucksRender({
            path: [config.paths.html]
        }))
        .pipe(beautify({
            html: {
                indent_size: 2,
                indent_char: ' ',
                max_preserve_newlines: 1
            }
        }))
        .pipe(gulp.dest(config.paths.build));

});

// -- Copy of static when of changed

gulp.task('compile-libs', done => {
    if (!config.settings.libs) return done();

    return gulp.src(config.paths.libs + '**/*')
        .pipe(gulp.dest(config.paths.output));
});

// -- Compile task runner

gulp.task('gulp:compile', function(callback) {
    runSequence(
        'compile-styles',
        'compile-scripts',
        'compile-html',
        'compile-libs',
        callback
    );
});

// -- watch task runner

gulp.task('gulp:watch', () => {
    gulp.watch(config.paths.src, callback => {
        runSequence(
            'gulp:compile',
            'reload',
            callback
        );
    });
});

// -- task serve

gulp.task('gulp:serve', (callback) => {
    runSequence(
        'gulp:compile',
        [
            'runServer', 'gulp:watch'
        ],
        callback
    );
});

// -- task default

gulp.task('default', gulp.series('clean', 'gulp:compile'));