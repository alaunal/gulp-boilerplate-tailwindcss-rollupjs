
# gulp-boilerplate-tailwindcss-rollupjs

**gulp-boilerplate-tailwindcss-rollupjs** is a tool that we designed to make it easier for developers (especially Front-end Developers) to create and create user interfaces as outlined in the visual web form of the design that has been determined.


## Features

This **WEB UIKIT** provides a simple way of setting up a modern web development environment. Here is a list of the current features:

-  [**rollupJs**](https://www.npmjs.com/package/gulp-better-rollup) A Gulp plugin for Rollup ES6 Bundler.
-  [**GULP**](https://gulpjs.com/) Automate and enhance your workflow.
-  [**Nunjucks**](https://mozilla.github.io/nunjucks/) A rich and powerful templating language for JavaScript.
-  [**Babeljs**](https://babeljs.io/) transpiler that allows you writing JS Code in ES2015/ES6 style.
-  [**Tailwindcss**](https://tailwindcss.com/: A utility-first CSS framework.
-  [**Browsersync**](https://browsersync.io/) with Live reload server.


## Requirements

This should be installed on your computer in order to get up and running:

-  [**Node.js**](https://nodejs.org/en/) Required node version is >= `10.0`
-  **npm** Version `6.0.*`


## Usage

As a prerequisite it's assumed you have `npm` or `yarn` installed.



1.  **Clone Repo**

	Make sure you have a **gulp-boilerplate-tailwindcss-rollupjs** clone repository.
	```
	git@github.com:alaunal/gulp-boilerplate-tailwindcss-rollupjs.git
	```
	after you clone you will get structure directory like this :


	```
		[gulp-starter-kit]
			├── src/
			├── .gitignore
			├── .babelrc
			├── gulpfile.js
			├── gulpfile.config.js
			├── site.config.js
			├── .editorconfig
			├── .jshintrc
			├── .jsbeautifyrc
			├── package.json
			├── tailwind.config.js
			├── README.md
	```

2.  **Gulp Setup**

	you just execute this script `npm install --global gulp-cli`, and make sure your Gulp CLI is currently in the version `2.0.*`

3.  **Install dependencies**

	```
	$ npm install
	```

	```
	$ npm install --global rollup
	```

	> if you have done the syntax above before, there is no need to do a step 3 process. but if you are not sure then just do it for check updated.

4.  **Serve or deploy**

	When we start the `serve` process, the task runner below has `env` **development** and automatically `watch` the changes you make to the code.

	```
	$ yarn serve
	```

	or

	```
	$ npm run serve
	```


	> We have two environment build tasks in the development process or for deployment production.



	**Development Build**

	- development watch --> `yarn watch` or `npm run watch`
	- development compile --> `yarn dev` or `npm run dev`

	**Production Build**

	- Production compile --> `yarn build` or `npm run build`

