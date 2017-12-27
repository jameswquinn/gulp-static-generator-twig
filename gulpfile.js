const gulp = require('gulp')
const concat = require('gulp-concat')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const sourcemap = require('gulp-sourcemaps')
const twigMarkdown = require('twig-markdown')
const twig = require('gulp-twig')
const uglify = require('gulp-uglify')
const bs = require('browser-sync')
const runOrder = require('run-sequence')
const trash = require('trash')
const prettify = require('gulp-prettify')
const htmlmin = require('gulp-htmlmin')
const sitemap = require('gulp-sitemap')
const robots = require('gulp-robots')
const humans = require('gulp-humans')
const deploy = require('gulp-deploy-git')
const permalinks = require('gulp-permalinks')
const moment = require('moment')
const babel = require('gulp-babel')
const $ = require('gulp-load-plugins')()

//postcss plugins
const postcss = require('gulp-postcss')
const precss = require('precss')
const postsize = require('postcss-size')
const rucksack = require('rucksack-css')
const postuncss = require('postcss-uncss')
const cssnano = require('cssnano')
const lost = require('lost')
const autoprefixer = require('autoprefixer')
const bem = require('postcss-bem')
const nested = require('postcss-nested')

// Customize your site in 'config' directory
const structure = require('./config/structure')
const twigOptions = require('./config/twig')
const responsiveOpions = require('./config/responsive')
const reporter = require('./config/reporter')
const server = require('./config/server')

// Build index page by itself
gulp.task('index', () => {
    gulp.src(structure.src.index)
        .pipe(plumber(reporter.onError))
        .pipe(twig(twigOptions))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(prettify())
        .pipe(gulp.dest(structure.dest.dir))
        .pipe(bs.stream())
})

gulp.task('pages', () => {
    gulp.src(structure.src.pages)
        .pipe(plumber(reporter.onError))
        .pipe(twig(twigOptions))
        //.pipe(htmlmin({collapseWhitespace: true}))
        .pipe(prettify())
        .pipe(rename(file => {
            file.dirname = require('path').join(file.dirname, file.basename)
            file.basename = 'index'
            file.extname = '.html'
        }))
        .pipe(gulp.dest(structure.dest.dir))
        .pipe(bs.stream())
})

gulp.task('scss',() => {
   gulp.src(structure.src.scss)
    .pipe(plumber(reporter.onError))
    .pipe(sourcemap.init())
    .pipe(sass()).on('error', sass.logError)
    .pipe(rename({basename: "app",suffix: '.min'}))
    .pipe(postcss([
      autoprefixer({browsers: ['last 4 versions']}),
      rucksack(),
      lost(),
      precss(),
      postsize(),
      bem(),
      nested(),
      postuncss({  html: ['./_gh_pages/**/*.html']}),
      cssnano(),
    ],
  ))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest(structure.dest.css))
    .pipe(bs.stream())
})

gulp.task('js', () => {
    gulp.src(structure.src.js)
        .pipe(plumber(reporter.onError))
        .pipe(sourcemap.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest(structure.dest.js))
        .pipe(bs.stream())
})

gulp.task('img', function () {
  return gulp.src(structure.src.img)
  .pipe(plumber(reporter.onError))
    .pipe($.responsive(responsiveOpions))
    .pipe(gulp.dest(structure.dest.img))
    .pipe(bs.stream())
})

gulp.task('misc', () => {
    gulp.src(structure.src.misc)
        .pipe(plumber(reporter.onError))
        .pipe(gulp.dest(structure.dest.misc))
        .pipe(robots({
            useragent: '*',
            allow: ['folder1/', 'folder2/'],
            disallow: ['cgi-bin/']
        }))
        .pipe(gulp.dest(structure.dest.misc))
        .pipe(humans({
            thanks: [
                'Node (@nodejs on Twitter)',
                'Gulp (@gulpjs on Twitter)'
            ],
            site: [
                'Standards: HTML5, CSS3',
                'Components: jQuery, Normalize.css',
                'Software: Atom'
            ],
            note: 'Built with love by ...'
        }))
        .pipe(gulp.dest(structure.dest.misc))
        .pipe(bs.stream())
})

// Remove contents from build directory
gulp.task('clean', () => {
    trash([structure.dest.clean]).then(() => {
        console.log(`'${structure.dest.dir}' contents moved to trash.`);
    })
})

gulp.task('sitemap', () => {
    gulp.src(structure.src.root)
        .pipe(sitemap({
            siteUrl: 'https://www.your_url_here.co'
        }))
        .pipe(gulp.dest(structure.dest.dir));
})

gulp.task('deploy', () => {
    gulp.src(structure.src.deploy)
        .pipe(deploy({
            repository: 'https://username@github.com/username/my-repo.git',
            branches: ['gh-pages']
        }))
        .pipe(deploy({
            repository: 'https://username@github.com/username/my-repo.git',
            branches: ['master']
        }))
})

gulp.task('permalinks', () => {
    var options = {
        helpers: {
            foo: function() {
                return this.context.stem.toUpperCase();
            },
            date: function() {
                return moment().format('YYYY/MM/DD');
            }
        }
    }

    gulp.src(structure.src.posts)
        .pipe(permalinks('blog/:date/:foo.md', options))
        .pipe(gulp.dest(structure.dest.dir));
});

// writes to '_gh_pages/blog/2017/02/15/MY-FILE-STEM.html'

// Launch the dev server and watch for changes
gulp.task('serve', () => {
    gulp.watch(structure.src.scss, ['scss'])
    gulp.watch(structure.src.js, ['js'])
    gulp.watch(structure.src.img, ['img'])
    gulp.watch(structure.src.index, ['index'])
    gulp.watch(structure.src.pages, ['pages'])
    gulp.watch(structure.src.layouts, ['pages', 'index'])
    bs(server)
})

// default 'gulp' task
gulp.task('default', () => {
    runOrder('pages', 'index', 'js', 'img', 'serve', 'misc', 'sitemap', 'scss')
})
