import React from 'react';
import "../../node_modules/react-quill/dist/quill.snow.css";
import "../static/css/styles.css";
import ".././node_modules/nprogress/nprogress.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'any-other-css-you-want.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}