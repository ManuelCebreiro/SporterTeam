import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import "../../../styles/register.css";

const messages = {
  required: "Este campo es obligatorio",
  new_username: "El formato introducido no es el correcto",
  new_email: "Debes introducir una dirección correcta",
  new_password: "Contraseña debe tener mínimo 5 caracteres",
  new_password_repeat: "Contraseña no coincide",
  new_age: "Debes tener mínimo 18 y máximo 99 años",
  new_description: "El formato introducido no es el correcto",
};

const patterns = {
  new_username: /^[a-zA-Z0-9]+$/i,
  new_email:
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i,
  new_age: /^0?(1[89]|[2-9]\d)$/i,
};

export const EditUser = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const user = store.datosUsuario;
  useEffect(() => {
    actions.DatosUsuarioLogeado();
  }, []);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (userInfo) => {
    console.log(userInfo);
    actions.editUser(
      userInfo.new_email,
      userInfo.new_username,
      userInfo.new_password,
      userInfo.new_age,
      userInfo.new_description
    );
  };

  return (
    <div id="body_register">
      <form id="form_register" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="new_username">Username de {user.username}</label>
        <input
          name="new_username"
          type="text"
          placeholder="Tu nuevo Username"
          className={errors.new_username && "error"}
          {...register("new_username", {
            minLength: {
              value: 5,
              message: "Username debe tener mínimo 5 caracteres",
            },
            pattern: {
              value: patterns.new_username,
              message: messages.new_username,
            },
          })}
        />
        {errors.new_username && <p>{errors.new_username.message}</p>}

        <label htmlFor="new_description">Descripción</label>
        <textarea
          id="description-textarea"
          name="new_description"
          type="text"
          placeholder="Algo sobre tí"
          className={errors.new_description && "error"}
          {...register("new_description", {
            maxLength: {
              value: 300,
              message: "Username debe tener máximo 300 caracteres",
            },
          })}
        />
        {errors.new_description && <p>{errors.new_description.message}</p>}

        <label htmlFor="new_email">Email de {user.email}</label>
        <input
          name="new_email"
          type="text"
          placeholder="Tu nuevo correo electrónico"
          className={errors.new_email && "error"}
          {...register("new_email", {
            pattern: {
              value: patterns.new_email,
              message: messages.new_email,
            },
          })}
        />
        {errors.new_email && <p>{errors.new_email.message}</p>}

        <label htmlFor="new_password">Contraseña nueva</label>
        <input
          name="new_password"
          type="password"
          className={errors.new_password && "error"}
          {...register("new_password", {
            minLength: {
              value: 5,
              message: "Contraseña debe tener mínimo 5 caracteres",
            },
          })}
        />
        {errors.new_password && <p>{errors.new_password.message}</p>}

        <label htmlFor="new_password_repeat">Repite contraseña nueva</label>
        <input
          name="new_password_repeat"
          type="password"
          className={errors.new_password_repeat && "error"}
          {...register("new_password_repeatt", {
            validate: (value) => {
              if (watch("new_password") != value) {
                return "Contraseña no coinciden";
              }
            },
          })}
        />
        {errors.new_password_repeat && (
          <p>{errors.new_password_repeat.message}</p>
        )}

        {/* <label htmlFor="password">Confirmar con contraseña antigua</label>
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
        {errors.password && <p>{errors.password.message}</p>} */}

        <label htmlFor="new_age">Edad: {user.age}</label>
        <input
          name="new_age"
          placeholder="Actualizar edad"
          className={errors.age && "error"}
          {...register("new_age", {
            pattern: {
              value: patterns.new_age,
              message: messages.new_age,
            },
          })}
        />
        {errors.new_age && <p>{errors.new_age.message}</p>}

        <input id="register_btn" value="submit" type="submit" />
      </form>
      <Link className="fw-bold text-body" to="/home">
        Salir de Ajustes
      </Link>
    </div>
  );
};
