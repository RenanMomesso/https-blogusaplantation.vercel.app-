import { useState, useEffect } from "react";
import { signup, isAuth } from "../../actions/auth";
import Router from "next/router";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { name, email, error, loading, message, password, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table({name,email,error,loading,message,password,showForm})
    setValues({ ...values, error: false, loading: true });
    // const user = { name, email, password };
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: " ",
          email: "",
          password: "",
          error: "",
          loading: false,
          message: data.message,
          showForm: false,
        });
      }
    });
  };

  isAuth() && Router.replace('/')
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";

  const showMessage = () =>
    message ? <div className="alert alert-success">{message}</div> : "";

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            onChange={handleChange("name")}
            type="text"
            value={name}
            className="form-control"
            placeholder="Digite seu nome"
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("email")}
            value={email}
            type="email"
            className="form-control"
            placeholder="Digite seu email"
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            placeholder="Digite seu password"
            value={password}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Criar conta
        </button>
      </form>
    );
  };

  return (
    <React.Fragment>
      <div className="container">
        {showError()}
        {showMessage()}
        {showLoading()}
        {showForm && signupForm()}
      </div>
    </React.Fragment>
  );
};

export default SignupComponent;
