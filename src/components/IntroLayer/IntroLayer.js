import React from 'react'
import './IntroLayer.css'

const introLayer = (props) => {
    return (
        <section className="IntroLayer">
            <p className="Welcome">Welcome to Suneng</p>
            <p className="what--we--do">An inventive state of craft company in mechanical <br />
            and civil Engineering.
                 We are equipped with modern machineries and equipment for<br/>
                  construction to ensure that 
                 Jobs are perfectly done.</p>
            <div className="ButtonDiv">
                <a href="#Contacting__Us">Contact Us</a>
            </div>
        </section>
    )
}

export default introLayer