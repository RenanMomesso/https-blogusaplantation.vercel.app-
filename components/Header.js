import React, { useState } from "react";
import { APP_NAME } from "../config";
import Link from "next/link";
import { isAuth, authenticate, signout } from "../actions/auth";
import NGprogress from "nprogress";

import Router, { withRouter } from "next/router";
import Search from "./blog/Search";


import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";

Router.onRouteChangeStart = (url) => NGprogress.start();
Router.onRouteChangeComplete = (url) => NGprogress.done();
Router.onRouteChangeError = (url) => NGprogress.done();

const Header = ({router}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = (pathname, path) => {
    if (router.pathname === path) {
      return { color: "black", cursor:'pointer',fontSize:'17px'  };
    } else {
      return { color: "#ffffff",cursor:'pointer' ,fontSize:'17px' };
    }
  };

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="header-menu" >
      <Navbar
        className="testando"
        color="alert alert-info"
        style={{ backgroundColor: "lightgreen" }}
        light
        expand="md"
      >
        <Link href="/">
          <NavLink
            className="font-weight-bold menu_hover"
            style={
              isActive(router.pathname,"")
              
            }
          >
            {APP_NAME}
          </NavLink>
        </Link>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar></Nav>
          <Nav navbar>
            <NavItem title="All blogs" className="menu_hover" style={{marginRight:10}}>
              <Link href="/blogs">
                <NavLink  style={isActive(router.pathname,'/blogs')}>Blogs </NavLink>
              </Link>
            </NavItem>
            <NavItem title="Contat Page" className="menu_hover" style={{marginRight:10}}>
              <Link href="/contact">
                <NavLink  style={isActive(router.pathname,'/contact')}>Contact </NavLink>
              </Link>
            </NavItem>
            {!isAuth() && (
              <>
                <NavItem>
                  <Link href="/signup">
                    <NavLink style={isActive(router.pathname,'/signup')}>Signup</NavLink>
                  </Link>
                </NavItem>

                <NavItem>
                  <Link href="/signin" className="menu_hover">
                    <NavLink style={isActive(router.pathname, '/signin')}>Signin </NavLink>
                  </Link>
                </NavItem>
              </>
            )}

            {isAuth() && isAuth().role == "1" && (
              <NavItem title="Your dashboard" className="menu_hover">
                <Link href="/admin">
                  <NavLink style={isActive(router.pathname,'/admin')}>
                  
                      <i className="fa fa-user" aria-hidden="true" title="Your dashboard" style={{marginLeft:10,marginRight:10}}></i>
                  </NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && isAuth().role == "0" && (
              <NavItem title="Your dashboard" className="menu_hover">
                <Link href="/user">
                  <NavLink style={isActive(router.pathname,'/signup')}>
                   <a>

                      <i className="fa fa-user" aria-hidden="true" style={{marginLeft:10, marginRight:10}} title="Your DASHBOARD"/>
                   </a>
                  </NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && (
              <NavItem>
                <NavLink className="menu_hover" title="signout"
                  style={isActive(router.pathname,'/signout')}
                  onClick={() => signout(() => Router.replace("/signin"))}
                >
                  <i className="fa fa-sign-out" aria-hidden="true" title="signout" style={{marginLeft:10, marginRight:10}}></i>
                </NavLink>
              </NavItem>
            )}

{isAuth() && isAuth().role == "1" && (
              <NavItem>
                  <NavLink  className="btn btn-danger menu_hover" title="Write a new post" style={isActive(router.pathname,'/admin/crud/blog')}>
                  <a href="admin/crud/create">Create Blog</a>
                  </NavLink>
              </NavItem>
            )}
{/* {isAuth() && isAuth().role == "0" && (
              <NavItem title="Write a new post">
                  <NavLink  className="btn btn-danger menu_hover" style={isActive(router.pathname,'/user/crud/create')}>
                  <a href="/user/crud/create">Create Blog</a>
                  </NavLink>
              </NavItem>
            )} */}
          </Nav>
        </Collapse>
      </Navbar>
      <Search />
    </div>
  );
};

export default withRouter(Header);
