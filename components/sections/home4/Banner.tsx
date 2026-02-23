import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <section className="hero-section">
      {/* Hero Wrapper */}
      <div
        className="hero-wrapper-three bg_cover"
        style={{ backgroundImage: "url(assets/images/hero/hero-three_bg.jpg)" }}
      >
        <div className="shape shape-one scene">
          <span data-depth=".5">
            <img src="assets/images/hero/shape-6.png" alt="shape image" />
          </span>
        </div>
        <div className="shape shape-two scene">
          <span data-depth=".7">
            <img src="assets/images/hero/shape-7.png" alt="shape image" />
          </span>
        </div>
        <div className="shape shape-three">
          <span>
            <img src="assets/images/hero/shape-8.png" alt="shape image" />
          </span>
        </div>

        {/* Hero Image */}
        <div className="hero-image wow fadeInRight" data-wow-delay=".5s">
          <img src="assets/images/hero/hero-three_img1.png" alt="Hero Image" />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {/* Hero Content */}
              <div className="hero-content">
                <h1 className="wow fadeInDown" data-wow-delay=".5s">
                  Cheese Delight Pizza
                </h1>
                <p className="wow fadeInDown" data-wow-delay=".6s">
                  Savor the perfection of our Italian Cheese Pizza—crispy golden
                  crust, premium mozzarella, Parmesan, and ricotta...
                </p>
                <div className="hero-button wow fadeInDown" data-wow-delay=".7s">
                  <Link href="/contact" className="theme-btn style-one">
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
