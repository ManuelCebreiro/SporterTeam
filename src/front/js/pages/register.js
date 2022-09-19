import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import "../../styles/register.css";

const messages = {
  required: "Este campo es obligatorio",
  username: "El formato introducido no es el correcto",
  email: "Debes introducir una dirección correcta",
  password: "Contraseña debe tener mínimo 5 caracteres",
  password_repeat: "Contraseña no coincide",
  age: "Debes tener mínimo 18 y máximo 99 años",
};

const patterns = {
  username: /^[a-zA-Z0-9]+$/i,
  email:
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i,
  age: /^0?(1[89]|[2-9]\d)$/i,
};

export const Register = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  useEffect(() => {
    if (store.validacioneditregister) {
      actions.validacionFalse();
      navigate("/");
    }
  }, [store.validacioneditregister]);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (userInfo) =>
    actions.register(
      userInfo.email,
      userInfo.username,
      userInfo.password,
      userInfo.age
    );

  return (
    <div className="container-fluid p-0 " id="registerStyle">
      <div id="body_register" className="vh-100 bg-image-fluid">
        <form id="form_register" onSubmit={handleSubmit(onSubmit)}>
          <div id="form_register_body" className="cardRegister">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="text"
              className={errors.name && "error"}
              {...register("username", {
                required: messages.required,
                minLength: {
                  value: 5,
                  message: "Username debe tener mínimo 5 caracteres",
                },
                pattern: {
                  value: patterns.name,
                  message: messages.name,
                },
              })}
            />
            {errors.username && <p>{errors.username.message}</p>}

            <label htmlFor="email">Correo electrónico</label>
            <input
              name="email"
              type="text"
              className={errors.email && "error"}
              {...register("email", {
                required: messages.required,
                pattern: {
                  value: patterns.email,
                  message: messages.email,
                },
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}

            <label htmlFor="mail">Contraseña</label>
            <input
              name="password"
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

            <label htmlFor="mail">Repite Contraseña</label>
            <input
              name="password_repeat"
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
            {errors.password_repeat && <p>{errors.password_repeat.message}</p>}

            <label htmlFor="age">Tu edad</label>
            <input
              name="age"
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
            <Link id="salirRegistro" className="fw-bold" to="/">
              Salir de Registro
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
