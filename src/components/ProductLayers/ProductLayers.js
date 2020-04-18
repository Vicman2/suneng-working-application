import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductLayerr from './ProductLayer/ProductLayer'
import Spinner from '../UI/Spinner/Spinner'
import Aux from '../../hoc/Aux';
import './ProductLayers.css';


const ProductLayer = (props) => {
  const baseUrl = "hhttps://suneng-backend.herokuapp.com/"
  let prod= null
  if(!props.products){
    prod = <Spinner />
  }else{
    let productFromRedux = [...props.products]
    let toShow = productFromRedux.splice(productFromRedux.length-10, 10)
    toShow.forEach(element => {
      element.details = element.details.slice(0, 140) + "..."
   });
    prod = toShow.map(produc => (
      <ProductLayerr 
      key={produc._id}
      source={baseUrl + produc.machineSource}
      name={produc.name}
      details={produc.details}
      />
    ))
  }
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
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
          <div className="protect" id="Suneng__Products">
            <p className="Title">Products</p>
            <section className="Lists">
                <Carousel responsive={responsive} autoPlay infinite>
                   {prod}
                </Carousel>
            </section>
            <div className="btnCont">
              <button className="see__All__Product" onClick={props.fullProductClicked}>View All<ion-icon name="arrow-dropright"></ion-icon></button>
            </div>
          </div>
        </Aux>
    )
}

const propsMapedToProps = state => {
  return {
    products: state.products
  }
}

export default connect(propsMapedToProps)(withRouter(ProductLayer))