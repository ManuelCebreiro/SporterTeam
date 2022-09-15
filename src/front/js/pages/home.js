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
  useEffect(() => {
    actions.getEventos();

  }, []);
  return (
    <div className="container py-5">
      <div className="row d-flex justify-content-center border border-dark p-3"
        id="estilofondofiltros"
      >
        <div className="col-lg-3 text-center my-1">
          <div className="row my-1">
            <h5 className="text-white">Sport</h5>
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
            <h5 className="text-white">Payment</h5>
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
        <div className="col-lg-3 text-center my-1">
          <div className="row my-1">
            <h5 className="text-white">Space</h5>
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

        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6 text-center ps-3 pe-1 my-2">
            <label
              className="form-check-label px-1 text-white my-1"
              htmlFor="flexSwitchCheckDefault"
            >
              Duración
            </label>
            <input
              className="border-3 rounded-pill"
              type="number"
              min="0"
              max="600"
              onChange={(e) => {
                setEvent({ ...event, duration: e.target.value });
              }}
            ></input>

          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 text-center px-1 my-2">
            <label
              className="form-check-label px-1 text-white my-1"
              htmlFor="flexSwitchCheckDefault"
            >
              Edad mínima.
            </label>
            <input
              className="border-3 rounded-pill"
              type="number"
              min="0"
              max="150"
              onChange={(e) => {
                console.log(typeof e.target.value);
                setEvent({ ...event, agemin: e.target.value });
              }}
            ></input>


          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 text-center px- my-2">
            <label
              className="form-check-label px-1 text-white my-1"
              htmlFor="flexSwitchCheckDefault"
            >
              Edad máxima.
            </label>
            <input
              className="border-3 rounded-pill"
              type="number"
              min="0"
              max="150"
              onChange={(e) => {
                setEvent({ ...event, agemax: e.target.value });
              }}
            ></input>

          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 text-center px-1 my-2">
            <label
              className="form-check-label px-1 text-white my-1"
              htmlFor="flexSwitchCheckDefault"
            >
              Fecha
            </label>
            <input
              className="border-3 rounded-pill"

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
        </div>
        <div className="row">
          <div className="col-lg-12 text-center">
            <button
              className="border-3 rounded-pill p-2"
              onClick={() => {
                actions.filterEvent(event);
              }}
            >
              Filtrar eventos
            </button>
          </div>
        </div>
      </div>



      <div className="table-responsive">
        <div class="table-wrapper-scroll-y tablapaginacentral">
          <table className="text-center table table-striped table-hover mt-4">
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
                    <td>{event.duration} {"minutos"}</td>
                    <td>{event.agemin} {"años"}</td>
                    <td>{event.agemax} {"años"}</td>
                    <td>{event.ciudad}</td>
                    <td>{event.payment} {"€"}</td>
                    <td>{event.space ? "Cubierto" : "Aire libre"}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          actions.joinEvent(event.id);
                        }}
                      >
                        Unirse
                      </button>
                      {/* <DatosEventoUnico id={event.id} /> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
