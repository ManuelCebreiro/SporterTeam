import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
//import "react-dates/initialize";

import "../../styles/register.css";

const messages = {
  required: "Este campo es obligatorio",
  sport: "Elige Uno de estos deportes",
  date: "Elige la fecha correctamente",
  duration: "Máximo 4 horas",
  participantmax: "Máximo 50 participantes",
  ciudad: "",
  payment: "",
  agemin: "Mínimo 18 años",
  agemax: "Máximo 99 años",
  space: "Tipo de lugar",
  description: "Máximo 300 caracteres",
};

const patterns = {
  username: /^[a-zA-Z0-9]+$/i,
  agemin: /^0?(1[89]|[2-9]\d)$/i,
  agemax: /^0?(1[89]|[2-9]\d)$/i,
  date: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
};

export const Newevent = () => {
  const [state, setState] = useState({});
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  useEffect(() => {
    if (store.validacionregister) navigate("/home");
  }, [store.validacionregister]);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (event) =>
    actions.register(
      event.sport,
      event.date,
      event.duration,
      event.participantmax,
      event.ciudad,
      event.payment,
      event.agemin,
      event.agemax,
      event.space,
      event.description
    );

  return (
    <div id="body_register">
      <form id="form_register" onSubmit={handleSubmit(onSubmit)}>
        <div id="form_register_body">
          <label htmlFor="sport">Deporte</label>
          <input
            name="sport"
            type="text"
            className={errors.sport && "error"}
            {...register("sport", {
              required: messages.required,
            })}
          >
            <select {...register("sport")}>
              <option value="">Elige</option>
              <option value="Baloncesto">Baloncesto</option>
              <option value="Futbol">Fútbol</option>
              <option value="Tenis">Tenis</option>
              <option value="Padel">Padel</option>
            </select>
          </input>

          {errors.sport && <p>{errors.sport.message}</p>}

          <label htmlFor="date">Fecha</label>
          <input
            name="date"
            type="date"
            placeholder="Fecha"
            date={state.date}
            focused={state.focused}
            onDateChange={(date) => {
              setState((p) => ({ ...p, date }));
              field.onChange(date);
            }}
            onFocusChange={({ focused }) =>
              setState((p) => ({ ...p, focused }))
            }
            className={errors.date && "error"}
            {...register("date", {
              required: messages.required,
            })}
          ></input>
          {errors.date && <p>{errors.date.message}</p>}

          <label htmlFor="duration">Duracion evento</label>
          <input
            name="duration"
            type="number"
            className={errors.duration && "error"}
            {...register("age", {
              required: messages.required,
              min: {
                value: 1,
                message: "Duración mínima de 1 hora",
              },
              max: {
                value: 4,
                message: "Duración máxima de horas",
              },
              pattern: {
                value: patterns.duration,
                message: messages.duration,
              },
            })}
          />
          {errors.duration && <p>{errors.duration.message}</p>}

          <label htmlFor="participantmax">Participantes</label>
          <input
            name="participantmax"
            type="number"
            className={errors.participantmax && "error"}
            {...register("age", {
              required: messages.required,
              min: {
                value: 1,
                message: "Mínimo 1 participantes",
              },
              max: {
                value: 50,
                message: "Máximo 50 participantes",
              },
              pattern: {
                value: patterns.participantmax,
                message: messages.participantmax,
              },
            })}
          />
          {errors.participantmax && <p>{errors.participantmax.message}</p>}

          <label htmlFor="ciudad">Ciudad</label>
          <select
            name="ciudad"
            value={event.ciudad}
            onChange={(e) => {
              setEvent({ ...event, ciudad: e.target.value });
              console.log({ ...event, ciudad: e.target.value });
            }}
            className={errors.ciudad && "error"}
            {...register("ciudad", {
              required: messages.required,
            })}
          >
            <option>Elige ciudad</option>
            {cities.map((texto, index) => {
              return <option key={index}>{texto.ciudad}</option>;
            })}
          </select>
          {errors.ciudad && <p>{errors.ciudad.message}</p>}

          <label htmlFor="payment">Opción de pago</label>
          <input
            name="payment"
            type="number"
            className={errors.payment && "error"}
            {...register("payment", {
              required: messages.required,
              min: {
                value: 0,
                message: "Coste mínimo de 0€",
              },
              pattern: {
                value: patterns.payment,
                message: messages.payment,
              },
            })}
          />
          {errors.payment && <p>{errors.payment.message}</p>}

          <label htmlFor="agemin">Edad Mínima</label>
          <input
            name="agemin"
            type="number"
            className={errors.agemin && "error"}
            {...register("agemin", {
              required: messages.required,
              min: {
                value: 18,
                message: "Edad mínima de 18 años",
              },
              max: {
                value: 99,
                message: "Edad máxima de 99 años",
              },
              pattern: {
                value: patterns.agemin,
                message: messages.agemin,
              },
            })}
          />
          {errors.agemin && <p>{errors.agemin.message}</p>}

          <label htmlFor="agemax">Edad máxima</label>
          <input
            name="agemax"
            type="number"
            className={errors.agemax && "error"}
            {...register("agemax", {
              required: messages.required,
              min: {
                value: 18,
                message: "Edad mínima de 18 años",
              },
              max: {
                value: 99,
                message: "Edad máxima de 99 años",
              },
              pattern: {
                value: patterns.agemax,
                message: messages.agemax,
              },
            })}
          />
          {errors.agemax && <p>{errors.agemax.message}</p>}

          <label htmlFor="space">Tipo de Lugar</label>
          <input
            name="space"
            type="text"
            className={errors.space && "error"}
            {...register("space", {
              required: messages.required,
            })}
          >
            <select {...register("space")}>
              <option value="">Elige</option>
              <option value="true">Cubierto</option>{" "}
              {/*Está puesto como un buleano*/}
              <option value="false">Aire Libre</option>
            </select>
          </input>

          {errors.space && <p>{errors.space.message}</p>}

          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description-textarea"
            name="description"
            type="text"
            placeholder="Descripción del evento"
            className={errors.description && "error"}
            {...register("description", {
              maxLength: {
                value: 300,
                message: "Máximo 300 caracteres",
              },
            })}
          />
          {errors.description && <p>{errors.description.message}</p>}

          <input id="create_btn" value="submit" type="submit" />
        </div>
      </form>
      <Link className="fw-bold text-body" to="/home">
        Salir de Crear Evento
      </Link>
    </div>
  );
};
