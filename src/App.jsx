import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Structure from "./containers/Structure/Structure";
import Products from "./containers/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import Backdrop from "./components/UI/Backdrop/Backdrop";
import NavBarMin from "./components/UI/NavBarMin/NavBarMin";
import Login from "./containers/Authentication/Login/Login";
import SignIn from "./containers/Authentication/SignIn/SignIn";
import Footer from "./components/Footer/Footer";
import axios from "./Axios";
import * as actionCreator from "./Store/actions";
import Services from "./components/Services/Services";
import Team from "./components/Team/Team";
import Contact from "./containers/Contact/Contact";
import Admin from "./containers/Admin/Admin";
import Profile from "./components/Profile/Profile";
import Aux from "./hoc/Aux";
import Orders from "./containers/Orders/Orders";

const App = (props) => {
  const [toggled, setToggled] = useState(false);
  const [clickedLogin, setClickedLogin] = useState(false);
  const [clickedSignin, setClickedSignin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleNavbar = () => {
      setIsTop(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleNavbar);

    return () => {
      window.removeEventListener("scroll", handleNavbar);
    };
  }, []);

  useEffect(() => {
    const authe = JSON.parse(localStorage.getItem("sunengUserData"));
    if (authe) {
      props.onLogin(authe);
    }

    axios
      .get(`/api/product/allProducts?pageNumber=1&numberOfProducts=10`)
      .then((response) => {
        props.getMyProducts(response.data.data.data.requestedProduct);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props]);

  const navigationToggler = () => setToggled((prev) => !prev);
  const clickedLoginHandler = () => setClickedLogin((prev) => !prev);
  const clickedSigninHandler = () => setClickedSignin((prev) => !prev);
  const showProfileHandler = () => setShowProfile(true);
  const cancelProfileHandler = () => setShowProfile(false);
  const logoutHandler = () => {
    props.onLogOut();
    localStorage.removeItem("sunengUserData");
    setClickedLogin(false);
    setShowProfile(false);
    setClickedSignin(false);
  };

  return (
    <Aux>
      <div className="Page_Container">
        <section className="Structure">
          <NavBarMin toggled={toggled} toggler={navigationToggler} />
          <Backdrop toggled={toggled} clicked={navigationToggler} />
          <Login showUp={clickedLogin} clicked={clickedLoginHandler} />
          <SignIn showUp={clickedSignin} clicked={clickedSigninHandler} />
          <Profile
            isToggled={showProfile}
            removeProfile={cancelProfileHandler}
            logout={logoutHandler}
          />
          <section className="NavBar_Top">
            <Navbar
              toToggle={navigationToggler}
              isTop={isTop}
              loginClicked={clickedLoginHandler}
              signinClicked={clickedSigninHandler}
              showProfile={showProfileHandler}
            />
          </section>
        </section>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/services" element={<Services />} />
          <Route path="/aboutUs" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Structure />} />
        </Routes>
        <Footer />
      </div>
    </Aux>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  userData: state.userData,
});

const mapDispatchToProps = (dispatch) => ({
  getMyProducts: (payload) => dispatch(actionCreator.companyProduct(payload)),
  onLogin: (payload) => dispatch(actionCreator.login(payload)),
  onLogOut: () => dispatch(actionCreator.logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
