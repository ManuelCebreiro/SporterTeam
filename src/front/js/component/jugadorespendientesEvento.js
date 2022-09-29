import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { RechazarJugador } from "./rechazarJugadorpendiente";

export const JugadorespendientesEvento = ({ idevento }) => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getusersPendientes(idevento);
  }, []);

  const jugadoresPendientes = store.usuariospendientes;
  return (
    <div className="col-lg-4">
      <h1 className="text-white text-center" scope="col">
        Peticiones
      </h1>

      <div className="bg-white rounded p-1">
        {Array.from(jugadoresPendientes).map((element, index) => (
          <div className="row border border-1 mx-2" key={index} id="tabla">
            <div className="col-lg-4 text-center">{element.username}</div>
            <div className="col-lg-4 text-center px-0 ">
              <button
                className="custom-btnn "
                onClick={() => {
                  actions.joinEvent(idevento, element.id);
                }}
              >
                Aceptar
              </button>
            </div>
            <div className="col-lg-4 text-center px-0">
              <RechazarJugador idevento={idevento} idusuario={element.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
