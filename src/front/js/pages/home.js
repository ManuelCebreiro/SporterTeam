import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { PeticionUnion } from "../component/botonpeticionUnirseEvento";

import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const todosloseventos = store.eventosFilter;
  const eventos = Array.from(todosloseventos).filter(
    (element) => element.estadoEvento !== "Finalizado"
  );
  const ciudad = store.ciudades;
  useEffect(() => {
    actions.getEventos();
  }, []);

  const [event, setEvent] = useState({
    payment: null,
    space: null,
    duration: 0,
    participantmax: 0,
    agemin: 0,
    agemax: 200,
    date: "",
    sport: "",
    ciudad: "",
  });
  for (let i = 0; i < todosloseventos.length; i++) {
    actions.eventoFinalizado(todosloseventos[i]);
  }
  useEffect(() => {
    actions.getEventos();
  }, []);
  return (
    <div className="container-fluid" id="estilofondohome">
      <div className="container py-5">
        <div
          className="row d-flex justify-content-center border border-dark p-3"
          id="estilofondofiltros"
        >
          <div
            id="estilotitulonewevento"
            className="row text-center text-white font-monospace"
          >
            <h1>Pachangas</h1>
          </div>
          <div className="row">
            <div className="col-lg-3 text-center my-1">
              <div className="row my-1">
                <h5 className="text-white">Deporte</h5>
              </div>
              <div className="row mx-1">
                <select
                  className="form-select"
                  id="validationCustom04"
                  onChange={(e) => {
                    setEvent({ ...event, sport: e.target.value });
                  }}
                >
                  <option>Baloncesto</option>
                  <option>Fútbol</option>
                  <option>Padel</option>
                  <option>Tenis</option>
                  <option>cualquiera</option>;
                </select>
              </div>
            </div>
            <div className="col-lg-3 text-center my-1">
              <div className="row my-1">
                <h5 className="text-white">Fecha</h5>
              </div>
              <input
                className="form-control"
                onChange={(e) => {
                  setEvent({ ...event, date: e.target.value });
                }}
                type="date"
                id="start"
                name="trip-start"
                min="2022-08-27"
                max="2030-12-31"
              ></input>
            </div>
            <div className="col-lg-3 text-center my-1">
              <div className="row my-1">
                <h5 className="text-white">Duración</h5>
              </div>
              <input
                className="form-control"
                placeholder="Duracion evento"
                type="number"
                min="0"
                max="600"
                onChange={(e) => {
                  setEvent({ ...event, duration: e.target.value });
                }}
              ></input>
            </div>

            <div className="col-lg-3 text-center my-1">
              <div className="row my-1">
                <h5 className="text-white">Participantes</h5>
              </div>
              <input
                type="number"
                className="form-control"
                placeholder="Participantes mínimos"
                required
                onChange={(e) => {
                  setEvent({ ...event, participantmax: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 text-center my-1">
              <div className="row my-1">
                <h5 className="text-white">Ciudad</h5>
              </div>
              <div className="row mx-1">
                <select
                  defaultValue="Cualquiera"
                  className="form-select"
                  id="validationCustom04"
                  onChange={(e) => {
                    setEvent({ ...event, ciudad: e.target.value });
                  }}
                >
                  <option>Cualquiera</option>
                  {ciudad.map((element, index) => {
                    return <option key={index}>{element.ciudad}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="col-lg-3 text-center my-1">
              <div className="row my-1">
                <h5 className="text-white">Pago</h5>
              </div>
              <div className="row mx-1">
                <select
                  defaultValue="cualquiera"
                  className="form-select"
                  id="validationCustom04"
                  onChange={(e) => {
                    if (e.target.value == "Si") {
                      setEvent({ ...event, payment: true });
                    } else if (e.target.value == "No") {
                      setEvent({ ...event, payment: false });
                    } else {
                      setEvent({ ...event, payment: null });
                    }
                  }}
                >
                  <option>Si</option>
                  <option>No</option>
                  <option>cualquiera</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3  text-center px-1 my-2">
              <div className="row py-2">
                <div className="col-lg-6 col-md-6 col-sm-6 text-center ">
                  <label
                    className="form-check-label px-1 text-white my-1"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    Edad mínima.
                  </label>
                  <input
                    className="rounded-pill text-center text-dark"
                    style={{ width: 100 }}
                    placeholder="Mín. 18"
                    type="number"
                    min="0"
                    max="150"
                    onChange={(e) => {
                      console.log(typeof e.target.value);
                      setEvent({ ...event, agemin: e.target.value });
                    }}
                  ></input>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 text-center">
                  <label
                    className="form-check-label px-1 text-white my-1"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    Edad máxima.
                  </label>
                  <input
                    className="border-3 rounded-pill text-center text-dark"
                    placeholder="Máx.100"
                    style={{ width: 100 }}
                    type="number"
                    min="0"
                    max="150"
                    onChange={(e) => {
                      setEvent({ ...event, agemax: e.target.value });
                    }}
                  ></input>
                </div>
              </div>
            </div>
            <div className="col-lg-3 text-center my-1">
              <div className="row my-1">
                <h5 className="text-white">Tipo de lugar</h5>
              </div>
              <div className="row mx-1">
                <select
                  defaultValue="cualquiera"
                  className="form-select"
                  id="validationCustom04"
                  onChange={(e) => {
                    if (e.target.value == "Si") {
                      setEvent({ ...event, space: true });
                    } else if (e.target.value == "No") {
                      setEvent({ ...event, space: false });
                    } else {
                      setEvent({ ...event, space: null });
                    }
                  }}
                >
                  <option>Si</option>
                  <option>No</option>
                  <option>cualquiera</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center">
              <button
                type="button"
                id="btnfiltrareventos"
                className="btn border-1 p-2"
                onClick={() => {
                  actions.filterEvent(event);
                }}
              >
                Filtrar pachangas
              </button>
            </div>
          </div>
        </div>

        <div id="eventos-mostrar" className="table-responsive">
          {eventos.length > 0 ? (
            <div class="table-wrapper-scroll-y tablapaginacentral bg-light">
              <table className="text-center table table-striped table-hover mt-2">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Deporte</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Duración</th>
                    <th scope="col">Participantes</th>
                    <th scope="col">Edad min.</th>
                    <th scope="col">Edad max.</th>
                    <th scope="col">Ciudad</th>
                    <th scope="col">Pago</th>
                    <th scope="col">Tipo lugar</th>
                  </tr>
                </thead>
                <tbody>
                  {eventos.map((event, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index}</th>
                        <td>{event.sport}</td>
                        <td>{event.date}</td>
                        <td>
                          {event.duration} {"minutos"}
                        </td>
                        <td>
                          {event.participantmax} {"personas"}
                        </td>
                        <td>
                          {event.agemin} {"años"}
                        </td>
                        <td>
                          {event.agemax} {"años"}
                        </td>
                        <td>{event.ciudad}</td>
                        <td>
                          {event.payment} {"€"}
                        </td>
                        <td>{event.space ? "Cubierto" : "Aire libre"}</td>
                        <td>
                          <PeticionUnion idevento={event.id} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <h4
              id="eventos-mostrar-2"
              className="text-center text-danger bg-light py-5 border-dark"
            >
              No hay pachangas que mostrar
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};
