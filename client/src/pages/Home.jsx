/* eslint-disable no-unused-vars */
// Home.js
import React from "react";

export const Home = () => {
  return (
    <>
      <section className="section-hero" >
        <div className="container grid grid-two-cols">
          <div className="hero-content">
            <p>We are the world best IT service providers</p>
            <h1>Welcome to my portfolio</h1>
            <p>
              Arey you ready to take you business to the next level width
              the best IT service ever ? You are in right place . We will
              take your business to the next level through our constant support.
            </p>
            <a href="/contact">
              <button className="btn secondary-btn">Connect Now</button>
            </a>
            <a href="/services">
              <button className="btn secondary-btn">Learn More</button>
            </a>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/login.png" alt="home" width="500" height="400" />
        </div>
      </section>
    </>
  );
};
