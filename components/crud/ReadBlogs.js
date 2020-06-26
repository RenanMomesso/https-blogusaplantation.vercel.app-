import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { getTags } from "../../actions/tag";
import { getCookie, isAuth } from "../../actions/auth";
import Dynamic from "next/dynamic";
import { removeBlog, list } from "../../actions/blog";
import moment from "moment";

const ReadBlogs = ({username}) => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");

  const token = getCookie("token");
  const loadBlogs = () => {
    return list(username).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  const avisoDelete = (slug) => {
    let confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?" + slug
    );
    if (confirmDelete) {
      removerBlog(slug);
    }
  };

  const removerBlog = (slug) => {
    removeBlog(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message);
        loadBlogs();
        window.scrollTo(100, 100);
      }
    });
  };

  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <div className="mt-5 pb-5" key={i}>
          <h3>{blog.title}</h3>
          <p className="mark">
            Written by {blog.postedBy.name} | Published on{" "}
            {moment(blog.updatedAt).fromNow()}
          </p>

          <button
            className="btn btn-sm btn-danger"
            onClick={() => avisoDelete(blog.slug)}
          >
            delete
          </button>
          {showUpdateButton(blog)}
        </div>
      );
    });
  };

  const showUpdateButton = (blog) => {
    if (isAuth() && isAuth().role === 0) {
      return (
        <Link href={`/user/crud/${blog.slug}`}>
          <a className="ml-2 btn btn-sm btn-warning">Update</a>
        </Link>
      );
    } else if (isAuth() && isAuth().role === 1) {
      return (
        <Link href={`/admin/crud/${blog.slug}`}>
          <a className="ml-2 btn btn-sm btn-warning">Update</a>
        </Link>
      );
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  return (
    <>
      <div className="container card_blog_each">
        <div className="row">
          <div className="col-md-12">
            {message && <div className="alert alert-warning">{message} </div>}
            {showAllBlogs()}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadBlogs;
