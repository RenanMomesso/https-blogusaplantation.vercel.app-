import React from "react";
import Link from "next/link";
import renderHTML from "react-render-html";
import { useState, useEffect } from "react";

const Footer = () => {
  return (
    <div className="container-fluid footer">
      <div className="page-footer font-small blue pt-4 " style={{backgroundColor:'white', marginLeft:15}}>
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <h5 className="text-uppercase">Meios de contato</h5>
              <p>
                cel:(19)981**-****
              </p>
            </div>

            <div className="clearfix w-100 d-md-none pb-3">
              <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Links</h5>

                <ul className="list-unstyled">
                  <li>
                    <a href="#!">Facebook link</a>
                  </li>
                 
                </ul>
              </div>
              </div>

              <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase">Redes sociais</h5>

                <ul className="list-unstyled">
                  <li>
                    <a href="https://www.facebook.com/renan.momesso.3/">Facebook</a>
                  </li>
                 
                </ul>
              </div>
          </div>

          <div className="footer-copyright text-center py-3">
            © 2020 Copyright:
            <a href="https://www.linkedin.com/in/renan-momesso-b58828138/"> Feito por Renan Vechini Momesso</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
