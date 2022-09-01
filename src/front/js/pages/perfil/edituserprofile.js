import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import "../../../styles/register.css";

const messages = {
  required: "Este campo es obligatorio",
  username: "El formato introducido no es el correcto",
  email: "Debes introducir una dirección correcta",
  password: "Contraseña debe tener mínimo 5 caracteres",
  password_repeat: "Contraseña no coincide",
  age: "Debes tener mínimo 18 y máximo 99 años",
  description: "El formato introducido no es el correcto",
};

const patterns = {
  username: /^[A-Za-z]+$/i,
  email:
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i,
  age: /^0?(1[89]|[2-9]\d)$/i,
  description: /^[A-Za-z]+$/i,
};

export const EditUserProfile = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  useEffect(() => {
    if (store.validacionregister) navigate("/");
  }, [store.validacionregister]);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (userInfo) =>
    actions.register(
      userInfo.new_email,
      userInfo.new_username,
      userInfo.new_password,
      userInfo.new_age,
      userInfo.description
    );

  return (
    <div id="body_register">
      <form id="form_register" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="new_username">"Username de BBDD"</label>
        <input
          name="new_username"
          type="text"
          placeholder="Tu nuevo Username"
          className={errors.name && "error"}
          {...register("new_username", {
            required: messages.required,
            minLength: {
              value: 5,
              message: "Username debe tener mínimo 5 caracteres",
            },
            pattern: {
              value: patterns.username,
              message: messages.username,
            },
          })}
        />
        {errors.username && <p>{errors.username.message}</p>}

        <label htmlFor="description">"Tu perfil"</label>
        <input
          name="description"
          type="text"
          placeholder="Algo sobre tí"
          className={errors.description && "error"}
          {...register("description", {
            required: messages.required,
            maxLength: {
              value: 300,
              message: "Username debe tener máximo 300 caracteres",
            },
            pattern: {
              value: patterns.name,
              message: messages.name,
            },
          })}
        />
        {errors.description && <p>{errors.description.message}</p>}

        <label htmlFor="new_email">"Email de BBDD"</label>
        <input
          name="new_email"
          type="text"
          placeholder="Tu nuevo correo electrónico"
          className={errors.email && "error"}
          {...register("new_email", {
            required: messages.required,
            pattern: {
              value: patterns.email,
              message: messages.email,
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <label htmlFor="password">Contraseña nueva</label>
        <input
          name="new_password"
          type="password"
          className={errors.password && "error"}
          {...register("password", {
            required: messages.required,
            minLength: {
              value: 5,
              message: "Contraseña debe tener mínimo 5 caracteres",
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <label htmlFor="password_repeat">Repite contraseña nueva</label>
        <input
          name="password_repeat"
          type="password"
          className={errors.password_repeat && "error"}
          {...register("password_repeat", {
            required: messages.required,
            validate: (value) => {
              if (watch("new_password") != value) {
                return "Contraseña no coinciden";
              }
            },
          })}
        />
        {errors.password_repeat && <p>{errors.password_repeat.message}</p>}

        <label htmlFor="password">Confirmar con contraseña antigua</label>
        <input
          name="password"
          type="password"
          className={errors.password_repeat && "error"}
          {...register("password_repeat", {
            required: messages.required,
            validate: (value) => {
              if (watch("password") != value) {
                return "Contraseña no coinciden";
              }
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <label htmlFor="age">"Edad de BBDD"</label>
        <input
          name="age"
          placeholder="Actualizar edad"
          className={errors.age && "error"}
          {...register("age", {
            required: messages.required,
            pattern: {
              value: patterns.age,
              message: messages.age,
            },
          })}
        />
        {errors.age && <p>{errors.age.message}</p>}

        <input id="register_btn" value="submit" type="submit" />
      </form>
      <Link to="/home">
        <a href="#!" className="fw-bold text-body">
          Salir de Ajustes
        </a>
      </Link>
    </div>
  );
};
