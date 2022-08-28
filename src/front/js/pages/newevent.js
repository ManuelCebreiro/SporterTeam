import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/newevent.css";

export const Newevent = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <h1>Crear evento</h1>
      <div class="container py-5">
        <div class="row">
          <div class="col-md-2">
            <label class="form-label">Deporte</label>
            <input type="text" class="form-control" placeholder="Deporte" required />
          </div>
          <div class="col-md-2">
            <label class="form-label">Fecha</label>
            <input type="date" class="form-control" min="2022-08-27" max="2030-12-31" placeholder="Fecha" required />
          </div>
          <div class="col-md-2">
            <label class="form-label">Duracion evento</label>
            <input type="text" class="form-control" placeholder="Duracion evento" required />
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
            <label for="validationCustom04" class="form-label">Opción de pago</label>
            <input type="text" class="form-control" placeholder="Opción de pago" required />
          </div>
          <div class="col-md-2">
            <label class="form-label">Edad mínima</label>
            <input type="number" min="0" max="150" class="form-control" placeholder="Edad mínima" required />
          </div>
          <div class="col-md-2">
            <label class="form-label">Edad máxima</label>
            <input type="text" class="form-control" placeholder="Edad máxima" required />
          </div>
          <div class="form-group">
            <label class="my-3">Descripción</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>

          <div class="col-12">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required />
              <label class="form-check-label" for="invalidCheck">
                Agree to terms and conditions
              </label>
              <div class="invalid-feedback">
                You must agree before submitting.
              </div>
            </div>
          </div>
          <div class="col-12">
            <button class="btn btn-primary" type="submit">Submit form</button>
          </div>
        </div>
      </div>
    </div>
  );
};

