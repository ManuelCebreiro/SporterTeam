import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/newevent.css";
import { nominalTypeHack } from "prop-types";
import swal from "sweetalert";

export const Newevent = () => {
  let date = new Date();
  let output = String(
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    date.getDate()
  ).padStart(2, "0");
  // console.log(output);

  const validarMayorQue = (numeroaValidar, condicion, texto) => {
    if (Number(numeroaValidar) >= condicion) {
      return true;
    } else {
      swal("¡Ups, hubo un problema!", texto, "error", {
        dangerMode: true,
      });
      return false;
    }
  };
  const validarMenorQue = (numeroaValidar, condicion, texto) => {
    if (Number(numeroaValidar) <= condicion) {
      return true;
    } else {
      swal("¡Ups, hubo un problema!", texto, "error", {
        dangerMode: true,
      });
      return false;
    }
  };
  const validarCampoVacio = (campoAValidar, condicion, texto) => {
    if (campoAValidar != condicion) {
      return true;
    } else {
      swal("¡Ups, hubo un problema!", texto, "error", {
        dangerMode: true,
      });
      return false;
    }
  };

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
    <div className="fondonewevent">
      <div className="row mb-5"></div>
      <div
        id="estilofondofiltros"
        className="container py-3 px-5 border border-dark"
      >
        <div
          id="estilotitulonewevento"
          className="row text-center text-white font-monospace"
        >
          <h1>Crear Pachanga</h1>
        </div>
        <div className="row">
          <div className="row">
            <div className="col-lg-3 text-center my-1">
              <div className="row my-1">
                <h5 className="text-white">Deporte</h5>
              </div>
              <select
                className="form-select"
                value={event.sport}
                onChange={(e) => {
                  setEvent({ ...event, sport: e.target.value });
                }}
              >
                <option>Elige</option>

                <option>Baloncesto</option>
                <option>Fútbol</option>
                <option>Tenis</option>
                <option>Padel</option>
              </select>{" "}
            </div>
            <div className="col-lg-3 text-center my-1">
              <div className="row my-1">
                <h5 className="text-white">Fecha</h5>
              </div>
              <input
                type="date"
                className="form-control"
                min={output}
                max="2030-12-31"
                placeholder="Fecha"
                required
                value={event.date}
                onChange={(e) => {
                  setEvent({ ...event, date: e.target.value });
                  console.log(event.date);
                }}
              />
            </div>
            <div className="col-lg-3 text-center my-1">
              <div className="row my-1">
                <h5 className="text-white">Duración</h5>
              </div>
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
            <div className="col-lg-3 text-center my-1">
              <div className="row my-1">
                <h5 className="text-white">Participantes</h5>
              </div>
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
          </div>
          <div className="row">
            <div className="col-lg-3 text-center my-1">
              <div className="row my-1">
                <h5 className="text-white">Ciudad</h5>
              </div>
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
            <div className="col-lg-3 text-center my-1">
              <div className="row my-1">
                <h5 className="text-white">Pago</h5>
              </div>
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
            <div className="col-lg-3  text-center px-1 my-2">
              <div className="row py-2">
                <div className="col-lg-6 col-md-6 col-sm-6 text-center">
                  <label className="form-label text-white">Edad mínima</label>

                  <input
                    type="number"
                    min="0"
                    max="150"
                    className="border-3 rounded-pill text-center text-dark"
                    style={{ width: 100 }}
                    placeholder="Mín. 18"
                    value={event.agemin}
                    onChange={(e) => {
                      setEvent({ ...event, agemin: e.target.value });
                    }}
                    required
                  />
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6 text-center">
                  <label className="form-label text-white">Edad máxima</label>
                  <input
                    type="number"
                    className="border-3 rounded-pill text-center text-dark"
                    style={{ width: 100 }}
                    placeholder="Máx.100"
                    min="0"
                    max="100"
                    value={event.agemax}
                    onChange={(e) => {
                      console.log(typeof Number(e.target.value));
                      setEvent({ ...event, agemax: e.target.value });
                    }}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-3 text-center my-1">
              <div className="row my-1">
                <h5 className="text-white">Tipo de lugar</h5>
              </div>

              <select
                className="form-select"
                // defaultValue="Elige"
                value={
                  event.space == null
                    ? "Elige"
                    : event.space
                      ? "Cubierto"
                      : "Aire libre"
                }
                onChange={(e) => {
                  console.log(e.target.value);
                  if (e.target.value == "Cubierto") {
                    setEvent({ ...event, space: true });
                  } else if (e.target.value == "Aire libre") {
                    setEvent({ ...event, space: false });
                  } else {
                    setEvent({ ...event, space: null });
                  }
                }}
              >
                <option>Elige</option>
                <option>Cubierto</option>
                <option>Aire libre</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-6">
              <div className="row my-1">
                <h5 className="text-white">Descripción</h5>
              </div>
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
          </div>
          <div className="row justify-content-center mt-3">
            <button
              className="btn"
              id="btncrearevento"
              type="submit"
              onClick={() => {
                if (
                  validarCampoVacio(
                    event.sport.length,
                    "",
                    "Debes escoger un deporte"
                  ) &&
                  validarCampoVacio(
                    event.sport.length,
                    "Elige",
                    "Debes escoger un deporte"
                  ) &&
                  validarMayorQue(
                    event.duration,
                    30,
                    "La duración mínima debe ser mayor o igual a 30 minutos, y has puesto " +
                    `${event.duration}`
                  ) &&
                  validarMayorQue(
                    event.agemin,
                    18,
                    "La edad puesta es " +
                    `${event.agemin}` +
                    " y debe tener mínimo 18 años"
                  ) &&
                  validarMenorQue(
                    event.agemax,
                    100,
                    "La edad puesta es " +
                    `${event.agemax}` +
                    " y no debe ser mayor que 100"
                  ) &&
                  validarMayorQue(
                    event.agemax,
                    `${event.agemin}`,
                    "La edad máxima puesta es " +
                    `${event.agemax}` +
                    " y debe ser mayor o igual que la edad mínima que has escogido, que es " +
                    `${event.agemin}`
                  ) &&
                  validarMenorQue(
                    event.participantmax,
                    50,
                    "El campo de participantes debe ser menor que 50"
                  ) &&
                  validarMayorQue(
                    event.participantmax,
                    2,
                    "El campo de participantes debe ser mayor o igual que 2"
                  ) &&
                  validarCampoVacio(event.date, "", "La fecha es incorrecta") &&
                  validarCampoVacio(
                    event.space,
                    null,
                    "Debes escoger un tipo de lugar"
                  ) &&
                  validarCampoVacio(
                    event.space,
                    "Elige",
                    "Debes escoger un tipo de lugar"
                  ) &&
                  validarCampoVacio(
                    event.ciudad,
                    "",
                    "Debes escoger una ciudad"
                  ) &&
                  validarCampoVacio(
                    event.payment,
                    "",
                    "Debes indicar una cantidad, puede ser de 0 €"
                  ) &&
                  validarCampoVacio(
                    event.description,
                    "",
                    "El campo debería contener una breve descripción"
                  )
                ) {
                  console.log(eventazo);
                  actions.crearevento(event);
                  setEventazo([...eventazo, event]);
                  setEvent({
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
                }
              }}
            >
              Crear
            </button>
          </div>
          <ul>
            <div className="container mt-3">
              <div className="table-responsive border-dark">
                <table className="text-center table table-striped table-hover bg-light ">
                  {eventazo.length > 0 ? (
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Deporte</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Duracion</th>
                        <th scope="col">Edad mínima</th>
                        <th scope="col">Edad máxima</th>
                        <th scope="col">Participantes</th>
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
                            {index + 1}
                          </th>
                          <td>{event.sport}</td>
                          <td>{event.date}</td>
                          <td>{event.duration + " min."}</td>
                          <td>{event.agemin + " años."}</td>
                          <td>{event.agemax + " años."}</td>
                          <td>{event.participantmax + " participantes."}</td>
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
