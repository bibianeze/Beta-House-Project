import usernavbar from "../../assets/images/UserLogo.png";
import { Link, useLocation, useParams } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import Container from "react-bootstrap/Container";
// import { Button } from "react-bootstrap";
import "../../styles/User Styles/UserNavbar.css";
import UserSideBar from "./UserSideBar";
import { useState } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { BiMoon } from "react-icons/bi";
import { useGlobalContext } from "../../Hooks/useGlobalContext";
import { useNavigate } from "react-router-dom";


const UserNavbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const { propertyId } = useParams();
  const location = useLocation();
  const { isDark, setLightMode } = useGlobalContext();
  const token = localStorage.getItem('token');
  const navigate = useNavigate()

  const handleLogout = () =>{
    localStorage.removeItem('token');
    navigate('/')
   
  }

  return (
    <div
      className={
        location.pathname === `/properties/${propertyId}` ||
        location.pathname === "/inspection" ||
        location.pathname === "/*"
          ? "bg-success w-100 "
          : "bg-transparent UserNavTransparent z-2 position-absolute top-0 w-100"
      }
    >
      <div
        className="switch position-absolute border rounded-pill d-lg-flex gap-3 p-2 d-none "
        onClick={setLightMode}
      >
        <BsFillSunFill className={isDark ? "d-none" : "fs-3 text-warning"} />
        <BsFillMoonFill className={isDark ? "fs-3 text-white" : "d-none"} />
      </div>
      {sidebar ? <UserSideBar sidebar={setSidebar} /> : null}
      <header className="usernavheader align-items-center px-lg-5 px-2  py-4 d-flex">
        <div className="LogoWrapper d-flex justify-content-between align-items-center ">
          <Link to="/">
            <img src={usernavbar} alt="usernavlogo" className="usernavlogo" />
          </Link>

          <GiHamburgerMenu
            className=" text-white fs-4 d-lg-none d-block"
            onClick={() => setSidebar(true)}
          />
        </div>

        <nav className="d-lg-flex  d-none flex-lg-row flex-column align-items-center justify-content-evenly  position-md-absolute top-100 end-0">
          {/* <Container className="d-flex gap-5"> */}

          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          {/* <Navbar.Collapse id="basic-navbar-nav" className="w-75 ps-5 "> */}
          <ul className="UserNavLinks d-flex pt-3 align-items-center gap-5 ">
            <li>
              <Link
                to="/"
                className={
                  location.pathname === "/"
                    ? "text-success fw-bold "
                    : "text-white fw-bold "
                }
              >
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link
                to="/properties"
                className={
                  location.pathname === "/properties"
                    ? "text-success fw-bold "
                    : "text-white fw-bold "
                }
              >
                Properties
              </Link>
            </li>
            <li>
              {" "}
              <Link
                to="/contact"
                className={
                  location.pathname === "/contact"
                    ? "text-success fw-bold "
                    : "text-white fw-bold "
                }
              >
                Contact Us
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/inspection" className="text-white fw-bold ">
                Book Now
              </Link>
            </li>
          </ul>
          {
            token? <div><button onClick={handleLogout} className="btn btn-danger">Log Out</button></div> :
            <div className="d-flex flex-column ms-xxl-5  flex-lg-row  gap-3 align-items-center mt-sm-3 ">
            <Link to="/signup">
              <button
                className={
                  location.pathname === `/properties/${propertyId}` ||
                  location.pathname === "/inspection"
                    ? " btn border bg-success text-white px-4 py-2"
                    : "btn border px-4 py-2 text-success bg-white"
                }
              >
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button
                className={
                  location.pathname === `/properties/${propertyId}` ||
                  location.pathname === "/inspection"
                    ? "btn bg-white border-0 px-5 py-2 text-success "
                    : "btn text-white px-4 py-2 bg-success"
                }
              >
                Log In
              </button>
            </Link>
          </div>}
          {/* </Navbar.Collapse> */}
          {/* </Container> */}
        </nav>
      </header>
    </div>
  );
};

export default UserNavbar;

// {
//   (" ");
// }
// <header className="header d-flex align-items-center justify-content-between gap-5 w-100 px-5 py-4">
//   <div className="w-25">
//     <Link to="/">
//       <img src={usernavbar} alt="usernavlogo" />
//     </Link>
//   </div>
//   <nav className="UserNavbar w-75 ps-4 d-flex justify-content-between align-items-center">
//     {/* <label htmlFor="menu-toggle" id="hamburger-btn" className="d-block d-lg-none ">
//         <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
//           <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
//         </svg>
//       </label> */}
//     <ul className="UserNavLinks text-white d-flex gap-5 mt-2">
//       <li>
//         <a href="#" className="text-white">
//           Home
//         </a>
//       </li>
//       <li>
//         <a href="#" className="text-white">
//           Properties
//         </a>
//       </li>
//       <li>
//         <a href="#" className="text-white">
//           Contact Us
//         </a>
//       </li>
//       <li>
//         <a href="#" className="text-white">
//           Book Now
//         </a>
//       </li>
//     </ul>
//     <div className="UserNavBtn d-flex gap-5">
//       <button className="signin btn border text-white px-4 py-2">
//         Sign In
//       </button>
//       <button className="signup btn bg-white px-4 py-2">Login</button>
//     </div>
//   </nav>
// </header>;
