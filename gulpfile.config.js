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

// -- Settings | Turn on/off build features

const SETTINGS = {
    clean: true,
    scripts: true,
    styles: true,
    copy: true,
    public: true,
    libs: true,
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
const LIBS = SRC + 'libs/';
const HTML = SRC + 'public/';

const PATHS = {
    output: STATIC,
    input: ASSETS,
    libs: LIBS,
    build: BUILD,
    html: HTML,
    src: SRC,
    tailwind: {
        dir: ASSETS + 'styles/',
        input: ASSETS + 'styles/*.css',
        output: STATIC + 'css/'
    },
    scripts: {
        dir: ASSETS + 'js/',
        input: ASSETS + 'js/',
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
    },
    watch: {
        static: [ASSETS + 'tailwind/', ASSETS + 'js/', LIBS],
        all: SRC
    },
    portServe: arg.port ? Number(arg.port) : 8080,
    portLiveServer: arg.port ? Number(arg.port) : 3000
};


// -- bundle config | all for export

module.exports = {
    paths: PATHS,
    uglify: UGLIFY,
    settings: SETTINGS
};