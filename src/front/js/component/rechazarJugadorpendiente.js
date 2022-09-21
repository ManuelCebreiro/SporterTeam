import React, { useContext } from "react";

import { Context } from "../store/appContext";

export const RechazarJugador = ({ idevento, idusuario }) => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <button
        className="custom-btn "
        onClick={() => {
          actions.denegarpeticion(idusuario, idevento);
        }}
      >
        <span>Reachazar</span>
      </button>
    </div>
  );
};
