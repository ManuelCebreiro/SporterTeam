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
      Ciudades: {
        A_Coruña: { lat: 43.37012643, lng: -8.39114853 },
        Albacete: { lat: 38.99588053, lng: -1.85574745},
        Alicante: { lat: 38.34548705, lng: -0.4831832},
        Almería: { lat: 36.83892362, lng:	-2.46413188},
        Avila: {lat: 40.65586958, lng: -4.69771277},
        Badajoz: {lat: 38.87874339, lng: -6.97099704},
        Barcelona: {lat: 41.38424664, lng: 2.17634927},
        Bilbao: {lat: 43.25721957,	lng: -2.92390606},
        Burgos: {lat: 42.34113004,	lng:-3.70419805},
        Caceres: {lat: 3.47316762, lng:	-6.37121092},
        Cadiz: {lat: 36.52171152,	lng:-6.28414575},
        Castellon: {lat:39.98640809, lng:	-0.03688142},
        Ceuta: {lat: 35.88810209,	lng: -5.30675127},
        Ciudad_Real: {lat: 38.98651781, lng: -3.93131981},
        Cordoba: {lat: 37.87954225,	lng: -4.78032455},
        Cuenca: {lat: 40.07653762,	lng: -2.13152306},
        Girona: {lat: 41.98186075, lng:	2.82411899},
        Granada: {lat: 37.17641932,	lng: -3.60001883},
        Guadalajara: {lat: 40.63435548,	lng: -3.16210273},
        Huelva: {lat: 37.26004113, lng:	-6.95040588},
        Huesca: {lat: 42.14062739,	lng: -0.40842276},
        Jaen: {lat: 37.7651913, lng:	-3.7903594},
        Las_Palmas: {lat: 28.099378545, lng:	-15.413368411},
        Leon: {lat: 42.59912097, lng:	-5.56707631},
        Lleida: {lat: 41.61527355, lng:	0.62061934},
        Logroño: {lat: 42.46644945, lng:	-2.44565538},
        Lugo: {lat: 43.0091282, lng:	-7.55817392},
        Madrid: {lat: 40.40841191, lng:	-3.68760088},
        Malaga: {lat: 36.72034267, lng:	-4.41997511},
        Melilla: {lat: 35.294731, lng:	-2.942281},
        Murcia: {lat: 37.98436361, lng:	-1.1285408},
        Ourense: {lat: 42.33654919, lng:	-7.86368375},
        Oviedo: {lat: 43.36232165, lng:	-5.84372206},
        Palencia: {lat: 42.0078373, lng:	-4.53460106},
        Palma: {lat: 39.57114699, lng:	2.65181698},
        Pamplona: {lat: 42.814102, lng:	-1.6451528},
        Pontevedra: {lat: 42.43381442, lng:	-8.64799018},
        Salamanca: {lat: 40.96736822, lng:	-5.66538084},
        San_Sebastian: {lat: 43.31717158, lng:	-1.98191785},
        Tenerife: {lat: 28.462854082, lng:	-16.247206286},
        Santander: {lat: 43.46297885, lng:	-3.80474784},
        Segovia: {lat: 40.9498703, lng:	-4.12524116},
        Sevilla: {lat: 37.38620512,	lng: -5.99251368},
        Soria: {lat: 41.76327912, lng:	-2.46624798},
        Tarragona: {lat: 41.11910287, lng:	1.2584219},
        Teruel: {lat: 40.34412951, lng:	-1.10927177},
        Toledo: {lat: 39.85715187, lng:	-4.02431421},
        Valencia: {lat: 39.47534441, lng:	-0.37565717},
        Valladolid: {lat: 41.65232777, lng:	-4.72334924},
        Vitoria: {lat: 42.85058789, lng:	-2.67275685},
        Zamora: {lat: 41.49913956, lng:	-5.75494831},
        Zaragoza: {lat: 41.65645655, lng:	-0.87928652},
      },
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
        setStore({ eventosFilter: sportResults });
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
