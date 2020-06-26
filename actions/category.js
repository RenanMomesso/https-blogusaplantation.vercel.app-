import fetch from "isomorphic-fetch";
import { API } from "../config";
import { JsonWebTokenError } from "jsonwebtoken";
import { isAuth, handleResponse } from './auth';
export const create = (category, token) => {
  return fetch(`${API}/category`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      handleResponse(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getCategories = () => {
  return fetch(`${API}/category`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const singleCategory = (slug) => {
  return fetch(`${API}/category/${slug}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const removeCategory = (slug, token) => {
  return fetch(`${API}/category/${slug}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    handleResponse(response);
    return response.json();
  })
  .catch((err) => console.log(err));
};

export const editCategory = (slug, token) => {
  return fetch(`${API}/category/${slug}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newSlug),
  }).then((response) => {
    handleResponse(response);
    return response.json();
  })
  .catch((err) => console.log(err));
};
