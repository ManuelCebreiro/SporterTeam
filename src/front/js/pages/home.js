import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { DatosEventoUnico } from "../component/datoseventounico";

import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const eventos = store.eventosFilter;
  const ciudad = store.ciudades;
  useEffect(() => {
    actions.getEventos();
  }, []);

  const [event, setEvent] = useState({
    payment: null,
    space: null,
    duration: 0,
    agemin: 0,
    agemax: 200,
    date: "",
    sport: "",
    ciudad: "",
  });

  return (
    <div className="container py-5">
      <div className="row d-flex justify-content-center ">
        <div className="col-5">
          <div className="form-check form-switch">
            <h5>Payment</h5>
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
          <div className="form-check form-switch">
            <h5>Space</h5>
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
          <input
            type="number"
            min="0"
            max="600"
            onChange={(e) => {
              setEvent({ ...event, duration: e.target.value });
            }}
          ></input>
          <label
            className="form-check-label px-1"
            htmlFor="flexSwitchCheckDefault"
          >
            MinDuration
          </label>
        </div>

        <div className="col-5">
          <input
            type="number"
            min="0"
            max="150"
            onChange={(e) => {
              console.log(typeof e.target.value);
              setEvent({ ...event, agemin: e.target.value });
            }}
          ></input>
          <label
            className="form-check-label px-1"
            htmlFor="flexSwitchCheckDefault"
          >
            agemin
          </label>
          <input
            type="number"
            min="0"
            max="150"
            onChange={(e) => {
              setEvent({ ...event, agemax: e.target.value });
            }}
          ></input>
          <label
            className="form-check-label px-1"
            htmlFor="flexSwitchCheckDefault"
          >
            agemax
          </label>
          <input
            onChange={(e) => {
              setEvent({ ...event, date: e.target.value });
            }}
            type="date"
            id="start"
            name="trip-start"
            min="2022-08-27"
            max="2030-12-31"
          ></input>
          <h5>Sport</h5>
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
          <h5>Ciudad</h5>
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
          <button
            onClick={() => {
              actions.filterEvent(event);
            }}
          >
            filter
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="text-center table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Sport</th>
              <th scope="col">Date</th>
              <th scope="col">Duration</th>
              <th scope="col">Agemin</th>
              <th scope="col">Agemax</th>
              <th scope="col">Ciudad</th>
              <th scope="col">Payment</th>
              <th scope="col">Space</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((event, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index}</th>
                  <td>{event.sport}</td>
                  <td>{event.date}</td>
                  <td>{event.duration}</td>
                  <td>{event.agemin}</td>
                  <td>{event.ciudad}</td>
                  <td>{event.agemax}</td>
                  <td>{event.payment + "€"}</td>
                  <td>{event.space ? "cubierto" : "airelibre"}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        actions.joinEvent(event.id);
                      }}
                    >
                      Unirse
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
