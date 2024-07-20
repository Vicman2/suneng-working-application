import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import IntroLayer from '../../components/IntroLayer/IntroLayer'
import ProductLayer from '../../components/ProductLayers/ProductLayers'
import Services from '../../components/Services/Services'
import Team from '../../components/Team/Team';
import Contact from '../Contact/Contact'
import './Structure.css'


class Structure extends Component{
    goToFullProductHandler = ()=>{
        this.props.history.push('/products')
    }
    render(){
        return (
            <Aux>
                 <section className="subStructure">
                    <IntroLayer />
                </section>
                <ProductLayer fullProductClicked={this.goToFullProductHandler}/>
                <Services />
                <Team />
                <Contact />
            </Aux>
        )
    }
}



export default Structure