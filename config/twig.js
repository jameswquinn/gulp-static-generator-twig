const twigMarkdown = require('twig-markdown')
const twig = require('gulp-twig')

module.exports = {
data: {
    "head": {
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
            "href": "/",
            "weight": 1
        },
        {
            "link": "about",
            "href": "/about",
            "weight": 2
        },
        {
            "link": "contact",
            "href": "/contact",
            "weight": 3
        }
    ]
},
extend: twigMarkdown
}
