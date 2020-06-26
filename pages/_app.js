import React from 'react';
import "../node_modules/react-quill/dist/quill.snow.css";
import "../static/css/styles.css";
import "../node_modules/nprogress/nprogress.css";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
