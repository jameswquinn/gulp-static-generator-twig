// Folder Structure Defaults
const build  = '_site'
const pages  = '_pages'
const assets = 'assets'
const css    = 'css'
const js     = 'js'
const img    = 'img'
const misc   = 'misc'
const clean  = '{!.git,*}'
const map    =  'map'

// Where to look for source files
exports.src = {
  index:   `${pages}/index.html`,
  pages:   `${pages}/!(index).html`,
  layouts: `${pages}/**/_*.html`,
  scss:    `${assets}/${css}/*.sass`,
  js:      `${assets}/${js}/**/*`,
  img:     `${assets}/${img}/**/*`,
  misc:    `${misc}/**/*`,
  map:     `${build}/**/*.html`
}

// Where to build your site
exports.dest = {
  dir:   `${build}`,
  css:   `${build}/${css}`,
  js:    `${build}/${js}`,
  img:   `${build}/${img}`,
  clean: `${build}/${clean}`,
  misc:  `${build}/`
}
