import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  publicRuntimeConfig: {
    APP_NAME: "SEOBLOG",
    API_DEVELOPMENT: "https://blogusa.herokuapp.com/api",
    API_PRODUCTION: "https://blogusa.herokuapp.com/api",
    PRODUCTION: "true",
    DOMAIN_DEVELOPMENT:'https://blogusa.herokuapp.com/api',
    DOMAIN_PRODUCTION:'https://blogusa.herokuapp.com/api',
    FB_APP_ID:'703266223770406',
    DISQUS_SHORTNAME:'plantation',
  },
});




export const API = publicRuntimeConfig.API_PRODUCTION;
  // ? publicRuntimeConfig.API_PRODUCTION
  // : publicRuntimeConfig.API_DEVELOPMENT;
export const APP_NAME = publicRuntimeConfig.APP_NAME

export const DOMAIN = publicRuntimeConfig.DOMAIN
  // ? publicRuntimeConfig.DOMAIN_PRODUCTION
  // : publicRuntimeConfig.DOMAIN_DEVELOPMENT;

export const FB_APP_ID = publicRuntimeConfig.FB_APP_ID
export const DISQUS_SHORTNAME =publicRuntimeConfig.DISQUS_SHORTNAME
