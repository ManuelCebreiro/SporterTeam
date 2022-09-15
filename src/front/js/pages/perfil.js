import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { DatosEventoUnico } from "../component/datoseventounico";
import { Link } from "react-router-dom";
import { element } from "prop-types";

export const Perfil = () => {
  const { store, actions } = useContext(Context);
  const user = store.datosUsuario;

  useEffect(() => {
    actions.getUserDataEventos();
    actions.DatosUsuarioLogeado();
    actions.geteventosPendientes(user.id);
  }, []);

  const eventosPendientes = store.eventosPendientes;
  const eventos = store.userDataEventos;
  const userEventosactivos = Array.from(eventos).filter(
    (element) =>
      element.estadoEvento == "Abierto" || element.estadoEvento == "Cerrado"
  );
  const userEventosFinalizado = Array.from(eventos).filter(
    (element) => element.estadoEvento == "Finalizado"
  );

  return (
    <div className="container py-2">
      <div className="main-body">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
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
            <div className="card mt-3 p-2">
              <h5>Eventos Pendientes</h5>
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Sport</th>
                    <th scope="col">Date</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Ciudad</th>
                    <th scope="col">Espacio</th>
                    <th scope="col">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from(eventosPendientes).map((element, index) => (
                    <tr key={index}>
                      <td>{element.sport}</td>
                      <td>{element.date}</td>
                      <td>{element.duration}</td>
                      <td>{element.ciudad}</td>
                      <td>{element.space}</td>
                      <td>{element.payment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-8">
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

            <div className="row gutters-sm">
              <div className="col-sm-6 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="d-flex align-items-center mb-3">
                      Eventos en los que participo
                    </h5>
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
                  </div>
                </div>
              </div>
              <div className="col-sm-6 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="d-flex align-items-center mb-3">
                      Historial de eventos
                    </h5>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
