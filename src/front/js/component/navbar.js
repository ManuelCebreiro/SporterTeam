import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import getState from "../store/flux";
import Nav from "react-bootstrap/Nav";

import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import "../../styles/navbar.css";

export const Navbarnew = () => {
  const { store, actions } = useContext(Context);
  return (
    <Navbar id="navbarstyle" className="py-0" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <Link to="/perfil">
            <img
              id="imagenPerfilNavbar"
              className="img-fluid rounded-circle my-1"
              src={store.imagen}
            ></img>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
        <Navbar.Collapse className="text-end" id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/home">
              <button id="btnnavbar-1" type="button" className="btn my-1 ms-1">
                Principal
              </button>
            </Link>

            <Link to="/newevent" className="mx-2">
              <button
                id="btnnavbar-2"
                type="button"
                className="atari btn my-1 ms-1"
              >
                <span>Crear Pachanga</span>
                <div class="top"></div>
                <div class="left"></div>
                <div class="bottom"></div>
                <div class="right"></div>
              </button>
            </Link>
          </Nav>
          <Link
            to="/"
            onClick={() => {
              actions.logout();
            }}
          >
            <img src="https://themayanagari.com/wp-content/uploads/2021/04/Exit-Button-Png-Icon-Transparent.png"
              className="img-fluid rounded-circle my-1 float-end"

              id="imagenExitNavbar"
            />

            {/* <span

            id="btnnavbarexit"
            type="button"
            className="btn  btn-sm mt-1 ms-1"
          > 
            Log out
            </span>       */}
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
//   <button
//     class="navbar-toggler"
//     id="btnnavbar"
//     type="button"
//     data-mdb-toggle="collapse"
//     data-mdb-target="#navbarSupportedContent"
//     aria-controls="navbarSupportedContent"
//     aria-expanded="false"
//     aria-label="Toggle navigation"
//   >
//     <i class="fas fa-bars"></i>
//   </button>
//   {/* <div className="collapse navbar-collapse" id="navbarNavDropdown"> */ }
//   <div class="collapse navbar-collapse" id="navbarSupportedContent">
//     <ul className="navbar-nav">
//       <li className="nav-item active">

//       </li>
//       <li className="nav-item active">

//       </li>
//       <li className="nav-item active">

//       </li>
//       <li className="nav-item active">

//       </li>
//       <li className="nav-item dropdown">
//         <a
//           className="nav-link dropdown-toggle text-warning"
//           href="#"
//           id="navbarDropdownMenuLink"
//           data-toggle="dropdown"
//           aria-haspopup="true"
//           aria-expanded="false"
//         >
//           Notificaciones
//         </a>
//         <div
//           className="dropdown-menu"
//           aria-labelledby="navbarDropdownMenuLink"
//         ></div>
//       </li>
//     </ul>
//   </div>
//       </div >
//     </nav >
//   );
// }
