import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom"; // Use hook for navigation
import Carousel from "react-multi-carousel";
import AOS from "aos";
import "react-multi-carousel/lib/styles.css";
import ProductLayerr from "./ProductLayer/ProductLayer";
import Spinner from "../UI/Spinner/Spinner";
import Aux from "../../hoc/Aux";
import "./ProductLayers.css";

const ProductLayer = (props) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    AOS.init();
  }, []);

  const baseUrl = "https://suneng-backend.herokuapp.com/api/machines/";
  let prod = null;

  if (!props.products) {
    prod = <Spinner />;
  } else {
    let productFromRedux = [...props.products];
    let toShow = productFromRedux.splice(productFromRedux.length - 10, 10);
    toShow.forEach((element) => {
      element.details = element.details.slice(0, 140) + "...";
    });
    prod = toShow.map((produc) => (
      <ProductLayerr
        key={produc._id}
        source={baseUrl + produc.machineSource}
        name={produc.name}
        details={produc.details}
      />
    ));
  }

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Aux>
      <div
        className="protect"
        id="Suneng__Products"
        data-aos="fade-up"
        data-aos-duration="3000"
      >
        <p className="Title">Products</p>
        <section className="Lists">
          <Carousel responsive={responsive} autoPlay infinite>
            {prod}
          </Carousel>
        </section>
        <div className="btnCont">
          <button
            className="see__All__Product"
            onClick={() => navigate("/path-to-full-products")}
          >
            View All
          </button>
        </div>
      </div>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(ProductLayer);
