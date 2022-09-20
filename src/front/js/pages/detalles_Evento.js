import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import { ExpulsarUsuarioEvento } from "../component/botonExpulsarUsuario";
import { DetallesEventoAdmin } from "../component/detalles_Evento_Admin";
import { JugadorespendientesEvento } from "../component/jugadorespendientesEvento";

import "../../styles/detalles_evento.css";
export const DetallesEvento = () => {
  const { store, actions } = useContext(Context);
  const detalles = store.dataEventoUnico;
  const players = store.jugadores;
  const user = store.datosUsuario;
  let params = useParams();
  const datosUsuario = store.datosUsuario;

  useEffect(() => {
    actions.look_event(params.theid);
    actions.get_player_event(params.theid);
    actions.DatosUsuarioLogeado();
  }, []);
  const color =
    detalles.estadoEvento == "Abierto" || detalles.estadoEvento == "Cerrado"
      ? { color: "green" }
      : { color: "red" };

  return (
    <div id="bgdetalles">
      <div className="p-3 ">
        <div
          className="container border border-white "
          id="detalleseventofondo"
        >
          <div className="row px-4">
            <div className="col-lg-4 ">
              <h1 className="text-center text-white">Cuándo y dónde</h1>
              <div className="container p-1 rounded bg-light">
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
            <div className="col-lg-4 ">
              <h1 className="text-center text-white pe-5">Jugadores</h1>
              <div className="row">
                <div className="col-lg-5 text-center pt-2  rounded">
                  {Array.from(players).map((element, index) => {
                    if (element.id % 2 !== 0) {
                      return (
                        <ol key={index} className="ps-3 text-white text-center">
                          {element.username} {""}
                          {user.id == detalles.admin ? (
                            <button
                              type="button"
                              className="btn-close float-end"
                              aria-label="Close"
                              onClick={() => {
                                actions.expulsarUsuarioEvento(
                                  detalles.id,
                                  element.id
                                );
                              }}
                            ></button>
                          ) : undefined}
                        </ol>
                      );
                    }
                  })}
                </div>
                <div className="col-lg-5 text-center pt-2 rounded">
                  {Array.from(players).map((element, index) => {
                    if (element.id % 2 == 0) {
                      return (
                        <ol key={index} className="ps-3 text-white text-center">
                          {element.username} {""}
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
                        </ol>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              {detalles.admin == datosUsuario.id ? (
                <JugadorespendientesEvento idevento={params.theid} />
              ) : undefined}
              <h1 className="text-white text-center">Descripcion</h1>
              <div className="text-white px-2">{detalles.description}</div>
            </div>
            <div className="row text-center pt-3">
              <button id="bottonstyle" class="cssbuttons-io-button">
                {" "}
                Dejar evento
                <div class="icon">
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
          {detalles.admin == datosUsuario.id ? (
            <DetallesEventoAdmin />
          ) : undefined}
          <div className="row text-center">
            <Link
              to="/perfil"
              onClick={() => {
                actions.getUserDataEventos(params.theid);
              }}
            >
              <button type="button" className="btn btn-secondary">
                Volver al Perfil
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
