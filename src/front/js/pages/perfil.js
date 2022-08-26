import React, { useState, useEffect, useContext } from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Perfil = () => {
  const { store, actions } = useContext(Context);
  const [files, setFiles] = useState(null);

  const upLoadImage = (evt) => {
    evt.preventDefault();
    console.log("Aqui estan los archivos", files);
    let body = new FormData();
    body.append("profile_image", files[0])
    const options = {
      body,
      method: "POST",
      headers: {
        // "Content-Type": "application/file",
        // Accept: "application/json",
        "Authorization": "Bearer " + store.token		//PROPIO DE JWT, COMO PIDES EL TOKEN
      },
    }
    fetch(process.env.BACKEND_URL + "/api/upload", options)
      .then(resp => resp.json())
      .then(data => console.log("CORREEECTO!!", data))
      .catch(error => console.error("ERRROOOOOOORR", error))
  };

  return (
    <div className="jumbotron">
      <h1>FOTO PERFIL</h1>
      <form onSubmit={upLoadImage}>
        <input type="file" onChange={(e) => setFiles(e.target.files)} />
        <button>Upload</button>
      </form>
    </div>
  );
};

// Perfil.PropTypes = {
//   match: PropTypes.object
// };
