import React, { useEffect } from "react";
import "./Aboutus.css"; // We'll create this file in the next step
import { FaChevronDown } from "react-icons/fa";
import { Link, animateScroll as scroll } from "react-scroll";
import AboutCards from '../AboutCards/AboutCards'
import ProductCarousel from "../ProductCarousel/ProductCarousel";
import NavBar from "../Navbar/Navbar";
import Footer from '../Footer/Footer';

const About = () => {

    // Scroll to top on component mount (when the page is refreshed)
    useEffect(() => {
        scroll.scrollToTop();
    }, []);

    return (

        <div className="about-container">
            <NavBar/>
            <div className="landing-section">
                <div className="landing-content">
                    <img src="/assets/aboutus.png" />
                </div>
                <div className="arrow-down">
                    <Link
                        to="about-section"
                        smooth={true}
                        duration={500}
                        offset={+250}
                    >
                        <FaChevronDown />
                    </Link>
                </div>
            </div>

            <div className="about-section" id="about-section">
                <div className="about-image">
                    <img
                        src="/assets/Group 4.svg"
                        alt="About us"
                    />
                </div>
                <div className="about-text">
                    <h2>About Us</h2>
                    <p>
                        MarketMaven is a leading financial analytics company that leverages
                        cutting-edge data science and artificial intelligence to provide
                        powerful market insights and investment recommendations.
                        Our team of expert analysts and data scientists work tirelessly to
                        analyze market trends, news sentiment, and economic indicators to help
                        investors make well-informed decisions.
                    </p>
                </div>
            </div>

            <AboutCards />
            <ProductCarousel/>

            <div className="team-section">
                <h2>Our Team</h2>
                <div className="team-members">
                    {/* Add your team members and their information here */}
                    {/* You can use a loop to dynamically render team members */}
                    {/* Example: */}
                    <div className="team-member">
                        <img className="team-member-img" src="/assets/kp.png" alt="Team Member" />
                        <h3>Kritika Pathak</h3>
                        <p>Team Lead & Backend Developer</p>
                    </div>
                    <div className="team-member">
                        <img className="team-member-img" src="/assets/ad.png" alt="Team Member" />
                        <h3>Alok Dubey</h3>
                        <p>ML modeling and Training</p>
                    </div>
                    <div className="team-member">
                        <img className="team-member-img"src="/assets/kt.png" alt="Team Member" />
                        <h3>Kartike Tiwari</h3>
                        <p>Front-End Developer</p>
                    </div>
                    <div className="team-member">
                        <img className="team-member-img" src="/assets/rd.jpg" alt="Team Member" />
                        <h3>Ritik Dhiranan</h3>
                        <p>Model Searching and Training</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default About;
