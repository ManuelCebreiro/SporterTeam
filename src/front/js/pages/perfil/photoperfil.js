import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import "/workspace/SporterTeam/src/front/styles/photoperfil.css";
// import cloudinary from "cloudinary/lib/cloudinary";

export const Photoperfil = (props) => {
  const { store, actions } = useContext(Context);
  const [respuesta, setRespuesta] = useState("");

  const upLoadImage = (evt) => {
    evt.preventDefault();
    //usaremos esto para enviarlo al BACKEND
    let body = new FormData();
    body.append("profile_image", evt.target.files[0]);
    const options = {
      body,
      method: "POST",
      headers: {
        Authorization: "Bearer " + store.token,
      },
    };
    fetch(process.env.BACKEND_URL + "/api/upload", options)
      .then((resp) => resp.json())
      .then((data) => actions.LoadImage(data));
    actions
      .getrespuesta("")
      .catch((error) => console.error("ERRORRRR!!!", error));
  };

  const deleteImage = () => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + store.token,
      },
    };
    fetch(process.env.BACKEND_URL + "/api/upload", options)
      .then((resp) => resp.json())
      .then((data) => actions.LoadImage(data))
      .catch((error) => console.error("ERRORRRR!!!", error));

    actions.getrespuesta("Esta es la imagen predefinida.");
  };
  return (
    <div id="fotoEditUser" className="fotodeusuario">
      {/* <form onSubmit={upLoadImage}> */}
      <div className="row px-1 mx-1 my-3 mb-0 ">
        <img
          className="rounded-circle img-fluid"
          src={store.imagen}
          style={{ width: 250 }}
        />
        <button
          onClick={deleteImage}
          className="btn-close btn-close-white"
        ></button>
        <p t>
          <strong>{store.respuesta}</strong>
        </p>
        <input
          type="file"
          className="border-0"
          onChange={(e) => {
            upLoadImage(e);
          }}
        />
      </div>
      {/* <button onClick={(e) => { upLoadImage(e) }}>Cargar</button> */}
      {/* <button >Poner de perfil</button> */}
      {/* </form> */}
    </div>
  );
};
