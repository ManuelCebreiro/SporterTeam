import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import getState from "../store/flux";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';


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
          <button
            id="btnnavbar"
            type="button"
            className="btn btn-sm mt-1 ms-1"
          >
            Home
          </button>
        </Link>
      
            <Link to="/newevent" className="">
          <button
            id="btnnavbar"
            type="button"
            className="btn btn-sm mt-1 ms-1"
          >
            New Event
          </button>
          
        </Link>
          </Nav>
          <Link
          className="text-white"
          to="/"
          onClick={() => {
            actions.logout();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-box-arrow-right " aria-hidden="true" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
      </svg>
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
}
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
