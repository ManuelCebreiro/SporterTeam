const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: "",
      imagen: "https://img.freepik.com/vector-premium/perfil-hombre-dibujos-animados_18591-58482.jpg?w=200",
      respuesta: "",
    },
    actions: {
      logout: () => {
        setStore({ token: "" });
        setStore({ imagen: "https://img.freepik.com/vector-premium/perfil-hombre-dibujos-animados_18591-58482.jpg?w=200", })
        sessionStorage.removeItem("token");
      },

      login: (email, password) => {
        const actions = getActions()
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
            actions.Load(respuestajson.access_token)
            sessionStorage.setItem("token", respuestajson.access_token);
            setStore({ token: respuestajson.access_token });
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

        setStore({ imagen: data })
      },
      Load: (parametro) => {
        const options = {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + parametro
          },
          method: "GET",
        }
        fetch(process.env.BACKEND_URL + "/api/load", options)
          .then(respuestadelback =>
            respuestadelback.json())
          .then(data => {
            if (data) {
              setStore({ imagen: data })
            }
            setStore({ respuesta: "" })
          })

      },

      getrespuesta: (str) => {
        setStore({ respuesta: str })
      },

      //FUNCION reloadToken PARA QUE NO SE PIERDA EL TOKEN DEL STORAGE
      reloadToken: () => {
        let datotoken = sessionStorage.getItem("token");
        if (datotoken !== "" && datotoken !== null && datotoken !== undefined)
          setStore({ token: datotoken });
      },
      // traermeimagen: (img) => {
      //   setStore({ imagen: img })
      // },
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
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
