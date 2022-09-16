import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const DatosEventoUnico = ({ id }) => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <Link
        to={`/Detalles_Evento/${id}`}
        onClick={() => {
          actions.look_event(id);
        }}
      >
        <button className="btn btn-info btn-sm p-0 border">Mas datos</button>
      </Link>
    </div>
  );
};
