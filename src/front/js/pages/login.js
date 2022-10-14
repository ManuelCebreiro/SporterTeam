import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (store.validacion) navigate("/home");
  }, [store.validacion]);

  useEffect(() => {
    actions.getEventos();
    actions.eventosparticipantes();

  }, []);

  return (
    <div className="container-fluid p-0 " id="loginstyle">
      <div className="row d-flex">
        <div id="letrasLogin" className="col-xs-12 col-sm-12 col-md-6">
          <div>
            <div className="text-wrap-login">
              <h1 className="text-login">RUN,</h1>
              <h1 className="text-overlay">RUN,</h1>
            </div>
            <div className="text-wrap-login">
              <h1 className="text-login">JUMP,</h1>
              <h1 className="text-overlay">JUMP,</h1>
            </div>
            <div className="text-wrap-login">
              <h1 className="text-login">SPORTER</h1>
              <h1 className="text-overlay colored">SPORTER</h1>
            </div>
          </div>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-6">
          <section className="vh-100 bg-image-fluid">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-auto">
                  <div
                    id="cardLogin"
                    className="card"
                    style={{ borderRadius: "15px", background: "#2d4053" }}
                  >
                    <div className="card-body p-5">
                      <h2
                        style={{ color: "#fefefe" }}
                        className="text-uppercase text-center mb-5"
                      >
                        LOGIN
                      </h2>
                      <form>
                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            style={{ color: "#fefefe" }}
                          >
                            Tu Email
                          </label>
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="Email"
                            value={userEmail}
                            // ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$
                            onChange={(e) => {
                              setUserEmail(e.target.value);
                            }}
                            required
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            style={{ color: "#fefefe" }}
                          >
                            Contraseña
                          </label>
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Contraseña"
                            value={userPassword}
                            onChange={(e) => {
                              setUserPassword(e.target.value);
                            }}
                          />
                        </div>
                        <div className="d-flex justify-content-center">
                          <button
                            id="btnLogin"
                            onClick={() => {
                              actions.login(userEmail, userPassword);
                            }}
                            type="button"
                            className="btn  btn-block btn-lg gradient-custom-2 "
                          >
                            Entrar
                          </button>
                        </div>

                        <p
                          className="text-center mt-5 mb-0 "
                          style={{ color: "#fefefe" }}
                        >
                          No estás registrado?{" "}
                          <Link
                            id="register-btn-login"
                            className="fw-bold "
                            to="/register"
                          >
                            Regístrate!!
                          </Link>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
