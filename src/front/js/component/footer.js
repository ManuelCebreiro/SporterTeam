import React from "react";
import "../../styles/footer.css";

export const Footer = () => (
  <footer className="footer-distributed">
    <div className="container-fluid p-2 m-0">
      <section className="row row-no-gutters">
        <div className="col-xs-12 col-sm-12 col-xl-3 col-md-3 mb-md-1 py-2">
          <div className="footer-left">
            <span className="footer-links">
              <ul className="list-unstyled mb-0">
                <li>
                  <button href="#!" className="text-white">
                    Sobre Nosotros
                  </button>
                </li>
                <li>
                  <button
                    href="mailto:sporter.team.2022@gmail.com"
                    className="text-white"
                  >
                    Contacto
                  </button>
                </li>
                <li>
                  <button href="#!" className="text-white">
                    Preguntas Frecuentes
                  </button>
                </li>
                <li>
                  <button href="#!" className="text-white">
                    Condiciones de Uso
                  </button>
                </li>
              </ul>
            </span>
          </div>
        </div>
        <div className="col-md-1 "></div>
        <div className="col-xs-12 col-sm-9 col-md-7 col-xl-7 mb-2 mx-3  ">
          <div className="row align-items-end">
            <div className="col-md-3 ">
              <div id="buttonName" className="footer-right">
                <p>Manuel Cebreiro</p>
                <a href="mailto:cebreirom@gmail.com">
                  <i className="fa fa-envelope"></i>
                </a>
                <a href="https://www.linkedin.com/in/manuelcebreiro/">
                  <i className="fa fa-linkedin"></i>
                </a>
                <a href="https://github.com/ManuelCebreiro">
                  <i className="fa fa-github"></i>
                </a>
              </div>
            </div>

            <div className="col-md-3">
              <div id="buttonName" className="footer-right">
                <p>Martin Barja </p>
                <a href="#">
                  <i className="fa fa-envelope"></i>
                </a>
                <a href="https://www.linkedin.com/in/developermartinbarja/">
                  <i className="fa fa-linkedin"></i>
                </a>
                <a href="https://github.com/Hanksito">
                  <i className="fa fa-github"></i>
                </a>
              </div>
            </div>

            <div className="col-md-3 ">
              <div id="buttonName" className="footer-right">
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
          </div>
        </div>
      </section>
    </div>
    <div
      className="text-center p-2"
      style={{ color: "#FEFEFE", fontSize: "12px" }}
    >
      SPORTER © 2022 Copyright:
    </div>
  </footer>
);
