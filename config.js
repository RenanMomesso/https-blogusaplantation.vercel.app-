import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();


export const API = "https://blogusa.herokuapp.com/api"
  // ? publicRuntimeConfig.API_PRODUCTION
  // : publicRuntimeConfig.API_DEVELOPMENT;
export const APP_NAME = 'https://blogusa.herokuapp.com/api'

export const DOMAIN = 'https://blogusa.herokuapp.com/api'
  // ? publicRuntimeConfig.DOMAIN_PRODUCTION
  // : publicRuntimeConfig.DOMAIN_DEVELOPMENT;

export const FB_APP_ID = '703266223770406';
export const DISQUS_SHORTNAME ='plantation'
