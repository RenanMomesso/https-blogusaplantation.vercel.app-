import fetch from "isomorphic-fetch";
import { API } from "../config";
import { JsonWebTokenError } from "jsonwebtoken";
import queryString from "query-string";
import kuerystring from "queryString";
import { isAuth, handleResponse } from './auth';



export const createBlog = (blog, token) => {
  let createdEndPoint;
  if (isAuth() && isAuth().role === 1) {
    createdEndPoint = `${API}/blog`;
  } else if (isAuth() && isAuth().role === 0) {
    createdEndPoint = `${API}/user/blog`;
  }

  return fetch(`${createdEndPoint}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: blog,
  })
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listBlogsWithCategoriesAndTags = (skip, limit) => {
  const data = {
    limit,
    skip,
  };
  return fetch(`${API}/blog-categories-tags`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const singleBlog = (slug) => {
  return fetch(`${API}/blog/${slug}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const listRelated = (blog) => {
  return fetch(`${API}/blog/related`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const list = (username) => {
  let listByUser;
  if (username) {
    listByUser = `${API}/${username}/blogs`;
  } else {
    listByUser = `${API}/blog`;
  }

  return fetch(`${listByUser}`, {
    method: "GET",
    Accept: "application/json",
    "Content-Type": "application/json",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const removeBlog = (slug, token) => {
  let deleteBlogEndpoint;
  if (isAuth() && isAuth().role === 1) {
    deleteBlogEndpoint = `${API}/blog/${slug}`;
  } else if (isAuth() && isAuth().role === 0) {
    deleteBlogEndpoint = `${API}/user/blog/${slug}`;
  }

  return fetch(`${deleteBlogEndpoint}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      handleResponse(response)
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateBlog = (blog, token, slug) => {
  let updateBlogByUser;
  if (isAuth() && isAuth().role === 1) {
    updateBlogByUser = `${API}/blog/${slug}`;
  } else if (isAuth() && isAuth().role === 0) {
    updateBlogByUser = `${API}/user/blog/${slug}`;
  }
  return fetch(`${updateBlogByUser}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: blog,
  })
    .then((response) =>  {
      handleResponse(response)
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listSearch = (params) => {
  console.log("params query", params);
  const query = queryString.stringify(params);
  const kuery = kuerystring.stringify(params);
  console.log("query certa", query);
  console.log("query errada", kuery);
  return fetch(`${API}/blog/search?${query}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
