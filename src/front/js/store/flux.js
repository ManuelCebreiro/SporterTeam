import swal from "sweetalert";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      userDataEventos: [],
      token: "",
      imagen:
        "https://img.freepik.com/vector-premium/perfil-hombre-dibujos-animados_18591-58482.jpg?w=200",
      respuesta: "",
      validacion: false,
      eventos: [],
      eventosFilter: [],
      dataEventoUnico: {},
      jugadores: [],
      datosUsuario: {},
      ciudades: [
        { ciudad: "A_Coruña", posicion: [43.37012643, -8.39114853] },
        { ciudad: "Albacete", posicion: [38.99588053, -1.85574745] },
        { ciudad: "Alicante", posicion: [38.34548705, -0.4831832] },
        { ciudad: "Almería", posicion: [36.83892362, -2.46413188] },
        { ciudad: "Avila", posicion: [40.65586958, -4.69771277] },
        { ciudad: "Badajoz", posicion: [38.87874339, -6.97099704] },
        { ciudad: "Bilbao", posicion: [43.25721957, -2.92390606] },
        { ciudad: "Burgos", posicion: [42.34113004, -3.70419805] },
        { ciudad: "Caceres", posicion: [3.47316762, -6.37121092] },
        { ciudad: "Cadiz", posicion: [36.52171152, -0.03688142] },
        { ciudad: "Castellon", posicion: [39.98640809, 2.17634927] },
        { ciudad: "Ceuta", posicion: [35.88810209, , -5.30675127] },
        { ciudad: "Ciudad_Real", posicion: [38.98651781, -3.93131981] },
        { ciudad: "Cordoba", posicion: [37.87954225, -4.78032455] },
        { ciudad: "Cuenca", posicion: [40.07653762, -2.13152306] },
        { ciudad: "Girona", posicion: [41.98186075, 2.82411899] },
        { ciudad: "Granada", posicion: [37.17641932, -3.60001883] },
        { ciudad: "Guadalajara", posicion: [40.63435548 - 3.16210273] },
        { ciudad: "Huelva", posicion: [37.26004113, -6.95040588] },
        { ciudad: "Huesca", posicion: [42.14062739, -0.40842276] },
        { ciudad: "Jaen", posicion: [37.7651913, -3.7903594] },
        { ciudad: "Las_Palmas", posicion: [28.099378545, -15.413368411] },
        { ciudad: "Leon", posicion: [42.59912097, -5.56707631] },
        { ciudad: "Lleida", posicion: [41.61527355, 0.62061934] },
        { ciudad: "Logroño", posicion: [42.46644945, -2.44565538] },
        { ciudad: "Lugo", posicion: [43.0091282, -7.55817392] },
        { ciudad: "Madrid", posicion: [40.40841191, -3.68760088] },
        { ciudad: "Malaga", posicion: [36.72034267, -4.41997511] },
        { ciudad: "Melilla", posicion: [35.294731, -2.942281] },
        { ciudad: "Murcia", posicion: [37.98436361, -1.1285408] },
        { ciudad: "Ourense", posicion: [42.33654919, -7.86368375] },
        { ciudad: "Oviedo", posicion: [43.36232165, -5.84372206] },
        { ciudad: "Palencia", posicion: [42.0078373, -4.53460106] },
        { ciudad: "Palma", posicion: [39.57114699, 2.65181698] },
        { ciudad: "Pamplona", posicion: [42.814102, -1.6451528] },
        { ciudad: "Pontevedra", posicion: [42.43381442, -8.64799018] },
        { ciudad: "Salamanca", posicion: [40.96736822, -5.66538084] },
        { ciudad: "San_Sebastian", posicion: [43.31717158, -1.98191785] },
        { ciudad: "Tenerife", posicion: [28.462854082, -16.247206286] },
        { ciudad: "Santander", posicion: [43.46297885, -3.80474784] },
        { ciudad: "Segovia", posicion: [40.9498703, -4.12524116] },
        { ciudad: "Sevilla", posicion: [37.38620512, -5.99251368] },
        { ciudad: "Soria", posicion: [41.76327912, -2.46624798] },
        { ciudad: "Tarragona", posicion: [41.11910287, 1.2584219] },
        { ciudad: "Teruel", posicion: [40.34412951, -1.10927177] },
        { ciudad: "Toledo", posicion: [39.85715187, -4.02431421] },
        { ciudad: "Valencia", posicion: [39.47534441, -0.37565717] },
        { ciudad: "Valladolid", posicion: [41.65232777, -4.72334924] },
        { ciudad: "Vitoria", posicion: [42.85058789, -2.67275685] },
        { ciudad: "Zamora", posicion: [41.49913956, -5.75494831] },
        { ciudad: "Zaragoza", posicion: [41.65645655, -0.87928652] },
      ],
      datosUsuario: {},
      eventosPendientes: [],
      usuariospendientes: [],
    },
    actions: {
      expulsarUsuarioEvento: (idevento, idusuario) => {
        const token = sessionStorage.getItem("token");
        fetch(process.env.BACKEND_URL + "/api/exitEvents/" + idevento, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            idUser: idusuario,
          }),
        });
        const players = getStore().jugadores;
        const filtrarJugadoresnoEliminados = players.filter(
          (element) => element.id !== idusuario
        );
        console.log(
          filtrarJugadoresnoEliminados,
          "esta deberia ser la listas nueva"
        );

        setStore({ jugadores: filtrarJugadoresnoEliminados });
        getStore().jugadores;
      },
      getUserDataEventos: () => {
        const token = sessionStorage.getItem("token");
        var requestOptions = {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        };
        fetch(
          process.env.BACKEND_URL + "/api/Userdataparticipant",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => setStore({ userDataEventos: result }));
      },
      //obtener todos los jugadores de un evento
      get_player_event: (eventid) => {
        fetch(process.env.BACKEND_URL + "/api/playerEvents/" + eventid)
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            setStore({ jugadores: data });
          });
      },

      look_event: (eventid) => {
        fetch(process.env.BACKEND_URL + "/api/lookevent/" + eventid)
          .then((resp) => {
            if (resp.ok) {
              setStore({ datavalidacionEvento: true });
              return resp.json();
            } else {
              swal(
                "Ups, hubo un problema!",
                "Inténtalo de nuevo más tarde",
                "error",
                {
                  dangerMode: true,
                }
              );
              return;
            }
          })
          .then((data) => {
            setStore({ dataEventoUnico: data });
          });
      },
      // función para registrar usuario nuevo
      register: (email, username, password, age) => {
        fetch(process.env.BACKEND_URL + "/api/register", {
          method: "POST",
          body: JSON.stringify({
            email: email,
            username: username,
            password: password,
            age: age,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((resp) => {
          if (resp.status == 200) {
            setStore({ validacionregister: true });
            return resp.json();
          } else {
            swal("Ups, hubo un problema!", "Usuario ya existe", "error", {
              dangerMode: true,
            });
          }
        });
      },

      // función para editar los ajustes usuario ya existente
      editUser: (
        newEmail,
        newUsername,
        newPassword,
        newAge,
        newDescription
      ) => {
        const token = sessionStorage.getItem("token");

        fetch(process.env.BACKEND_URL + "/api/edituser", {
          method: "POST",
          body: JSON.stringify({
            new_email: newEmail,
            new_username: newUsername,
            new_password: newPassword,
            new_age: newAge,
            new_description: newDescription,
          }),

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }).then((resp) => {
          if (resp.status == 200) {
            setStore({ validacioneditregister: true });
            swal("Perfil de usuario actualizado correctamente", {
              icon: "success",
              timer: 4000,
            });
            return resp.json();
          } else {
            swal("Ups, hubo un problema!", "Usuario ya existe", "error", {
              dangerMode: true,
            });
          }
        });
      },

      //funcion que filtra los eventos en la pagina pricipal
      filterEvent: (event) => {
        const eventos = getStore().eventos;
        const paymentResults =
          event.payment == null
            ? eventos
            : event.payment == true
            ? eventos.filter((element) => element.payment > 0)
            : eventos.filter((element) => element.payment == 0);
        const spaceResult =
          event.space == null
            ? paymentResults
            : event.space == true
            ? paymentResults.filter((element) => element.space == true)
            : paymentResults.filter((element) => element.space == false);
        const durationResults = spaceResult.filter(
          (element) => element.duration >= event.duration
        );
        const ageminResults = durationResults.filter(
          (element) => element.agemin >= event.agemin
        );
        const agemaxResults = ageminResults.filter(
          (element) => element.agemax <= event.agemax
        );

        const dateResults =
          event.date !== ""
            ? agemaxResults.filter((element) => element.date == event.date)
            : agemaxResults;
        const sportResults =
          event.sport == "" || event.sport == "cualquiera"
            ? dateResults
            : dateResults.filter((element) => element.sport == event.sport);
        const ciudadesResults =
          event.ciudad == "" || event.ciudad == "Cualquiera"
            ? sportResults
            : sportResults.filter((element) => element.ciudad == event.ciudad);
        setStore({ eventosFilter: ciudadesResults });
      },
      //funcion para unirse a un evento de la lista
      joinEvent: (eventid, userid) => {
        fetch(process.env.BACKEND_URL + "/api/joinevent/" + userid, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            id: eventid,
          }),
        });
        getActions().getusersPendientes(eventid);
        getActions().get_player_event(eventid);
        getActions().denegarpeticion(userid, eventid);
      },

      logout: () => {
        setStore({ token: "" });
        setStore({
          imagen:
            "https://img.freepik.com/vector-premium/perfil-hombre-dibujos-animados_18591-58482.jpg?w=200",
        });
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userid");

        setStore({ datosUsuario: {} });
        setStore({ eventosPendientes: {} });
        setStore({ validacion: false });
      },

      login: (email, password) => {
        const actions = getActions();
        fetch(process.env.BACKEND_URL + "/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        })
          .then((respuestadelback) => {
            if (respuestadelback.status == 200) {
              return respuestadelback.json();
            } else if (respuestadelback.status == 401) {
              console.log("El email o password es incorrecto o no existe, 401");
            } else if (respuestadelback.status == 402) {
              console.log("El email o password es incorrecto o no existe, 402");
            }
          })
          .then((respuestajson) => {
            actions.Load(respuestajson.access_token);
            sessionStorage.setItem("token", respuestajson.access_token);
            sessionStorage.setItem("userid", respuestajson.userid);
            setStore({ token: respuestajson.access_token });
            setStore({ validacion: true });
            getActions().DatosUsuarioLogeado();
          });
      },
      // -------------------------------><------------------------------------------
      DatosUsuarioLogeado: () => {
        const token = sessionStorage.getItem("token");
        const options = {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
          method: "GET",
        };
        fetch(process.env.BACKEND_URL + "/api/user", options)
          .then((respuestadelback) => respuestadelback.json())
          .then((data) => {
            console.log(data);
            setStore({ datosUsuario: data });
          });
        // --------------------------> DATOS DE USUARIO LOGEADO. HACEMOS UN GET A LA BASE DE DATOS PARA TRAER TODOS LOS DATOS DEL USUARIO <------------------------
      },
      LoadImage: (data) => {
        setStore({ imagen: data });
      },

      Load: (parametro) => {
        const options = {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + parametro,
          },
          method: "GET",
        };
        fetch(process.env.BACKEND_URL + "/api/load", options)
          .then((respuestadelback) => respuestadelback.json())
          .then((data) => {
            if (data) {
              setStore({ imagen: data });
            }
            setStore({ respuesta: "" });
          });
      },

      getrespuesta: (str) => {
        setStore({ respuesta: str });
      },

      //FUNCION reloadToken PARA QUE NO SE PIERDA EL TOKEN DEL STORAGE
      reloadToken: () => {
        let datotoken = sessionStorage.getItem("token");
        if (datotoken !== "" && datotoken !== null && datotoken !== undefined) {
          setStore({ token: datotoken });
          setStore({ validacion: true });
        }
      },

      // Use getActions to call a function within a fuction

      getEventos: () => {
        fetch(process.env.BACKEND_URL + "/api/eventos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => {
            if (resp.status == 200) {
              return resp.json();
            } else {
              console.log(resp.json());
            }
          })
          .then((data) => {
            setStore({ eventos: data });
            setStore({ eventosFilter: data });
          });
      },
      crearevento: (event) => {
        const store = getStore();
        fetch(process.env.BACKEND_URL + "/api/crearevento", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + store.token,
          },
          body: JSON.stringify({
            payment: event.payment,
            space: event.space,
            duration: event.duration,
            agemin: event.agemin,
            agemax: event.agemax,
            date: event.date,
            sport: event.sport,
            description: event.description,
            ciudad: event.ciudad,
            participantmax: event.participantmax,
          }),
        }).then((respuestadelback) => {
          if (respuestadelback.status == 200) {
            return respuestadelback.json();
          }
        });
      },
      modificarevento: (event) => {
        fetch(process.env.BACKEND_URL + "/api/modificarevento", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            evento: event,
          }),
        }).then((respuestadelback) => {
          if (respuestadelback.status == 200) {
            return respuestadelback.json();
          }
        });
        alert("Evento modificado con exito");
      },
      // usuarios pendiente de un evento
      getusersPendientes: (idevento) => {
        fetch(
          process.env.BACKEND_URL + "/api/mostrarusuariospendientes/" + idevento
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setStore({ usuariospendientes: data });
          })

          .catch((error) => console.log("error", error));
      },
      // eventos pendientes de un usuario
      geteventosPendientes: (iduser) => {
        console.log(iduser);
        fetch(
          process.env.BACKEND_URL + "/api/mostrareventospendientes/" + iduser
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setStore({ eventosPendientes: data });
          })

          .catch((error) => console.log("error", error));
      },
      denegarpeticion: (iduser, idevento) => {
        fetch(
          process.env.BACKEND_URL +
            "/api/administrasusuarios/" +
            idevento +
            "/" +
            iduser,
          {
            method: "DELETE",
          }
        );
        getActions().getusersPendientes(sessionStorage.getItem("userid"));
      },
      peticionUnion: (iduser, idevento) => {
        fetch(
          process.env.BACKEND_URL +
            "/api/peticionUnion/" +
            iduser +
            "/" +
            idevento,
          {
            method: "POST",
          }
        )
          .then((response) => {
            if (response.ok) {
              getActions().geteventosPendientes();
              return true;
            } else {
              return false;
            }
          })
          .catch((error) => console.log("error", error));
      },
    },
  };
};

export default getState;
