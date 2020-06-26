import Link from "next/link";
import moment from "moment";
import renderHTML from "react-render-html";
import { API } from "../../config";
import { isAuth } from "../../actions/auth";

const Card = ({ blog }) => {
  const showBlogCategories = (blog) => {
    return blog.categories && blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug ? c.slug : null}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name ? c.name : null}</a>
      </Link>
    ))
  };
  const showBlogTags = (blog) => {
    return blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));
  };


  return (
    <div className="lead pb-4">
      <header>
        <Link href={`/blogs/${blog.slug ? blog.slug : ""}`}>
          <a>
            <h2 className="text-center pt-3 blog_title_new">{blog.title}</h2>
          </a>
        </Link>
      </header>
     
      <section className="text-center">
        {showBlogCategories(blog)}
        {showBlogTags(blog)}
        <br />
        <br />
      </section>
        <div className="col-md-5">
          <section>
            <Link href={`/blogs/${blog.slug}`} style={{cursor:'pointer'}}>
            <img
            className="image-resize"
              src={`${API}/blog/photo/${blog.slug}`}
              style={{cursor:"pointer"}}
              alt={blog.title}
              />
              </Link>
          </section>
          <br/>
        </div>
          <section>
        <p className="text-center">
        Written by
        <Link href={`/profile/${blog.postedBy.username}`}>
         <a> {blog.postedBy.name}</a>

          </Link>
            <img src={`${API}/profile/photo/${blog.postedBy.username}`} className="img_usuario_perfil" alt=""/>
          
         | Published{" "}
          {moment(blog.updatedAt).format('MMMM Do YYYY')}
        </p>
      </section>
        <div className="col-md-12">
          <section>
            <div className="pb-3 pl-3"  className="sexao" style={{width:'100%', padding:'7px', borderRadius:'12px', marginBottom:5}}>
              {" "}
              {blog.excerpt == undefined ? "" : renderHTML(blog.excerpt.trim(' '))}
            </div>
            <Link href={`/blogs/${blog.slug}`}>
              <a className="btn btn-primary pt-2 mr-3 text-center">Read more</a>
            </Link>
            {isAuth() && isAuth().role == '1' && (<Link className="btn btn-primary" href={`/admin/crud/${blog.slug}` }>Edit </Link>)}
          </section>
        </div>
    </div>
  );
};

export default Card;
