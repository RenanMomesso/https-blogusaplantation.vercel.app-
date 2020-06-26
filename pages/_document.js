import Document, { Html, Head, Main, NextScript } from "next/document";
import React from 'react'
import "../../node_modules/react-quill/dist/quill.snow.css";
import "../../node_modules/react-quill/dist/quill.snow.css";
import "../static/css/styles.css";
import ".././node_modules/nprogress/nprogress.css";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css"/>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          />
          <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
          <link rel="stylesheet" href="/static/css/styles.css" />
          <link rel="stylesheet" href="/static/css/styles.css" />
          <link rel="stylesheet" href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"/>
          <link
            rel="stylesheet"
            href="path/to/font-awesome/css/font-awesome.min.css"
          />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
