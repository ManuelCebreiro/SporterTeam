import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import React, { useContext } from "react";

import { Home } from "./pages/home";
import { Perfil } from "./pages/perfil";
import { Login } from "./pages/login";
import { Newevent } from "./pages/newevent";
import injectContext, { Context } from "./store/appContext";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
  const { store, actions } = useContext(Context);

  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          {store.validacion ? <Navbar /> : undefined}
          <Routes>
            <Route element={<Home />} path="/home" />
            <Route element={<Perfil />} path="/perfil" />
            <Route element={<Newevent />} path="/newevent" />
            <Route element={<h1>Not found!</h1>} />
            <Route element={<Login />} path="/" />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
