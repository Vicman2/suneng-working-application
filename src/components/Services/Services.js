import React from 'react';
import Aux from '../../hoc/Aux';
import image1 from './Assets/services_image.png';
import  './Services.css'


const services = (props) => {
    return (
        <Aux>
            <p className="Service__Header" id="Suneng__Services">Our Services</p>
            <section className="Services">
                <div className="Services__Image__Div">
                    <img src={image1} alt="services"/>
                </div>
                <div className="Services__List">
                    <div>
                        <p className="Number">1</p>
                        <p className="weDo">To carry on the business of welding works, fabrications, drinages,
                        sales and supply of rod, manufacturing, sales of all kind of welding materials,
                        wholesale, retail and manufacturers representatives, sewage systems, boreholes,
                        land excavators and tractor or caterpillars.</p>
                    </div>
                    <div>
                        <p className="Number">2</p>
                        <p className="weDo">To carry on the business of mechanical , 
                            electrical services, construction of industrial machines, and repairs,
                            and sales of such steel/metal materials, importers of building materials, 
                            manufacturers representatives. estate agents, enviromental/sanitation services.</p>
                    </div>
                    <div>
                        <p className="Number">3</p>
                        <p className="weDo">To carry on the business manufacturers of machinery, refurbishes of different kinds
                             of machines, cars, engines, undertakers of plumbing business, corrugating of sheets,
                              and establishers of such machines in any part of the federation and to as 
                              fitters, painters, panel beaters and transporters.</p>
                    </div>
                    <div>
                        <p className="Number">4</p>
                        <p className="weDo">To carry on the business as industrial contractors, engage in the maintenance, 
                            fabrication, refurbishing, repairing and acquisition of paint mixing machines,
                             adhensive mixing machines, Garri processing machines, Bread mixing and millers 
                             and other agro Allied equipments: Bore mills, feed mills and etc..</p>
                    </div>
                </div>
            </section>
        </Aux>
    )
}

export default services