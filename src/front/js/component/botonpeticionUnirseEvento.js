import React, { useContext, useEffect, useState } from "react";

import { Context } from "../store/appContext";

export const PeticionUnion = ({ idevento }) => {
  const { store, actions } = useContext(Context);
  const userid = sessionStorage.getItem("userid");
  const [estado, setEstado] = useState("");
  useEffect(() => {
    actions.geteventosPendientes(userid);
    actions.getUserDataEventos();
  }, []);

  const eventosPendientes = store.eventosPendientes;
  const eventos = store.userDataEventos;
  const eventosfiltrados = Array.from(eventos).filter(
    (element) => element.id == idevento
  );
  const eventosPendientesfiltrados = Array.from(eventosPendientes).filter(
    (element) => element.id == idevento
  );
  if (eventosPendientesfiltrados.length || estado == "Pendiente") {
    return (
      <div>
        <button className="btn btn-warning btn-sm  border" disabled={true}>
          Pendiente
        </button>
      </div>
    );
  } else if (eventosfiltrados.length) {
    return (
      <div>
        <button className="btn btn-success btn-sm  border" disabled={true}>
          Miembro
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button
          id="btnPeticionUnirseEvento"
          className="btn bg-info btn-sm  border"
          onClick={() => {
            actions.peticionUnion(userid, idevento);
            setEstado("Pendiente");
          }}
        >
          Peticion
        </button>
      </div>
    );
  }
};
