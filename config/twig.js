const twigMarkdown = require('twig-markdown')
const twig = require('gulp-twig')

module.exports = {
data: {
    "site": {
        "google__analytics": "<SITEKEYHERE>e.g.UA-XXXXX-J",
        "site__name": "<SITE NAME HERE>",
        "set__lang": "en",
        "title": "TITLE HERE",
        "longform__description": "<LONG FORM DESCRIPTION HERE>",
        "shortform__description": "<SHORT FORM DESCRIPTION HERE>",
        "copyright": "<COPYRIGHT HERE>",
        "og__image": "https: //assets.burberry.com/is/image/Burberryltd/6cd9641a46601e40e8e3ffad2cc1cede38b723d7.jpg?<OPEN GRAPH IMAGE HERE>",
        "og__alt": "<ALT IMAGE TAG HERE>",
        "og__url": "<HOMEPAGE URL HERE> e.g. http: //example.com",
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
