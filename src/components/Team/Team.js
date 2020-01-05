import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Aux from '../../hoc/Aux';
import './Team.css'
import CEO from './Assets/CEO.jpg';
import Founder from './Assets/Founder.jpg';
import Media from './Assets/Media.jpg';
import Maintenance from './Assets/Okwey.jpg'
import SunEngMarket from './Assets/SunEng Marketer.png'

const team = (props) => {
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
          breakpoint: { max: 1024, min:600},
          items: 2,
        },
        mobile: {
          breakpoint: { max: 600, min: 0 },
          items: 1,
        },
      };
    return (
        <Aux>
            <section className="Team" id="De__Team">
                <p className="Team__Header">The Team</p>
                <section className="Team__Mates">
                    <Carousel responsive={responsive} autoPlay infinite>
                        <section className="Mate">
                            <img src={CEO} alt="CEO"/>
                            <div className="MateDetails">
                                <p className="Mate__name">Eng. Nnadi Samuel N.</p>
                                <p className="Mate__Position">CEO</p>
                                <div className="Socials">
                                    <ion-icon name="logo-facebook"></ion-icon>
                                    <ion-icon name="logo-twitter"></ion-icon>
                                    <ion-icon name="logo-instagram"></ion-icon>
                                    <ion-icon name="logo-linkedin"></ion-icon>
                                </div>
                            </div>
                        </section>
                        <section className="Mate">
                            <img src={Founder} alt="Founder"/>
                            <div className="MateDetails">
                                <p className="Mate__name">ENGR. NNADI SUNDAY </p>
                                <p className="Mate__Position">Founder</p>
                                <div className="Socials">
                                    <ion-icon name="logo-facebook"></ion-icon>
                                    <ion-icon name="logo-twitter"></ion-icon>
                                    <ion-icon name="logo-instagram"></ion-icon>
                                    <ion-icon name="logo-linkedin"></ion-icon>
                                </div>
                            </div>
                        </section>
                        <section className="Mate">
                            <img src={Maintenance} alt="Maintenance"/>
                            <div className="MateDetails">
                                <p className="Mate__name">ENGR. NNADI JOSEPH O. </p>
                                <p className="Mate__Position">Maintenance Officer</p>
                                <div className="Socials">
                                    <ion-icon name="logo-facebook"></ion-icon>
                                    <ion-icon name="logo-twitter"></ion-icon>
                                    <ion-icon name="logo-instagram"></ion-icon>
                                    <ion-icon name="logo-linkedin"></ion-icon>
                                </div>
                            </div>
                        </section>
                        <section className="Mate">
                            <img src={Media} alt=""/>
                            <div className="MateDetails">
                                <p className="Mate__name">Offordile Chimaobi Victor </p>
                                <p className="Mate__Position">Web Developer</p>
                                <div className="Socials">
                                    <ion-icon name="logo-facebook"></ion-icon>
                                    <ion-icon name="logo-twitter"></ion-icon>
                                    <ion-icon name="logo-instagram"></ion-icon>
                                    <ion-icon name="logo-linkedin"></ion-icon>
                                </div>
                            </div>
                        </section>
                        <section className="Mate">
                            <img src={SunEngMarket} alt=""/>
                            <div className="MateDetails">
                                <p className="Mate__name">CHRISTIAN NWAOKOH </p>
                                <p className="Mate__Position">MARKETING MANAGER</p>
                                <div className="Socials">
                                    <ion-icon name="logo-facebook"></ion-icon>
                                    <ion-icon name="logo-twitter"></ion-icon>
                                    <ion-icon name="logo-instagram"></ion-icon>
                                    <ion-icon name="logo-linkedin"></ion-icon>
                                </div>
                            </div>
                        </section>
                    </Carousel>
                </section>

            </section>
        </Aux>
    )
}

export default team