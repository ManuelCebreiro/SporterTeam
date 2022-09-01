import { element } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: "",
      validacion: false,
      eventos: [],
      eventosFilter: [],
      lat: 0,
      lng: 0,
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
    },
    actions: {
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
        const cityResults =
          event.localizacion == ""
            ? sportResults
            : sportResults.filter(
                (element) => element.localization == event.localizacion
              );
        setStore({ eventosFilter: cityResults });
      },
      //FUNCION PARA SACAR LA UBICACION DEL USUARIO
      localization: () => {
        if (!navigator.geolocation) {
          alert("no tengo permisos para ver tu ubicacion");
        } else {
          navigator.geolocation.getCurrentPosition(success);

          function success(userlocation) {
            console.log(userlocation);
            setStore({
              lat: userlocation.coords.latitude,
            });
            setStore({
              lng: userlocation.coords.longitude,
            });
          }
        }
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
            sessionStorage.setItem("token", respuestajson.access_token);
            setStore({ token: respuestajson.access_token });
            setStore({ validacion: true });
            actions.localization();
          });
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
