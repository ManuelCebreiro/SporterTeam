import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/newevent.css";
import { nominalTypeHack } from "prop-types";

export const Newevent = () => {
  const { store, actions } = useContext(Context);
  const [event, setEvent] = useState({
    payment: "",
    space: null,
    duration: "",
    agemin: "",
    agemax: "",
    date: "",
    sport: "",
    description: "",
    participantmax: "",
    ciudad: "",
  });

  const cities = store.ciudades
  const [eventazo, setEventazo] = useState([]);

  return (
    <div>
      <h1>Crear evento</h1>
      <div class="container py-5 bg-light border border-dark">
        <div class="row">
          <div class="col-md-2">
            <label class="form-label">Deporte</label>
            <select class="form-select"
              value={event.sport}
              onChange={(e) => {
                setEvent({ ...event, sport: e.target.value });
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
              value={event.date}
              onChange={(e) => {
                setEvent({ ...event, date: e.target.value });
              }} />
          </div>
          <div class="col-md-2">
            <label class="form-label">Duracion evento</label>
            <input type="number" class="form-control" placeholder="Duracion evento"
              value={event.duration}
              onChange={(e) => {
                setEvent({ ...event, duration: e.target.value });
              }}
              required />
          </div>
          <div class="col-md-2">
            <label class="form-label">Participantes</label>
            <input type="number" class="form-control" placeholder="Participantes" required
              value={event.participantmax}
              onChange={(e) => {
                setEvent({ ...event, participantmax: e.target.value });
                console.log({ participantmax: e.target.value })
              }} />
          </div>

          <div class="col-md-2">
            <label for="validationCustom04" class="form-label">Ciudad</label>
            <select class="form-select"
              value={event.ciudad}
              onChange={(e) => {
                setEvent({ ...event, ciudad: e.target.value });
                console.log({ ...event, ciudad: e.target.value })
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
              value={event.payment}
              onChange={(e) => {
                setEvent({ ...event, payment: e.target.value });
              }} required />
          </div>
          <div class="col-md-2">
            <label class="form-label">Edad mínima</label>
            <input type="number" min="0" max="150" class="form-control" placeholder="Edad mínima"
              value={event.agemin}
              onChange={(e) => {
                setEvent({ ...event, agemin: e.target.value });
              }} required />
          </div>
          <div class="col-md-2">
            <label class="form-label">Edad máxima</label>
            <input type="number" class="form-control" placeholder="Edad máxima"
              min="0"
              max="150"
              value={event.agemax}
              onChange={(e) => {
                console.log(typeof (Number(e.target.value)))
                setEvent({ ...event, agemax: e.target.value });
              }}
              required />
          </div>
          <div class="col-md-2">
            <label class="form-label">Tipo de lugar</label>

            <select class="form-select"
              value={event.space}
              onChange={(e) => {
                if (e.target.value == "Cubierto") {
                  setEvent({ ...event, space: true });
                } else if (e.target.value == "Aire libre") {
                  setEvent({ ...event, space: false });

                }
              }}
            >
              <option selected disabled>Elige</option>
              <option>Cubierto</option>
              <option>Aire libre</option>
            </select>
          </div>
          <div class="form-group">
            <label class="my-3">Descripción</label>
            <textarea class="form-control" rows="3"
              value={event.description}
              onChange={(e) => {
                setEvent({ ...event, description: e.target.value });
              }}></textarea>
          </div>
          <div class="col-12 mt-3">
            <button class="btn btn-primary" type="submit"
              onClick={() => {
                if (event.description != "" && Number(event.participantmax) >= 2 && Number(event.participantmax) < 30 && event.sport.length != "" && event.date != "" && Number(event.agemax) < 200 && Number(event.agemin) > 0 && Number(event.duration) > 0 && event.space != null && event.ciudad != "") {
                  // if (event.description != "" && Number(event.participantmax) >= 2&& Number(event.participantmax) < 30 && event.sport != "" && event.date != "" && Number(event.agemax) < 200 && Number(event.agemin) > 0 && Number(event.duration) >= 0 && Number(event.duration) > 400 && event.space != null) {

                  console.log(event)
                  actions.crearevento(event);
                  setEventazo([...eventazo, event]);
                  setEvent({
                    payment: "",
                    space: "",
                    duration: "",
                    agemin: "",
                    agemax: "",
                    date: "",
                    sport: "",
                    description: "",
                    participantmax: "",
                    ciudad: ""
                  })
                } else alert("Te faltan campos por cubrir.")
              }}
            >Crear</button>
          </div>
          <ul>
            <div class="container">
              <div class="table-responsive">
                <table class="text-center table table-striped table-hover">
                  {eventazo.length > 0 ?
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Deporte</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Duracion</th>
                        <th scope="col">Edad mínima</th>
                        <th scope="col">Edad máxima</th>
                        <th scope="col">Ciudad</th>
                        <th scope="col">Pago</th>
                        <th scope="col">Espacio</th>
                      </tr>
                    </thead> : undefined}
                  <tbody>
                    {eventazo.map((event, index) => {

                      return (
                        <tr>
                          <th key={index} scope="row">
                            {index}
                          </th>
                          <td>{event.sport}</td>
                          <td>{event.date}</td>
                          <td>{event.duration + " min."}</td>
                          <td>{event.agemin + " años."}</td>
                          <td>{event.agemax + " años."}</td>
                          <td>{event.ciudad}</td>
                          <td>{event.payment + "€"}</td>
                          <td>{event.space ? "cubierto" : "airelibre"}</td>
                          <td>

                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </ul>
        </div>
      </div>


    </div >

  );
};

