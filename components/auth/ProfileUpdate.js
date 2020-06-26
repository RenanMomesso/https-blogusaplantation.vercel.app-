import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { getCookie, isAuth, updateUser } from "../../actions/auth";
import { getProfile, userPublicProfile, update } from "../../actions/user";
import { API } from "../../config";

const ProfileUpdate = () => {
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    error: false,
    username_for_photo: "",
    success: false,
    loading: false,
    photo: "",
    userData: process.browser && new FormData(),
    about: "",
  });
  const [rotation, setRotation] = useState(0)

  const rotate = () => {
    let newRotation = rotation + 45;
    if(newRotation >= 360){
      newRotation =- 360;
    }
    console.log('funcionou')
    console.log(rotation)
    setRotation(newRotation)
  }

  const token = getCookie("token");
  const {
    email,
    error,
    loading,
    userData,
    name,
    password,
    photo,
    username_for_photo,
    success,
    about,
    username,
  } = values;

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    userData.set(name, value);
    console.log(...userData);
    setValues({
      ...values,
      [name]: value,
      userData,
      error: false,
      success: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    update(token, userData).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
        });
      } else {
        console.log(data);
        updateUser(data, () => {
          setValues({
            ...values,
            username: data.username,
            name: data.name,
            email: data.email,
            about: data.about,
            success: true,
            loading: false,
          });
        });

        window.scrollTo(0, 0);
      }
    });
  };

  const init = () => {
    getProfile(token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log(data);
        setValues({
          ...values,
          username: data.username,
          name: data.name,
          username_for_photo: data.username,
          email: data.email,
          about: data.about,
        });
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showLoading = () => (
    <div
      className="alert alert-info"
      style={{ display: loading ? "" : "none" }}
    >
      Loading...
    </div>
  );
  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      Profile updated
    </div>
  );

  const profileUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-info" htmlFor="file">
          Profile Photo
        </label>
        <input
          onChange={handleChange("photo")}
          id="file"
          name="file"
          type="file"
          accept="image/+"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Profile username</label>
        <input
          onChange={handleChange("username")}
          value={username}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Profile Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          value={name}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Profile email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          value={email}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Profile about</label>
        <textarea
          onChange={handleChange("about")}
          type="text"
          value={about}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          value={password}
          className="form-control"
        />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            {username && (
              <img
              style={{
                maxHeight: "auto",
                maxWidth: "100%",
                transform:`rotate(${rotation}deg)`,
                border: "1px solid gray",
              }}
                src={`${API}/profile/photo/${username_for_photo}`}
              
                onClick={rotate}
                alt="User Profile"
              />
            )}
            {!username && (
              <div
                style={{
                  height: "200px",
                  width: "200px",
                  border: "1px solid lightgrey",
                }}
              ></div>
            )}
          </div>
          <div className="col-md-8 mb-5">
            {showError()}
            {showLoading()}
            {showSuccess()}
            {profileUpdateForm()}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
