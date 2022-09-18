import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { RechazarJugador } from "./rechazarJugadorpendiente";

export const JugadorespendientesEvento = ({ idevento }) => {
  const { store, actions } = useContext(Context);
  console.log(idevento);
  useEffect(() => {
    actions.getusersPendientes(idevento);
  }, []);

  const jugadoresPendientes = store.usuariospendientes;

  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Jugadores Pendientes</th>
        </tr>
      </thead>
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
