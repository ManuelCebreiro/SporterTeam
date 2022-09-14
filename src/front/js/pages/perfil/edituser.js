import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Photoperfil } from "./photoperfil";

import "../../../styles/edituser.css";

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
    if (store.validacioneditregister) navigate("/photoperfil");
  }, [store.validacioneditregister]);

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
    <div className="container-fluid p-0" id="edituserStyle">
      <div id="body_edituser" className="vh-120 bg-image-fluid">
        <form id="form_edituser" onSubmit={handleSubmit(onSubmit)}>
          <div id="form_edituser_body">
            <h4 id="form_edituser_tittle" className="display-6">
              PERFIL DE USUARIO
            </h4>
            <div id="form_edituser_text">
              <div class="container">
                <div className="row bg-grey">
                  <div className="col-sm-6 px-2 py-4">
                    <Photoperfil />
                  </div>

                  <div
                    id="form_edituser_text-1"
                    className="col-sm-6 px-2 gy-0 py-0 my-0"
                  >
                    <label className="mb-1" htmlFor="new_username">
                      Username: {user.username}
                    </label>
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
                    {errors.new_username && (
                      <p>{errors.new_username.message}</p>
                    )}
                    <label className="mb-1" htmlFor="new_age">
                      Edad: {user.age}
                    </label>
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

                    <label className="mb-1" htmlFor="new_email">
                      Email: {user.email}
                    </label>
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
                  </div>
                </div>
              </div>
              <div id="form_edituser_text-2">
                <div classname="container">
                  <div className="form-group mb-0 my-0 py-0 px-2 gy-0 col-sm-12">
                    <label
                      className="my-1 py-1 mx-1 mb-1 "
                      htmlFor="new_description"
                    >
                      Descripción:
                    </label>
                    <textarea
                      class="form-control mx-1 px-1"
                      id="exampleFormControlTextarea1"
                      rows="3"
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
                    {errors.new_description && (
                      <p>{errors.new_description.message}</p>
                    )}
                  </div>
                </div>

                <div class="container">
                  <div class="row">
                    <div class="col-sm-6">
                      <label className="mb-1" htmlFor="new_password">
                        Contraseña nueva:
                      </label>
                      <input
                        name="new_password"
                        type="password"
                        className={errors.new_password && "error"}
                        {...register("new_password", {
                          minLength: {
                            value: 5,
                            message:
                              "Contraseña debe tener mínimo 5 caracteres",
                          },
                        })}
                      />
                      {errors.new_password && (
                        <p>{errors.new_password.message}</p>
                      )}
                    </div>

                    <div class="col-sm-6">
                      <label className="mb-1" htmlFor="new_password_repeat">
                        Repite contraseña nueva:
                      </label>
                      <input
                        name="new_password_repeat"
                        type="password"
                        className={errors.new_password_repeat && "error"}
                        {...register("new_password_repeat", {
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
                    </div>
                  </div>
                </div>

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
                <div className="col-6 mx-auto">
                  <input
                    className="btn mb-2"
                    id="edituser_btn"
                    value="submit"
                    type="submit"
                  />
                </div>
                <div className="col-6 mx-auto">
                  <Link id="salirEditUser" className="fw-bold" to="/perfil">
                    Salir de Ajustes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
