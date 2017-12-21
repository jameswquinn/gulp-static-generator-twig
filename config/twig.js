const twigMarkdown = require('twig-markdown')
const swig = require('gulp-twig')

module.exports = {
data: {
    "site": {
        "google__analytics": "<SITEKEYHERE>e.g.UA-XXXXX-J",
        "site__name": "@Burberryltd",
        "lang": "en",
        "title": "GulpandTwig",
        "longform__description": "longform__description",
        "shortform__description": "shortform__description",
        "copyright": "JQuinn©2017",
        "og__image": "https: //assets.burberry.com/is/image/Burberryltd/6cd9641a46601e40e8e3ffad2cc1cede38b723d7.jpg",
        "og__alt": "",
        "og__url": "http: //example.com",
        "base__url": ""
    },
    "nav": [
        {
            "link": "home",
            "href": "/"
        },
        {
            "link": "about",
            "href": "/about"
        },
        {
            "link": "contact",
            "href": "/contact"
        }
    ]
},
extend: twigMarkdown
}
