import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

export const DetallesEvento = () => {
  const { store, actions } = useContext(Context);
  const detalles = store.dataEventoUnico;
  const players = store.jugadores;
  let params = useParams();

  useEffect(() => {
    actions.look_event(params.theid);
    actions.get_player_event(params.theid);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-4 text-start">
          <h1>Cuándo y dónde</h1>
          <h5>
            Fecha:
            {detalles.date}
          </h5>
          <h5>
            Donde:
            {detalles.localization}
          </h5>
          <h5>
            Plazas:
            {detalles.participantmax}
          </h5>
          <h5>
            Cuanto cuesta:
            {detalles.payment}
          </h5>
          <h5>Edad minima:{detalles.agemin}</h5>
          <h5>
            Edad maxima:
            {detalles.agemax}
          </h5>
          <h5>
            Duracion:
            {detalles.duration}
          </h5>
          <h5>Espacio:{detalles.space ? "cubierto" : "airelibre"}</h5>
        </div>
        <div className="col-4">
          <h1>JUGADORES</h1>
          <ul>
            {players.map((element, index) => {
              return <li key={index}>{element.username}</li>;
            })}
          </ul>
        </div>
        <div className="col-4">
          <h1>Descripcion</h1>-{detalles.description}
        </div>
      </div>
    </div>
  );
};
