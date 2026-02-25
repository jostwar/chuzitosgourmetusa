import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-wrapper-five p-r">
        {/* Background Image */}
        <div className="hero-bg-img text-center">
          <img src="https://chuzitos.s3.us-west-2.amazonaws.com/heroback3.png" alt="Food Background" />
        </div>

        {/* Main Content */}
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="hero-content text-center">
                <div className="hero-logo-wrap wow fadeInDown" data-wow-delay=".6s">
                  <img
                    src="https://chuzitos.s3.us-west-2.amazonaws.com/ModoChuzito.png"
                    alt="Chuzitos Gourmet USA - #AyPapááá"
                    className="hero-logo-img"
                  />
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
