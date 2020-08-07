/**
 *
 * @author A.kauniyyah <a.kauniyyah@go-jek.com>
 * @copyright 2019 A.kauniyyah | Sr. Front-end Web developer
 *
 * ________________________________________________________________________________
 *
 * gulpfile.config.js
 *
 * The gulp configuration file.
 *
 */

// -- Settings | Turn on/off build features

const SETTINGS = {
    clean: true,
    scripts: true,
    styles: true,
    copy: true,
    public: true,
    pwa: true,
    reload: true
};

// -- Uglify setup | setup of dev or prod env build

const UGLIFY = {
    prod: {
        compress: {
            drop_console: true,
            drop_debugger: true
        }
    },
    dev: {
        compress: {
            drop_console: false,
            drop_debugger: false
        }
    }
};


// -- path config | setup of path src or dist file

const SRC = './src/';
const BUILD = './build/';
const STATIC = BUILD + 'static/';
const ASSETS = SRC + 'assets/';
const LIBS = SRC + 'static/';
const HTML = SRC + 'public/';

const PATHS = {
    output: STATIC,
    input: ASSETS,
    libs: LIBS,
    build: BUILD,
    html: HTML,
    src: SRC,
    styles: {
        dir: SRC + 'styles/',
        input: SRC + 'styles/*.scss',
        output: STATIC + 'css/'
    },
    scripts: {
        dir: SRC + 'js/',
        input: SRC + 'js/',
        output: STATIC + 'js/',
        outputNomodule: STATIC + 'js/nomodule'
    },
    public: {
        input: [
            HTML + 'pages/**/*.html',
            '!' + HTML + 'templates/**'
        ],
        output: BUILD,
        data: './site.config',
    }
};


// -- bundle config | all for export

module.exports = {
    paths: PATHS,
    uglify: UGLIFY,
    settings: SETTINGS
};