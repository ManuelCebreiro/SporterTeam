import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const ExpulsarUsuarioEvento = ({
  idevento,
  idusuario,
  buttontext,
  linkverificacion,
}) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div>
      {}
      <button
        className="btn btn-info btn-sm p-0 border"
        onClick={() => {
          actions.expulsarUsuarioEvento(idevento, idusuario);
          if (linkverificacion) navigate("/perfil");
        }}
      >
        {buttontext}
      </button>
    </div>
  );
};
