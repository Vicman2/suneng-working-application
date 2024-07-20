import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Aux from '../../hoc/Aux';
import './Team.css'
import CEO from './Assets/CEO.jpg';
import Founder from './Assets/Founder.jpg';
import Media from './Assets/Media.jpg';
import Machinist from './Assets/machinist.jpg'
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
                <p className="Team__Header">About Us</p>
                <p className="About_Content" data-aos="fade-down-right">The company SUNENG was founded in 1982, SUNENG AND WORKS LIMITED develop into 
                    an inventive state of craft company in mechanical and civil Enginnering. 
                    We ensure that our staffs, technicians and engineers are properly trained to call 
                    them to terms with the latest technology and industry best practices. We are 
                    equipped with mordern mechaneries and equipment for construction to ensure that Jobs are 
                    perfectly done. Satisfaction is our gurantee. Our clients in both private and public 
                    sectors can attest to our job quality and on time delivery. The Company is now being 
                    manageed by Eng. Nnadi Samuel who have proven himself worthy after the founder(The father)
                    died.</p>
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
                            <img src={Machinist} alt="Maintenance"/>
                            <div className="MateDetails">
                                <p className="Mate__name">Excel Machiary</p>
                                <p className="Mate__Position">Machinist</p>
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