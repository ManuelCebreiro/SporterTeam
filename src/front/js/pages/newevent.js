import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/newevent.css";
import { nominalTypeHack } from "prop-types";
import swal from "sweetalert";

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

  const cities = store.ciudades;
  const [eventazo, setEventazo] = useState([]);

  return (
    <div>
      <h1>Crear evento</h1>
      <div className="container py-5 bg-light border border-dark">
        <div className="row">
          <div className="col-md-2">
            <label className="form-label">Deporte</label>
            <select
              className="form-select"
              // value={event.sport}
              onChange={(e) => {
                setEvent({ ...event, sport: e.target.value });
              }}
            >
              <option selected disabled>
                Elige
              </option>

              <option>Baloncesto</option>
              <option>Fútbol</option>
              <option>Tenis</option>
              <option>Padel</option>
            </select>{" "}
          </div>
          <div className="col-md-2">
            <label className="form-label">Fecha</label>
            <input
              type="date"
              className="form-control"
              min="2022-08-27"
              max="2030-12-31"
              placeholder="Fecha"
              required
              value={event.date}
              onChange={(e) => {
                setEvent({ ...event, date: e.target.value });
              }}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Duracion evento</label>
            <input
              type="number"
              className="form-control"
              placeholder="Duracion evento"
              value={event.duration}
              onChange={(e) => {
                setEvent({ ...event, duration: e.target.value });
              }}
              required
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Participantes</label>
            <input
              type="number"
              className="form-control"
              placeholder="Participantes"
              required
              value={event.participantmax}
              onChange={(e) => {
                setEvent({ ...event, participantmax: e.target.value });
                console.log({ participantmax: e.target.value });
              }}
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="validationCustom04" className="form-label">
              Ciudad
            </label>
            <select
              className="form-select"
              value={event.ciudad}
              onChange={(e) => {
                setEvent({ ...event, ciudad: e.target.value });
                console.log({ ...event, ciudad: e.target.value });
              }}
            >
              <option>Elige ciudad</option>
              {cities.map((texto, index) => {
                return <option key={index}>{texto.ciudad}</option>;
              })}
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">Opción de pago</label>
            <input
              type="number"
              className="form-control"
              placeholder="Cantidad"
              value={event.payment}
              onChange={(e) => {
                setEvent({ ...event, payment: e.target.value });
              }}
              required
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Edad mínima</label>
            <input
              type="number"
              min="0"
              max="150"
              className="form-control"
              placeholder="Edad mínima"
              value={event.agemin}
              onChange={(e) => {
                setEvent({ ...event, agemin: e.target.value });
              }}
              required
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Edad máxima</label>
            <input
              type="number"
              className="form-control"
              placeholder="Edad máxima"
              min="0"
              max="150"
              value={event.agemax}
              onChange={(e) => {
                console.log(typeof Number(e.target.value));
                setEvent({ ...event, agemax: e.target.value });
              }}
              required
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Tipo de lugar</label>

            <select
              className="form-select"
              // value={event.space ? "cubierto" : "airelibre"}
              onChange={(e) => {
                if (e.target.value == "Cubierto") {
                  setEvent({ ...event, space: true });
                } else {
                  setEvent({ ...event, space: false });
                }
              }}
            >
              <option selected disabled>
                Elige
              </option>
              <option>Cubierto</option>
              <option>Aire libre</option>
            </select>
          </div>
          <div className="form-group">
            <label className="my-3">Descripción</label>
            <textarea
              className="form-control"
              rows="3"
              value={event.description}
              placeholder="Descripción"
              onChange={(e) => {
                setEvent({ ...event, description: e.target.value });
              }}
            ></textarea>
          </div>
          <div className="col-12 mt-3">
            <button
              className="btn btn-primary"
              type="submit"
              onClick={() => {
                if (
                  event.description != "" &&
                  Number(event.participantmax) >= 2 &&
                  Number(event.participantmax) < 50 &&
                  event.sport.length != "" &&
                  event.date != "" &&
                  Number(event.agemax) < 200 &&
                  Number(event.agemin) > 0 &&
                  Number(event.duration) > 0 &&
                  event.space != null &&
                  event.ciudad != ""
                ) {
                  // if (event.description != "" && Number(event.participantmax) >= 2&& Number(event.participantmax) < 30 && event.sport != "" && event.date != "" && Number(event.agemax) < 200 && Number(event.agemin) > 0 && Number(event.duration) >= 0 && Number(event.duration) > 400 && event.space != null) {

                  console.log(event);
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
                    ciudad: "",
                  });
                } else
                  swal(
                    "Ups, hubo un problema!",
                    "te faltan campos por rellenar..",
                    "error",
                    {
                      dangerMode: true,
                    }
                  );
              }}
            >
              Crear
            </button>
          </div>
          <ul>
            <div className="container">
              <div className="table-responsive">
                <table className="text-center table table-striped table-hover">
                  {eventazo.length > 0 ? (
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
                    </thead>
                  ) : undefined}
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
                          <td>{event.space ? "Cubierto" : "Aire libre"}</td>
                          <td></td>
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
