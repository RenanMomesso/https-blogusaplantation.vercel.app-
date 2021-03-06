import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { create, getCategories, removeCategory, singleCategory, editCategory } from "../../actions/category";
import { isAuth, getCookie } from "../../actions/auth";

const Category = () => {
  const [values, setValues] = useState({
    name: "",
    error: "",
    success: false,
    categories: [],
    removed: false,
    reload:false
  });
  const { name, error, success, categories, removed, reload} = values;
  const token = getCookie("token");

  const clickSubmit = (e) => {
    e.preventDefault();
    // console.log('create category', name);
    create({ name }, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false, reload });
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          name: "",
          removed: "",
          reload:!reload
        });
      }
    });
  };





  const singleCategoryLoad = slug => {
    singleCategory(slug,token).then(data =>{
      if(data.error){
        console.log(data.error)
      } else {
        setValues({...values, name:data.name})
      }
    })
  }

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };
  useEffect(() => {
    loadCategories();
  }, [reload]);

  const handleChange = (e) => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: "",
    });
  };



  const showCategories = () => {
    return categories.map((c,i)=>{
      return (
      <button onClick={()=>singleCategoryLoad(c.slug)} onDoubleClick={()=>deleteConfirm(c.slug)} title="double click to delete" key={i} className="btn btn-outline-primary mr-1 ml-1 mt-3">{
        c.name
      }</button>
      )
    })
  }

  const deleteConfirm = slug => {
      let answer = window.confirm('Are you sure you want to delete this category?')
      if(answer){
        deleteCategory(slug)
      }
  }

  const deleteCategory = slug => {
    removeCategory(slug, token).then(data =>{
      if(data.error){
        console.log(data.error)
      } else {
        setValues({...values, error:false, success:false, name:'', removed: !removed, reload:!reload})
      }
    })
  }

  
  const newCategoryForm = () => (
    <form onSubmit={clickSubmit} className="form-group">
      <label className="text-muted">Name</label>
      <input
        type="text"
        placeholder="Name of new category"
        title="ex: Tomatoes"
        autoFocus={true}
        autoComplete={false}
        required
        minLength={2}
        className="form-control"
        onChange={handleChange}
        value={name}
      />
      <button className="btn btn-primary mt-2" type="submit">
        Create
      </button>
    </form>
  );
  const mouseHandler = e => {
    setValues({...values, error:false, success:false, removed: ''})
  }

    const showSuccess = () => {
      if(success){
        return <p className="text-success">Category is created</p>
      }
    }

    const showError = () => {
      if(error){
        return <p className="text-alert">Category already exists</p>
      }
    }

    const showRemoved = () => {
      if(removed){
        return <p className="text-danger">Category is removed</p>
      }
    }

  return (
    <React.Fragment>
      <div onMouseMove={mouseHandler}>

      {newCategoryForm()}
      {showCategories()}
      </div>
      {showError()}
      {showRemoved()}
      {showSuccess()}
    </React.Fragment>
  );
};

export default Category;
