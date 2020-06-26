import { useState, useEffect } from "react";
import { createBlog } from "../../actions/blog";
import { withRouter } from "next/router";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { getCookie, isAuth } from "../../actions/auth";
import Link from "next/link";
import Dynamic from "next/dynamic";

const ReactQuill = Dynamic(() => import("react-quill"), { ssr: false });
// import "../../node_modules/react-quill/dist/quill.snow.css";

const CreateBlog = ({ router }) => {
  const blogFromLS = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"));
    } else {
      return false;
    }
  };

  const token = getCookie("token");

  const [checkC, setCheckC] = useState([]);
  const [checkT, setCheckT] = useState([]);

  const handleToggleCategory = (c) => () => {
    setValues({ ...values, error: "" });
    let clickedCategory = checkC.indexOf(c);
    let all = [...checkC];

    if (clickedCategory == -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    setCheckC(all);
    formData.set("categories", all);
  };
  const handleToggleTags = (t) => {
    setValues({ ...values, error: "" });
    let clickedTags = checkT.indexOf(t);
    let allTags = [...checkT];

    if (clickedTags == -1) {
      allTags.push(t);
    } else {
      allTags.splice(clickedTags, -1);
    }
    setCheckT(allTags);
    formData.set("tags", allTags);
  };

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [body, setBody] = useState(blogFromLS);
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    hidePublishButton: false,
  });

  const {
    error,
    formData,
    hidePublishButton,
    sizeError,
    success,
    title,
  } = values;

  const publishBlog = (e) => {
    e.preventDefault();
    createBlog(formData, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          success: `A new blog tittled "${title}" is created `,
          error: "",
          title: "",
        });
        setBody("");
        setCategories([]);
        setTags([]);
      }
    });
  };

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };
  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
  }, [router]);

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData: formData, error: "" });
  };
  const handleBody = (e) => {
    setBody(e);
    formData.set("body", e);
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      {success}
    </div>
  );

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange("title")}
            title="example of title: Plants are growing"
            placeholder="Put the title of the blog"
            value={title}
            minLength={6}
            maxLength={100}
            required
          />
        </div>

        <div className="form-group">
          <ReactQuill
            modules={CreateBlog.modules}
            formats={CreateBlog.formats}
            value={body}
            placeholder="Write something amazing..."
            onChange={handleBody}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Publish blog
        </button>
      </form>
    );
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleToggleCategory(c._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{c.name.toUpperCase()}</label>
        </li>
      ))
    );
  };
  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={() => handleToggleTags(t._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{t.name.toUpperCase()}</label>
        </li>
      ))
    );
  };

  return (
    <div className="container-fluid card_blog_each">
      <div className="row">
        <div className="col-md-8">
          <div>
            <h1>Create blog platform</h1>
            {showError()}
            {showSuccess()}
            {createBlogForm()}
          </div>
        </div>
        <div className="col-md-4">
          <div>
            <div className="form-group pb-2">
              <h5>Featured Image</h5>
              <hr />
              <small className="text-muted"> Max size:1mb</small>
              <br />
              <label className="btn btn-outline-info">
                Upload Blog Image
                <input
                  style={{
                    backgroundColor: "red",
                    color: "white !important",
                    paddingRight: 4,
                    maxWidth: 250,
                    border: "1px solid black",
                  }}
                  type="file"
                  className="inputfile"
                  onChange={handleChange("photo")}
                  accept="image/*"
                  required={true}
                />
              </label>
            </div>

            <h5>Categories</h5>

            <hr />
            <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
              {showCategories()}
            </ul>
          </div>

          <div>
            <h5>Tags</h5>
            <hr />
            <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
              {showTags()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
CreateBlog.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block']
]
};


CreateBlog.formats =  [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'code-block'
];

export default withRouter(CreateBlog);

                          // toolbar: [
                          //   [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
                          //   [{ size: [] }],
                          //   [{ color: [] }, { background: [] }],
                          //   ["bold", "italic", "underline", "strike", "blockquote"],
                          //   [{ list: "ordered" }, { list: "bullet" }],
                          //   ["link", "image", "video"],
                          //   ["clean"],
                          //   ['blockquote', 'code-block'],
                          //   [{ script: "sub" }, { script: "super" }], // superscript/subscript
                          // ],