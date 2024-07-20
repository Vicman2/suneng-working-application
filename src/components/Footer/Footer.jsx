import Aux from "../../hoc/Aux";
import "./Footer.css";

const footer = () => {
  return (
    <Aux>
      <div className="Footer">
        <p>Copyright 2019. All rights Reserved.</p>
        <p>Privacy Policy</p>
        <p>Terms and Conditions</p>
        <div className="Fotter__Socials">
          <ion-icon name="logo-twitter"></ion-icon>
          <ion-icon name="logo-facebook"></ion-icon>
          <ion-icon name="logo-instagram"></ion-icon>
        </div>
      </div>
    </Aux>
  );
};

export default footer;
