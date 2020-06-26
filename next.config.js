const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  publicRuntimeConfig: {
    APP_NAME: "SEOBLOG",
    API_DEVELOPMENT: "https://blogusa.herokuapp.com/api",
    API_PRODUCTION: "https://blogusa.herokuapp.com/api",
    PRODUCTION: true,
    DOMAIN_DEVELOPMENT:'https://blogusa.herokuapp.com/api',
    DOMAIN_PRODUCTION:'https://blogusa.herokuapp.com/api',
    FB_APP_ID:'703266223770406',
    DISQUS_SHORTNAME:'plantation',
  },
  env:{
    APP_NAME: "SEOBLOG",
    API_DEVELOPMENT: "https://blogusa.herokuapp.com/api",
    API_PRODUCTION: "https://blogusa.herokuapp.com/api",
    PRODUCTION: true,
    DOMAIN_DEVELOPMENT:'https://blogusa.herokuapp.com/api',
    DOMAIN_PRODUCTION:'https://blogusa.herokuapp.com/api',
    FB_APP_ID:'703266223770406',
    DISQUS_SHORTNAME:'plantation',
  }
});


