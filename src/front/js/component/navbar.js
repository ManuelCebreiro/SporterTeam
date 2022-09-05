import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import getState from "../store/flux";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-expand-lg  bg-secondary p-1 primary">
      <Link to="/photoperfil">
        <img
          id="imagenPerfilNavbar"
          className="img-fluid rounded-circle"
          src={store.imagen}
        ></img>
      </Link>

      <button
        className="navbar-toggler"
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
            <Link className="nav-link text-warning" to="/home">
              Pagina principal <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/newevent">
              <a className="nav-link text-warning" href="#">
                newevent
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-warning" to="/edituser">
              Edituser
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/"
              onClick={() => {
                actions.logout();
              }}
            >
              <a className="nav-link text-warning" href="">
                Log out
              </a>
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
            >
              <a className="dropdown-item text-warning" href="#">
                Action
              </a>
              <a className="dropdown-item text-warning" href="#">
                Another action
              </a>
              <a className="dropdown-item text-warning" href="#">
                Something else here
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};
