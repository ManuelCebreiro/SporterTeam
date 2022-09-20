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
    <table id="tablajugadorespendientes" className="table">
      <h1 className="text-white pt-2 text-center" scope="col">
        Peticiones
      </h1>

      <tbody>
        {Array.from(jugadoresPendientes).map((element, index) => (
          <tr key={index}>
            <td>{element.username}</td>
            <td>
              <RechazarJugador idevento={idevento} idusuario={element.id} />
            </td>
            <td>
              <button
                className="btn btn-success btn-sm  border"
                onClick={() => {
                  actions.joinEvent(idevento, element.id);
                }}
              >
                Aceptar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
