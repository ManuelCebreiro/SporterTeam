import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import { element } from "prop-types";

export const DetallesEventoAdmin = () => {
  const { store, actions } = useContext(Context);
  const detalles = store.dataEventoUnico;
  const players = store.jugadores;
  const cities = store.ciudades;
  let params = useParams();
  const [details, setDetails] = useState({
    id: detalles.id,
    payment: detalles.payment,
    space: detalles.space,
    duration: detalles.duration,
    agemin: detalles.agemin,
    agemax: detalles.agemax,
    date: detalles.date,
    sport: detalles.sport,
    description: detalles.description,
    participantmax: detalles.participantmax,
    ciudad: detalles.ciudad,
    estadoEvento: detalles.estadoEvento
  });

  useEffect(() => {
    actions.look_event(params.theid);
    actions.get_player_event(params.theid);
    actions.DatosUsuarioLogeado();

  }, []);

  return (
    <div className="container">
      <h1>Editar Evento</h1>
      <div class="container py-5 bg-light border border-dark">
        <div class="row">
          <div class="col-md-2">
            <label class="form-label">Deporte</label>
            <select class="form-select"
              defaultValue={detalles.sport}
              onChange={(e) => {
                setDetails({ ...details, sport: e.target.value });
              }}>
              <option selected disabled

              >{""}</option>
              <option>Baloncesto</option>
              <option>Fútbol</option>
              <option>Tenis</option>
              <option>Padel</option>


            </select>          </div>
          <div class="col-md-2">
            <label class="form-label">Fecha</label>
            <input type="date" class="form-control" min="2022-08-27" max="2030-12-31" placeholder="Fecha" required
              defaultValue={detalles.date}
              onChange={(e) => {
                setDetails({ ...details, date: e.target.value });
              }} />
          </div>
          <div class="col-md-2">
            <label class="form-label">Duracion evento</label>
            <input type="number" class="form-control" placeholder="Duracion evento"
              defaultValue={detalles.duration}
              onChange={(e) => {
                setDetails({ ...details, duration: e.target.value });
              }}
              required />
          </div>
          <div class="col-md-2">
            <label class="form-label">Participantes</label>
            <input type="number" class="form-control" placeholder="Participantes" required
              defaultValue={detalles.participantmax}
              onChange={(e) => {
                setDetails({ ...details, participantmax: e.target.value });
              }} />
          </div>

          <div class="col-md-2">
            <label for="validationCustom04" class="form-label">Ciudad</label>
            <select class="form-select"
              defaultValue={detalles.ciudad}
              onChange={(e) => {
                setDetails({ ...details, ciudad: e.target.value });
              }}

            >
              <option>Elige ciudad</option>
              {cities.map((texto, index) => {
                return (
                  <option
                    key={index}
                  >
                    {texto.ciudad}
                  </option>

                )
              }
              )}

            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label">Opción de pago</label>
            <input type="number" class="form-control" placeholder="Cantidad"
              defaultValue={detalles.payment}
              onChange={(e) => {
                setDetails({ ...details, payment: e.target.value });
              }} required />
          </div>
          <div class="col-md-2">
            <label class="form-label">Edad mínima</label>
            <input type="number" min="0" max="150" class="form-control" placeholder="Edad mínima"
              defaultValue={detalles.agemin}
              onChange={(e) => {
                setDetails({ ...details, agemin: e.target.value });
              }} required />
          </div>
          <div class="col-md-2">
            <label class="form-label">Edad máxima</label>
            <input type="number" class="form-control" placeholder="Edad máxima"
              min="0"
              max="150"
              defaultValue={detalles.agemax}
              onChange={(e) => {
                console.log(typeof (Number(e.target.value)))
                setDetails({ ...details, agemax: e.target.value });
              }}
              required />
          </div>
          <div class="col-md-2">
            <label class="form-label">Tipo de lugar</label>

            <select class="form-select"
              defaultValue={detalles.space}

              // value={event.space ? "cubierto" : "airelibre"}
              onChange={(e) => {
                if (e.target.value == "Cubierto") {
                  setDetails({ ...details, space: true });
                } else {
                  setDetails({ ...details, space: false });

                }
              }}
            >
              <option selected disabled>Elige</option>
              <option>Cubierto</option>
              <option>Aire libre</option>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label">Estado evento</label>

            <select class="form-select"
              defaultValue={detalles.estadoEvento}
              onChange={(e) => {
                setDetails({ ...details, estadoEvento: e.target.value });
              }
              }
            >
              <option selected disabled>Elige</option>
              <option>Abierto</option>
              <option>Cerrado</option>
              <option>Finalizado</option>
              <option>Cancelado</option>
            </select>
          </div>
          <div class="form-group">
            <label class="my-3">Descripción</label>
            <textarea class="form-control" rows="3"
              defaultValue={detalles.description}
              onChange={(e) => {
                setDetails({ ...details, description: e.target.value });
              }}></textarea>
          </div>

          <div class="col-12 mt-3">

            <button class="btn btn-primary" type="submit">Modificar</button>
          </div>

        </div>
      </div>


    </div >
  );
};
