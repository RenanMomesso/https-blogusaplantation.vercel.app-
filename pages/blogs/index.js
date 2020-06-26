import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import Card from "../../components/blog/Card";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import { singleCategory } from "../../actions/category";
import {singleTag } from "../../actions/tag";

const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogsLimit,
  blogSkip,
  router,
}) => {
  const head = () => (
    <Head>
      <title>Programming blogs | {APP_NAME}</title>
      <meta
        name="description"
        content="Programming blogs and tutorials on react node next vue php laravel and web developoment"
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta
        property="og:title"
        content={`Latest web developoment tutorials | ${APP_NAME}`}
      />
      <meta
        property="og:description"
        content="Programming blogs and tutorials on react node next vue php laravel and web developoment"
      />
      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const loadMore = () => {
    let toSkip = skip + limit;
    listBlogsWithCategoriesAndTags(toSkip, limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  
 


  const loadMoreButton = () =>
    size > 0 &&
    size >= limit && (
      <button onClick={loadMore} className="btn btn-primary btn-lg">
        Load more
      </button>
    );

  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      // ()
      return (
        <article key={i} className="each_blog" draggable >
          <Card blog={blog} />
        </article>
      );
    });
  };

  const showAllBlogsTitlte = () => {
    return blogs.map((blog, i) => {
      return (
        <div className="row mt-3">
          <div className="col-md-3">
            <Link href={`/blogs/${blog.slug}`}>
              <img
                src={`${API}/blog/photo/${blog.slug}`}
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                alt=""
              />
            </Link>
          </div>

          <li
            className="col-md-8"
            style={{ listStyle: "none", textDecoration: "none" }}
            key={i}
          >
            <Link href={`/blogs/${blog.slug}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        </div>
      );
    });
  };

  const showAllCategories = () => {
    return categories.map((c, i) => (
      <div className="row" title="blogs quantitys with this categories">
      <Link href={`/categories/${c.slug}`} key={i} className="col-md-3">
        <a
          className="btn mr-1 ml-1 mt-3 categoriax"
          style={{ backgroundColor: 'lightgreen', color: "white" }}
          >
          {c.name}    
        </a>
      </Link>
          </div>
    ));
  };

  

  const showAllTags = () => {
    return tags.map((t, i) => (
      <div className="row">
      <Link href={`/tags/${t.slug}`} key={i}>
        <a
          className="btn  mr-1 ml-1 mt-3 categoriax"
          style={{ backgroundColor: 'brown', color: "white" }}
          >
          {t.name}
        </a>
      </Link>
          </div>
    ));
  };

  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog, i) => (
      <article key={i} className="each_blog">
        <Card blog={blog} />
      </article>
    ));
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main className="blog_main">
          <div className="container-fluid">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold text-center">
                  Plantation USA
                  {/* {ImageBg} */}
                </h1>
              </div>
            </header>
          </div>
          <div className="row margin" style={{marginRight:' !important'}}>
            <div className="col-md-7 cada_blog">{showAllBlogs()}</div>
            <div className="col-md-3 pt-5 mt-3">
              {" "}
              <section>
                <div className="pb-5  pl-5 pt-5 text-center categories_card" style={{border:'1px solid lightgray'}}>
                  <h1
                    className="text-center"
                    title="Find blogs with each categories"
                  >
                    Categories
                    
                  </h1>
                  {showAllCategories()}
                </div>
                <br />
                <div className="pb-5 pr-5 pl-5 pt-5 mt-5 text-center categories_card" style={{border:'1px solid lightgray'}}> 
                  <h1 className="text-center" title="Find blogs with each tags">
                    Tags{" "}
                  </h1>
                  {showAllTags()}
                </div>
                <div
                  className="pb-5 pr-5 pl-5 pt-5 mt-5 text-center categories_card"
                  style={{ border: "1px solid black" }}
                >
                  <h1
                    className="text-center"
                    style={{ marginBottom: "20px" }}
                    title="Find blogs with each tags"
                  >
                    Top articles{" "}
                  </h1>
                  {showAllBlogsTitlte()}
                </div>
              </section>
            </div>
            <div
              className="text-center pt-5 pb-5"
              style={{ marginLeft: "60px" }}
            >
              {loadMoreButton()}
            </div>
          </div>
          <div className="row">
            <div className="col-md-7 cada_blog">{showLoadedBlogs()}</div>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Blogs.getInitialProps = () => {
  let skip = 0;
  let limit = 5;

  return listBlogsWithCategoriesAndTags(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogsLimit: limit,
        blogSkip: skip,
      };
    }
  });
};

export default withRouter(Blogs);
