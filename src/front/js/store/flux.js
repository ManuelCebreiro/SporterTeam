import { element } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: "",
      imagen:
        "https://img.freepik.com/vector-premium/perfil-hombre-dibujos-animados_18591-58482.jpg?w=200",
      respuesta: "",
      validacion: false,
      validacionregister: false,
      eventos: [],
      eventosFilter: [],
    },
    actions: {
      // función para registrar usuario nuevo
      register: (email, username, password, age) => {
        console.log(`register: ${email} ${username} ${password} ${age}`);
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
        })
          .then((resp) => {
            if (resp.status == 200) {
              setStore({ validacionregister: true });
              return resp.json();
            } else {
              alert("Usuario ya existe");
            }
          })
          .then((data) => {
            console.log(data);
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
        console.log(
          `edituser: ${newEmail} ${newUsername} ${newPassword}  ${newAge} ${newDescription}`
        );
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
          },
        })
          .then((resp) => {
            if (resp.status == 200) {
              setStore({ validacionregister: true });
              return resp.json();
            } else {
              alert("Error al cambiar los datos");
            }
          })
          .then((data) => {
            console.log(data);
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
        setStore({ eventosFilter: sportResults });
      },
      //funcion para unirse a un evento de la lista
      joinEvent: (event) => {
        const store = getStore();
        fetch(process.env.BACKEND_URL + "/api/joinevent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + store.token,
          },
          body: JSON.stringify({
            id: event,
          }),
        }).then((resp) => {
          if (resp.ok) {
            alert("usuario registrado");
          }
        });
      },

      logout: () => {
        setStore({ token: "" });
        setStore({
          imagen:
            "https://img.freepik.com/vector-premium/perfil-hombre-dibujos-animados_18591-58482.jpg?w=200",
        });
        sessionStorage.removeItem("token");
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
            setStore({ token: respuestajson.access_token });
            setStore({ validacion: true });
          });
      },
      LoadImage: (data) => {
        // const store = getStore();
        // console.log("entramos")
        // const options = {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Accept: "application/json",
        //     Authorization: "Bearer " + store.token,
        //   },
        //   method: "GET",
        // }
        // fetch(process.env.BACKEND_URL + "/api/load", options)
        //   .then(respuestadelback =>
        //     respuestadelback.json())
        //   .then(data => {
        //     setStore({ respuesta: "" })
        //   })

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
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
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

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
