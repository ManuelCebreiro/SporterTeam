import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import { element } from "prop-types";
import { DetallesEventoAdmin } from "../component/detalles_Evento_Admin";

export const DetallesEvento = () => {
  const { store, actions } = useContext(Context);
  const detalles = store.dataEventoUnico;
  const players = store.jugadores;
  let params = useParams();
  const datosUsuario = store.datosUsuario;
  // console.log(players)

  useEffect(() => {
    actions.look_event(params.theid);
    actions.get_player_event(params.theid);
    actions.DatosUsuarioLogeado();
  }, []);

  return (

    <div className="container" id="bgdetalles">
      <div className="row py-4">
        <div className="col-4">
          <h1 className="text-center">Cuándo y dónde</h1>
          <div className="bg-warning">
            <div className="row bg-light ms-1" id="estilosdatos">
              <h5>
                <span className="me-4">
                  Fecha: {""}
                </span>
                <span className="float-end">
                  {detalles.date}
                </span>
              </h5>
            </div>
            <div className="row bg-light ms-1" id="estilosdatos">
              <h5>
                <span className="me-4">
                  Donde: {""}
                </span>
                <span className="float-end">
                  {detalles.ciudad}
                </span>
              </h5>
            </div>
            <div className="row bg-light ms-1" id="estilosdatos">
              <h5>
                <span className="me-4">
                  Plazas: {""}
                </span>
                <span className="float-end">
                  {detalles.participantmax}
                </span>
              </h5>
            </div>
            <div className="row bg-light ms-1" id="estilosdatos">
              <h5>
                <span className="me-4">
                  Cuanto cuesta: {""}
                </span>
                <span className="float-end">
                  {detalles.payment}
                </span>
              </h5>
            </div>
            <div className="row bg-light ms-1" id="estilosdatos">
              <h5>
                <span className="me-4">
                  Edad minima:{""}
                </span>
                <span className="float-end">
                  {detalles.agemin}
                </span>
              </h5>
            </div>
            <div className="row bg-light ms-1" id="estilosdatos">
              <h5>
                <span className="me-4">
                  Edad maxima: {""}
                </span>
                <span className="float-end">
                  {detalles.agemax}
                </span>
              </h5>
            </div>
            <div className="row bg-light ms-1" id="estilosdatos">
              <h5>
                <span className="me-4">
                  Duracion: {""}
                </span>
                <span className="float-end">
                  {detalles.duration}
                </span>
              </h5>
            </div>
            <div className="row bg-light ms-1" id="estilosdatos1">
              <h5>
                <span className="me-4">
                  Espacio: {""}
                </span>
                <span className="float-end">
                  {detalles.space ? "Cubierto" : "Aire libre"}
                </span>
              </h5>
            </div>
          </div>
        </div>
        <div className="col-4 ">
          <h1 className="text-center">JUGADORES</h1>
          <div className="row">
            <div className="col-5 text-center">
              {players.map((element, index) => {
                if (element.id % 2 !== 0) {
                  return <ol key={index}>{element.username}
                    <button type="button" class="btn-close" aria-label="Close"></button>
                  </ol>;

                }
              })}

            </div>
            <div className="col-5 text-center">
              {players.map((element, index) => {
                if (element.id % 2 == 0) {
                  return <ol key={index}>{element.username}
                    <button type="button" class="btn-close" aria-label="Close"></button>
                  </ol>;

                }
              })}
            </div>
          </div>
        </div>
        <div className="col-4">
          <h1 className="text-center">Descripcion</h1>-{detalles.description}
        </div>
      </div>
      {detalles.admin == datosUsuario.id ? <DetallesEventoAdmin /> : undefined}
      <div className="row text-center">
        <Link to="/perfil">
          <button type="button" class="btn btn-secondary my-4">
            Volver al Perfil
          </button>
        </Link>
      </div>
    </div>
  );


};
