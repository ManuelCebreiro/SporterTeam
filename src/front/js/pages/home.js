import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const ciudades = store.ciudades;
  const eventos = store.eventosFilter;
  const evento = store.eventos;
  const [event, setEvent] = useState({
    payment: null,
    space: null,
    duration: 0,
    agemin: 0,
    agemax: 200,
    date: "",
    sport: "",
    localizacion: "",
  });

  return (
    <div className="container py-5">
      <div className="row d-flex justify-content-center ">
        <div className="col-5">
          <div class="form-check form-switch">
            <select
              class="form-select"
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
              <option selected disabled value="">
                payment
              </option>
              <option>Si</option>
              <option>No</option>
              <option>cualquiera</option>
            </select>
          </div>
          <div class="form-check form-switch">
            <select
              class="form-select"
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
              <option selected disabled value="">
                space
              </option>
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
          <label class="form-check-label px-1" for="flexSwitchCheckDefault">
            MinDuration
          </label>
        </div>

        <div className="col-5">
          <input
            type="number"
            min="0"
            max="150"
            onChange={(e) => {
              setEvent({ ...event, agemin: e.target.value });
            }}
          ></input>
          <label class="form-check-label px-1" for="flexSwitchCheckDefault">
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
          <label class="form-check-label px-1" for="flexSwitchCheckDefault">
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
          <select
            class="form-select"
            id="validationCustom04"
            onChange={(e) => {
              setEvent({ ...event, sport: e.target.value });
            }}
          >
            <option selected disabled value="">
              sport
            </option>
            <option>Baloncesto</option>
            <option>Futbol</option>
            <option>Padel</option>
            <option>Tenis</option>
            <option>cualquiera</option>;
          </select>
          <button
            onClick={() => {
              actions.filterEvent(event);
            }}
          >
            filter
          </button>
          <select
            class="form-select"
            id="validationCustom04"
            onChange={(e) => {
              setEvent({ ...event, sport: e.target.value });
            }}
          >
            <option selected disabled value="">
              localizacion
            </option>
            {ciudades.map((localizacion) => {
              return <option>{localizacion}</option>;
            })}
          </select>
        </div>
      </div>
      <div class="table-responsive">
        <table class="text-center table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">sport</th>
              <th scope="col">date</th>
              <th scope="col">duration</th>
              <th scope="col">agemin</th>
              <th scope="col">agemax</th>
              <th scope="col">payment</th>
              <th scope="col">space</th>
              <th scope="col">localizacion</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((event, index) => {
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
                  <td>{event.localization}</td>
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
