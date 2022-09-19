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
  const userEventosFinalizado = Array.from(eventos).filter(
    (element) => element.estadoEvento == "Finalizado"
  );
  console.log(userEventosFinalizado)
  const user = store.datosUsuario;
  return (
    <div className="container mt-3 py-2" style={{ maxWidth: 1100 }} id="estilofondoperfil">
      <div className="main-body pt-4" >
        <div className="row ">
          <div className="col-lg-1 col-md-1"></div>
          <div className="col-lg-10 col-md-10 d-flex flex-row-reverse px-0 ">
            <Link to="/Edituser" className="btn " id="botoneditar"  >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill " viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
              </svg>
            </Link>
          </div>
          <div className="col-lg-1 col-md-1 col-xs-1 "></div>
          <div className="col-lg-2 col-md-1"></div>
        </div>
        {/* --------------------- Boton editar --------------------------- */}

        <div className="row mx-0">
          <div className="col-lg-1 col-md-1"></div>
          <div className="col-lg-4 col-md-4 col-xs-4 mb-2" >
            <div className="card border-0 bg-transparent" >
              <div className="card-body pt-0 " >
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src={store.imagen}
                    alt="Admin"
                    className="rounded-circle fluid"
                    id="estiloperfil"
                    style={{ width: "250px", height: "250px" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-xs-6 my-3 py-1 " id="estilosperfil">
            <div className="card mt-3 mb-3 border-0">
              <div className="card-body">
                <div className="row py-1">
                  <div className="col-sm-4">
                    <h6 className="mb-0">Username:</h6></div>
                  <div className="col-sm-8 text-secondary">{user.username}</div>
                </div>
                <hr />
                <div className="row py-1">
                  <div className="col-sm-4">
                    <h6 className="mb-0">Age</h6>
                  </div>
                  <div className="col-sm-8 text-secondary">{user.age}</div>
                </div>
                <hr />
                <div className="row py-1 mb-3">
                  <div className="col-sm-4">
                    <h6 className="mb-0">Description</h6>
                  </div>
                  <div className="col-sm-8 text-secondary">
                    {user.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-1 col-md-1"></div>
        </div>

        {/* ------------------------- IMAGEN PERFIL Y DESCRIPCION ---------------- */}
        <br />
        <div className="row mx-0">
          <div className="col-lg-1 col-md-1"></div>
          {/* <div className="row"> */}
          <div className="col-lg-10 col-md-10 col-xs-10 mb-3">

            <div className="card mt-3 p-2" id="estilosperfil">
              <h5 id="estilotitulo">Eventos Pendientes</h5>
              <table className="table table-striped">
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
                <div className="card mt-3 p-2" id="estilosperfil">
                  <h5 className=" mb-3" id="estilotitulo">
                    Eventos en los que participo
                  </h5>
                  {userEventosactivos.length ?
                    <div class="table-wrapper-scroll-y my-custom-scrollbar">
                      <table className="table table-striped table-responsive" >
                        <thead className="thead-dark">
                          <tr >
                            <th scope="col" >Sport</th>
                            <th scope="col">Date</th>
                            <th scope="col">Duración</th>
                            <th scope="col">Ciudad</th>
                            <th scope="col">Espacio</th>
                            <th scope="col">Payment</th>

                          </tr>
                        </thead>
                        <tbody>
                          {userEventosactivos.map((element, index) => (
                            <tr key={index} >
                              <td>{element.sport}</td>
                              <td>{element.date}</td>
                              <td>{element.duration} {"minutos."}</td>
                              <td>{element.ciudad}</td>
                              <td>{element.space ? "Cubierto" : "Aire libre"}</td>
                              <td>{element.payment} {"€"}</td>

                              <td>
                                <DatosEventoUnico id={element.id} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    :
                    <h4>No hay eventos que mostrar</h4>}
                </div>
              </div>
              <br />
              <div className="col-sm-12 mb-3">
                <div className="card mt-3 p-2" id="estilosperfil" >
                  <h5 className=" mb-3" id="estilotitulo">
                    Historial de eventos
                  </h5>
                  {userEventosactivos.length ?
                    <table className="table table-striped">
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
          {/* </div> */}
          <div className="col-md-1"></div>
        </div>
      </div>
    </div >

  );
};
