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
    <div className="foto de usuario">
      <h2 className="display-5">PERFIL USUARIO</h2>
      {/* <form onSubmit={upLoadImage}> */}
      <div className="row">
        <img src={store.imagen} style={{ width: 200 }}
          className="rounded-circle" />
        <button onClick={deleteImage} className="btn-close "></button>
        <p>
          <strong>{store.respuesta}</strong>
        </p>
        <input
          type="file"
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
