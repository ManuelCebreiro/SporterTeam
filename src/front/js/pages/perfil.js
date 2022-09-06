import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { DatosEventoUnico } from "../component/datoseventounico";

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
  const userEventosFinalizado = Array.from(eventos).filter(
    (element) => element.estadoEvento == "Finalizado"
  );
  const user = store.datosUsuario;
  return (
    <div class="container py-2">
      <div class="main-body">
        <div class="row gutters-sm">
          <div class="col-md-4 mb-3">
            <div class="card">
              <div class="card-body">
                <div class="d-flex flex-column align-items-center text-center">
                  <img
                    src={store.imagen}
                    alt="Admin"
                    class="rounded-circle fluid"
                    style={{ width: "250px" }}
                  />
                </div>
              </div>
            </div>
            <div class="card mt-3 p-2">
              <h5>Eventos Pendientes</h5>
              <table class="table">
                <thead class="thead-dark">
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
          </div>
          <div class="col-md-8">
            <div class="card mb-3">
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Username:</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">{user.username}</div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Age</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">{user.age}</div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Description</h6>
                  </div>
                  <div class="col-sm-9 text-secondary">{user.description}</div>
                </div>

                <hr />
                <div class="row">
                  <div class="col-sm-12">
                    <a
                      class="btn btn-info "
                      target="__blank"
                      href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills"
                    >
                      Edit
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="row gutters-sm">
              <div class="col-sm-6 mb-3">
                <div class="card h-100">
                  <div class="card-body">
                    <h5 class="d-flex align-items-center mb-3">
                      Eventos en los que participo
                    </h5>
                    <table class="table">
                      <thead class="thead-dark">
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
              <div class="col-sm-6 mb-3">
                <div class="card h-100">
                  <div class="card-body">
                    <h5 class="d-flex align-items-center mb-3">
                      Historial de eventos
                    </h5>
                    <table class="table">
                      <thead class="thead-dark">
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
