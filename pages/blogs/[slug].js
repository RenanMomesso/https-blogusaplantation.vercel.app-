import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { singleBlog, listRelated } from "../../actions/blog";
import renderHTML from "react-render-html";
import moment from "moment";
import SmallCard from "../../components/blog/SmallCard";
import { API,DISQUS_SHORTNAME, APP_NAME, DOMAIN, FB_APP_ID } from "../../config";
import DisqusThread from '../../components/DisqusThread'


const SingleBlog = ({ blog, query }) => {
  const [related, setRelated] = useState([]);

  const loadRelated = () => {
    listRelated({ blog }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  useEffect(() => {
    loadRelated();
  }, []);

  const head = () => (
    <Head>
      <title>
        {" "}
        {blog.title} | {APP_NAME}
      </title>
      <meta name="description" content={blog.mdesc} />
      <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:title" content={` ${blog.title} | ${APP_NAME}`} />
      <meta property="og:description" content={`${blog.mdesc}`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/blog/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content={`${API}/blog/photo/${query.slug}`} />
      <meta
        property="og:image:secure_url"
        content={`${API}/blogs/photo/${blog.photo}`}
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  const showBlogCategories = (blog) => {
    return blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));
  };
  const showBlogTags = (blog) => {
    return blog.tags.map((t, i) => (
      <Link key={i} href={`/categories/${t.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));
  };

  const showRelatedBlog = () => {
    return related.map((blog, i) => (
      <div className="col-md-4" key={i}>
        <article style={{boxShadow:'5px 5px 5px px gray'}}>
          <SmallCard blog={blog} />
        </article>
      </div>
    ));
  };

  const showCommentsInBlog = () => {
    return(
      <div>
        <DisqusThread id={blog._id} title={blog.title} path={`$/blog/${blog.slug}`}/>
      </div>
    )
  }

  return (
    <>
      {head()}
      <Layout>
        <main>
          <article>
            <div className="container-fluid blog_slug">
              <section>
                  <div className="text-center image_slug">

                  <img
                    src={`${API}/blog/photo/${blog.slug}`}
                    alt={blog.title}
                    className="img img-fluid featured-image text-center"
                    />
                    </div>
                <div className="row">
                </div>
              </section>
              <section className="container card_blog_each">
                <div className="container card_blog_each">
                  <h1 className="display-2 pb-3 text-center pt-3 mt-3 font-weight-bold blog_title">
                    {blog.title}
                  </h1>
                  <p className="lead pt-1 pb-1">
                    Written by <Link href={`/profile/${blog.postedBy.username}`}>
                      <a>{blog.postedBy.username}</a></Link> | Published{" "}
                    {console.log(query.slug)}
                    {console.log(blog.slug)}
                    {moment(blog.updatedAt).fromNow()}
                  </p>
                  <div className="pb-3">
                    {showBlogTags(blog)}
                    {showBlogCategories(blog)}
                    <br />
                    <br />
                  </div>
                </div>
                <div className="container">
                  <section>
                    <div className="col-md-12 lead" style={{paddingBottom:150, marginBottom:20}}>
                      {renderHTML(blog.body)}
                    </div>
                    <hr style={{backgroundColor:'rgba(0,0,0,0.33', height:'2px'}}/>
                  </section>
                </div>
                <div className="container pb-5">
                  <h4 className="text-center pt-5 pb-5 h2">Related blog</h4>
                  <div className="row">
                  {showRelatedBlog()}
                  </div>
                </div>
                  <div className="container pt-5 pb-5">{showCommentsInBlog()}</div>
              </section>
            </div>
          </article>
        </main>
      </Layout>
    </>
  );
};

SingleBlog.getInitialProps = ({ query }) => {
  return singleBlog(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data);
      return { blog: data, query };
    }
  });
};

export default SingleBlog;
