import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import getState from "../store/flux";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-expand-lg p-1" id="navbarstyle">
      <Link to="/perfil">
        <img
          id="imagenPerfilNavbar"
          className="img-fluid rounded-circle my-1"
          src={store.imagen}
        ></img>
      </Link>

      <button
        className="navbar-toggler"
        id="btnnavbar"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link to="/home">
              <button
                id="btnnavbar"
                type="button"
                className="btn btn-sm mt-1 ms-1"
              >
                Pagina principal
              </button>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/newevent" className="mt-1">
              <button
                id="btnnavbar"
                type="button"
                className="btn btn-sm mt-1 ms-1"
              >
                Newevent
              </button>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/"
              onClick={() => {
                actions.logout();
              }}
            >
              <button
                id="btnnavbar"
                type="button"
                className="btn  btn-sm mt-1 ms-1"
              >
                Log out
              </button>
            </Link>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle text-warning"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Notificaciones
            </a>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            ></div>
          </li>
        </ul>
      </div>
    </nav>
  );
};
