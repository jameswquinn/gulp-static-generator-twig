const twigMarkdown = require('twig-markdown')
const swig = require('gulp-twig')

module.exports = {
data: {
      site: {
        google__analytics: '<SITE KEY HERE> e.g. UA-XXXXX-J',
        siteName: '@Burberryltd',
        lang: 'en',
        title: 'Gulp and Twig',
        longform__description: 'longform__description',
        shortform__description: 'shortform__description',
        copyright: 'J Quinn ©2017',
        og__image: 'https://assets.burberry.com/is/image/Burberryltd/6cd9641a46601e40e8e3ffad2cc1cede38b723d7.jpg',
        og__alt: '',
        og__url: 'http://example.com',
        baseUrl: ''
        }
    },
extend: twigMarkdown
}
