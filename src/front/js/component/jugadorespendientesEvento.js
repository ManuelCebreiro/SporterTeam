import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const JugadorespendientesEvento = ({ idevento }) => {
  const { store, actions } = useContext(Context);
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};
