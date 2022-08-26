import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const eventos = store.eventos;

  return (
    <div className="container py-5">
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
                  <td>{(event.payment += "€")}</td>
                  <td>{event.space ? "cubierto" : "airelibre"}</td>
                  <td>
                    <button className="btn btn-success ">Unirse</button>
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
