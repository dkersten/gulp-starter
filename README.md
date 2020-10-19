# gulp-starter

## About
A Gulp starter template to get your project environment set up quickly. Best used with HTML, CSS/SCSS, and vanilla JS projects.

## Features
- App and distribution project structure. Work in the app folder, the distribution folder will be ready for you when you're ready to launch your project
- Compile SCSS to CSS using the 7-1 (or 5-1 or if you prefer) SCSS file structure
- CSS Prefixer
- CSS Minify
- Javascript Minify
- Image Compression

- Live reload based on the VS Code Live Server [plugin](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). If that doesn't fit your needs look into [gulp-livereload](https://www.npmjs.com/package/gulp-livereload) or [Browsersync](https://browsersync.io/docs/gulp). In future versions I may set up one of these instead of live server if my needs change.

## Setup Instructions

1. Clone/download repository. Rename this if you wish
2. Make sure [Node](https://nodejs.org/en/download/) and [Gulp](https://gulpjs.com/docs/en/getting-started/quick-start) are downloaded
3. In the terminal, in your project directory, install npm ( `npm install` )
4. In the terminal, in your project directory, run gulp ( `gulp` )
5. Your project is now ready. Launch live server or however you see your work

## Usage Instructions/Tips

### File Structure
- The `dist` folder is the distribution folder, the final code you will need when you are ready to deploy your project
- The `app` folder is where you will write and edit your code. Changes here will be automatically reflected in the `dist` folder

#### App folder Structure

##### Images
`assets/img` Images can be uploaded here. They will automatically be compressed and placed in `dist/assets/img` for production

##### SCSS
- The `scss` folder will contain all your styling. Because CSS is compliant SCSS, if you are not comfortable writing SCSS you can write normal CSS
- The `scss` folder contains 7 subfolders, `abstracts`, `base`, `components`, `pages`, `layout`, `themes`, `vendors`. You can read more about this file structure [here](https://sass-guidelin.es/#the-7-1-pattern)
- All files in these 7 folders are already being imported into `app/scss/styles.scss`, which will be compiled into CSS in your `dist` folder
- If you need to add more scss files follow the import structure already in `styles.scss`
- Feel free to delete unneeded files/folders/imports in the starter template

##### Javascript
The `js` folder will hold all of your Javascript code
- `app.js` will be minified and compiled into `dist/all.js` automatically
- If you want to modularize your code, add extra files into the `modules` folder. It will automatically be compiled/minified to `dist/all.js`
- There is an example file `eventListener.js` in the `modules` file. Feel free to delete it

#### Dist folder Structure
This is where your production code will live

##### HTML
- `index.html` is your main file. It is already linked to the css and js file
- `dist/assets/img` is where your images are automatically added/compressed. This is where you will need to link to in your HTML files

Happy Coding!
