import React, { useContext } from "react";

import { Context } from "../store/appContext";

export const RechazarJugador = ({ idevento, idusuario }) => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <button
        className="btn btn-warning btn-sm  border"
        onClick={() => {
          actions.denegarpeticion(idusuario, idevento);
        }}
      >
        Rechazar
      </button>
    </div>
  );
};
