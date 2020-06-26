import { useState, useEffect } from "react";
import { signin, authenticate,isAuth } from "../../actions/auth";
import Router from 'next/router'

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });


  const { email, error, loading, message, password, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table({name,email,error,loading,message,password,showForm})
    setValues({ ...values, error: false, loading: true });
    const user = { email, password };
    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {

        authenticate(data, ()=>{
            if(isAuth() && isAuth().role === 1){
              Router.push('/admin')
            } else if(isAuth() && isAuth().role === '0'){
              Router.push('/user')
            }
        })


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

  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>
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
          Login
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
        {showForm && signinForm()}
      </div>
    </React.Fragment>
  );
};

export default SigninComponent;
