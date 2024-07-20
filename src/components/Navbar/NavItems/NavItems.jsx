import React from "react";
import { connect } from "react-redux";
import NavItem from "./NavItem/NavItem";
import "./NavItems.css";

const NavItems = (props) => {
  let adminNavItem = null;

  if (props.role === "admin") {
    adminNavItem = <NavItem name="Admin" url="/admin" />;
  }

  return (
    <ul className="NavItems">
      <NavItem name="Home" url="/" />
      <NavItem name="Products" url="/products" />
      <NavItem name="Services" url="/services" />
      <NavItem name="About Us" url="/aboutUs" />
      <NavItem name="Contact" url="/contact" />
      <NavItem name="Orders" url="/orders" />
      {adminNavItem}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    role: state.userData.role,
  };
};

export default connect(mapStateToProps)(NavItems);
