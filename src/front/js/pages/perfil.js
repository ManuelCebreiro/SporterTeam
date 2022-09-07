import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import { Photoperfil } from "./perfil/photoperfil";

export const Perfil = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <h1>Perfil sin hacer</h1>
      <Photoperfil />
    </div>
  );
};
