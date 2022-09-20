import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, useNavigate } from "react-router-dom";

import { DetallesEventoAdmin } from "../component/detalles_Evento_Admin";
import { JugadorespendientesEvento } from "../component/jugadorespendientesEvento";

import "../../styles/detalles_evento.css";
export const DetallesEvento = () => {
  const { store, actions } = useContext(Context);
  const detalles = store.dataEventoUnico;
  const players = store.jugadores;
  const user = store.datosUsuario;
  let params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    actions.look_event(params.theid);
    actions.get_player_event(params.theid);
    actions.DatosUsuarioLogeado();
  }, []);
  const color =
    detalles.estadoEvento == "Abierto" || detalles.estadoEvento == "Cerrado"
      ? { color: "green" }
      : { color: "red" };
  const columna = detalles.admin == user.id ? "col-lg-4" : "col-6";
  return (
    <div id="bgdetalles">
      <div className="p-3 ">
        <div
          className="container border border-white "
          id="detalleseventofondo"
        >
          <div className="row p-4">
            <div className={columna}>
              <h1 className="text-center text-white">Detalles</h1>
              <div className="container p-1 rounded bg-light">
                <div className=" px-1 border border-1 bg-light ">
                  <h5>
                    <span className="">Estado:</span>
                    <span style={color} className="float-end">
                      {detalles.estadoEvento}
                    </span>
                  </h5>
                </div>
                <div className=" px-1 border border-1 bg-light ">
                  <h5>
                    <span className="">Deporte:</span>
                    <span className="float-end">{detalles.sport}</span>
                  </h5>
                </div>
                <div className=" px-1 border border-1 bg-light ">
                  <h5>
                    <span className="">Fecha:</span>
                    <span className="float-end">{detalles.date}</span>
                  </h5>
                </div>
                <div className="border border-1 bg-light px-1">
                  <h5>
                    <span className="">Donde: {""}</span>
                    <span className="float-end">{detalles.ciudad}</span>
                  </h5>
                </div>
                <div className=" border border-1 px-1 bg-light ">
                  <h5>
                    <span className="">Plazas: {""}</span>
                    <span className="float-end">{detalles.participantmax}</span>
                  </h5>
                </div>
                <div className=" border border-1 px-1 bg-light ">
                  <h5>
                    <span className="">Cuanto cuesta: {""}</span>
                    <span className="float-end">{detalles.payment}</span>
                  </h5>
                </div>
                <div className=" border border-1 px-1 bg-light ">
                  <h5>
                    <span className="">Edad minima:{""}</span>
                    <span className="float-end">{detalles.agemin}</span>
                  </h5>
                </div>
                <div className=" border border-1 px-1 bg-light ">
                  <h5>
                    <span className="">Edad maxima: {""}</span>
                    <span className="float-end">{detalles.agemax}</span>
                  </h5>
                </div>
                <div className=" border border-1 px-1 bg-light ">
                  <h5>
                    <span className="">Duracion: {""}</span>
                    <span className="float-end">{detalles.duration}</span>
                  </h5>
                </div>
                <div className=" border border-1 px-1 bg-light ">
                  <h5>
                    <span className="">Espacio: {""}</span>
                    <span className="float-end">
                      {detalles.space ? "Cubierto" : "Aire libre"}
                    </span>
                  </h5>
                </div>
              </div>
            </div>
            <div className={columna}>
              <h1 className="text-center text-white pe-5">Jugadores</h1>
              <div className="row bg-white rounded p-1">
                <div className="col-lg-6 text-center rounded">
                  {Array.from(players).map((element, index) => {
                    if (element.id % 2 !== 0) {
                      return (
                        <div
                          key={index}
                          className="text-dark text-start border border-1 bg-white rounded ps-1"
                        >
                          {element.username} {""}
                          {user.id == detalles.admin ? (
                            <button
                              type="button"
                              className="btn-close float-end "
                              aria-label="Close"
                              onClick={() => {
                                actions.expulsarUsuarioEvento(
                                  detalles.id,
                                  element.id
                                );
                              }}
                            ></button>
                          ) : undefined}
                        </div>
                      );
                    }
                  })}
                </div>

                <div className="col-lg-6 text-center  rounded">
                  {Array.from(players).map((element, index) => {
                    if (element.id % 2 == 0) {
                      return (
                        <div
                          key={index}
                          className=" text-dark text-start border border-1 bg-white rounded ps-1"
                        >
                          {element.username}
                          {user.id == detalles.admin ? (
                            <button
                              type="button"
                              class="btn-close float-end"
                              aria-label="Close"
                              onClick={() => {
                                actions.expulsarUsuarioEvento(
                                  detalles.id,
                                  element.id
                                );
                              }}
                            ></button>
                          ) : undefined}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              {detalles.admin == user.id ? (
                <JugadorespendientesEvento idevento={params.theid} />
              ) : undefined}
            </div>
            <div className="row text-center pt-3">
              <h1 className="text-white ">Descripcion</h1>
              <div
                id="descripcion"
                className="container-fluid bg-white rounded text-start"
              >
                {detalles.description}
              </div>
            </div>
            <div className="row text-center pt-3">
              <button
                id="bottonstyle"
                class="cssbuttons-io-button"
                onClick={() => {
                  const expulsar = actions.expulsarUsuarioEvento(
                    detalles.id,
                    user.id
                  );
                  if (expulsar) navigate("/perfil");
                }}
              >
                Dejar evento
                <div class="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-x-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          {detalles.admin == user.id ? <DetallesEventoAdmin /> : undefined}
          <div id="rowsalir" className="row text-center">
            <Link
              to="/perfil"
              onClick={() => {
                actions.getUserDataEventos(params.theid);
              }}
            >
              <button
                id="btnvolverperfil"
                type="button"
                className="btn btn-secondary float-end me-4"
              >
                Volver al Perfil
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
