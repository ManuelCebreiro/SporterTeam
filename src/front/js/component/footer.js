import React from "react";
import "../../styles/footer.css";

export const Footer = () => (
  <footer className="footer-distributed">
    <div class="container p-2 m-0">
      <section class="">
        <div class="row">
          <div class="col-lg-3 col-md-3 mb-2 mb-md-0">
            <div className="footer-left">
              <p className="footer-links">
                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Faq
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Terms and Conditions
                    </a>
                  </li>
                </ul>
              </p>
            </div>
          </div>

          <div class="col-lg-3 col-md-3 mb-2 mx-3 mb-md-0">
            <div id="buttonManuel" className="footer-right">
              {" "}
              <p>Manuel Cebreiro</p>
              <a href="#">
                <i className="fa fa-envelope"></i>
              </a>
              <a href="#">
                <i className="fa fa-linkedin"></i>
              </a>
              <a href="#">
                <i className="fa fa-github"></i>
              </a>
            </div>
          </div>
          <div class="col-lg-2 col-md-3 mb-3 mx-3 mb-md-0">
            <div id="buttonManuel" className="footer-right">
              {" "}
              <p>Martin Barja</p>
              <a href="#">
                <i className="fa fa-envelope"></i>
              </a>
              <a href="#">
                <i className="fa fa-linkedin"></i>
              </a>
              <a href="#">
                <i className="fa fa-github"></i>
              </a>
            </div>
          </div>
          <div class="col-lg-2 col-md-3 mb-2 mx-3 mb-md-0">
            <div id="buttonManuel" className="footer-right">
              {" "}
              <p>David Pizarro</p>
              <a href="mailto:pizarro.developer@gmail.com">
                <i className="fa fa-envelope"></i>
              </a>
              <a href="https://www.linkedin.com/in/david-pizarro-developer">
                <i className="fa fa-linkedin"></i>
              </a>
              <a href="https://github.com/dpizapal">
                <i className="fa fa-github"></i>
              </a>
            </div>
          </div>
          <div class="col-lg-3 col-md-3 mb-2 mb-md-0">
            <div className="footer-right"> </div>
          </div>
        </div>
      </section>
    </div>
    <div class="text-center p-2" style={{ color: "#FEFEFE" }}>
      SPORTER © 2022 Copyright:
    </div>
  </footer>
);
