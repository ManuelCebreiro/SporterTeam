import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { DatosEventoUnico } from "../component/datoseventounico";
import { Link } from "react-router-dom";

export const Perfil = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getUserDataEventos();
    actions.DatosUsuarioLogeado();
  }, []);

  const eventos = store.userDataEventos;
  const userEventosactivos = Array.from(eventos).filter(
    (element) =>
      element.estadoEvento == "Abierto" || element.estadoEvento == "Cerrado"
  );
  console.log(userEventosactivos)
  const userEventosFinalizado = Array.from(eventos).filter(
    (element) => element.estadoEvento == "Finalizado"
  );
  const user = store.datosUsuario;
  return (
    <div className="container mt-3 py-2" style={{ maxWidth: 1100 }}>
      <div className="main-body pt-4" id="estilosperfil">
        <div className="row gutters-sm">
          <div className="col-lg-2 col-md-1"></div>
          <div className="col-lg-8 col-md-10 col-xs-10 mb-3" >
            <div className="card">
              <div className="card-body" id="estilosperfil2">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src={store.imagen}
                    alt="Admin"
                    className="rounded-circle fluid"
                    style={{ width: "250px" }}
                  />
                </div>
              </div>
            </div>

          </div>
          <div className="col-lg-2 col-md-1"></div>
          <div className="col-lg-2 col-md-1"></div>
          <br />
          <div className="col-lg-8 col-md-10 col-xs-10 mb-3" id="estilosperfil">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Username:</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{user.username}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Age</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{user.age}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Description</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {user.description}
                  </div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-sm-12">
                    <Link to="/Edituser" className="btn btn-info">
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-3 p-2">
              <h5>Eventos Pendientes</h5>
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Sport</th>
                    <th scope="col">Date</th>
                    <th scope="col">Ciudad</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                    <td>Ejemplo</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />

            <div className="row gutters-sm">
              <div className="col-sm-12 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="d-flex align-items-center mb-3 text-center">
                      Eventos en los que participo
                    </h5>
                    {userEventosactivos.length ?
                      <table className="table">
                        <thead className="thead-dark">
                          <tr>
                            <th scope="col">Sport</th>
                            <th scope="col">Date</th>
                            <th scope="col">Ciudad</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userEventosactivos.map((element, index) => (
                            <tr key={index}>
                              <td>{element.sport}</td>
                              <td>{element.date}</td>
                              <td>{element.ciudad}</td>
                              <td>
                                <DatosEventoUnico id={element.id} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      :
                      <h4>No hay eventos que mostrar</h4>}
                  </div>
                </div>
              </div>
              <br />
              <div className="col-sm-12 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="d-flex align-items-center mb-3">
                      Historial de eventos
                    </h5>
                    {userEventosactivos.length ?
                      <table className="table">
                        <thead className="thead-dark">
                          <tr>
                            <th scope="col">Sport</th>
                            <th scope="col">Date</th>
                            <th scope="col">Ciudad</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userEventosFinalizado.map((element, index) => (
                            <tr key={index}>
                              <td>{element.sport}</td>
                              <td>{element.date}</td>
                              <td>{element.ciudad}</td>
                              <td>
                                <DatosEventoUnico id={element.id} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      :
                      <h4>No hay eventos que mostrar</h4>}
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="col-md-2"></div>

        </div>
      </div>
    </div>
  );
};
