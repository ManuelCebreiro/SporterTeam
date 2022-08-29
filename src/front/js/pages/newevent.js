import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/newevent.css";
import { nominalTypeHack } from "prop-types";

export const Newevent = () => {
  const { store, actions } = useContext(Context);
  const [event, setEvent] = useState({
    payment: 0,
    space: null,
    duration: 0,
    agemin: 0,
    agemax: 200,
    date: "",
    sport: "",
    description: "",
    participantmax: 0
  });
  const [eventazo, setEventazo] = useState([]);

  return (
    <div>
      <h1>Crear evento</h1>
      <div class="container py-5 bg-light border border-dark">
        <div class="row">
          <div class="col-md-2">
            <label class="form-label">Deporte</label>
            <select class="form-select"
              onChange={(e) => {
                setEvent({ ...event, sport: e.target.value });
              }}>
              <option selected disabled

              >Elige</option>
              <option>Baloncesto</option>
              <option>Fútbol</option>
              <option>Tenis</option>
              <option>Padel</option>


            </select>          </div>
          <div class="col-md-2">
            <label class="form-label">Fecha</label>
            <input type="date" class="form-control" min="2022-08-27" max="2030-12-31" placeholder="Fecha" required
              onChange={(e) => {
                setEvent({ ...event, date: e.target.value });
              }} />
          </div>
          <div class="col-md-2">
            <label class="form-label">Duracion evento</label>
            <input type="text" class="form-control" placeholder="Duracion evento"
              onChange={(e) => {
                setEvent({ ...event, duration: e.target.value });
              }}
              required />
          </div>
          <div class="col-md-2">
            <label class="form-label">Participantes</label>
            <input type="text" class="form-control" placeholder="Participantes" required />
          </div>

          <div class="col-md-2">
            <label for="validationCustom04" class="form-label">Ciudad</label>
            <select class="form-select">
              <option selected disabled>Elige...</option>
              <option>...</option>
            </select>
            {/* <div class="invalid-feedback">
              Please select a valid state.
            </div> */}
          </div>
          <div class="col-md-2">
            <label class="form-label">Opción de pago</label>
            <input type="number" class="form-control" placeholder="Cantidad"
              onChange={(e) => {
                setEvent({ ...event, payment: e.target.value });
              }} required />
          </div>
          <div class="col-md-2">
            <label class="form-label">Edad mínima</label>
            <input type="number" min="0" max="150" class="form-control" placeholder="Edad mínima"
              onChange={(e) => {
                setEvent({ ...event, agemin: e.target.value });
              }} required />
          </div>
          <div class="col-md-2">
            <label class="form-label">Edad máxima</label>
            <input type="text" class="form-control" placeholder="Edad máxima"
              min="0"
              max="150"
              onChange={(e) => {
                setEvent({ ...event, agemax: e.target.value });
              }}
              required />
          </div>
          <div class="col-md-2">
            <label class="form-label">Tipo de lugar</label>

            <select class="form-select"
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
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
              onChange={(e) => {
                setEvent({ ...event, description: e.target.value });
              }}></textarea>
          </div>
          <div class="col-12 mt-3">
            <button class="btn btn-primary" type="submit"
              onClick={() => {
                actions.crearevento(event);
                setEventazo([...eventazo, event]);
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
                          <td>{event.duration}</td>
                          <td>{event.agemin}</td>
                          <td>{event.agemax}</td>
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


    </div>

  );
};

