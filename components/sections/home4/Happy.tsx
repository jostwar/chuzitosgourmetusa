import React from "react";
import Link from "next/link";

const HappyHourSection = () => {
  return (
    <section className="happy-hour-section">
      {/* Booking Wrapper */}
      <div
        className="happy-wrapper p-r z-1 bg_cover pt-120 pb-120"
        style={{ backgroundImage: "url(assets/images/bg/order-bg3.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              {/* Section Content Box */}
              <div className="section-content-box text-white wow fadeInDown">
                <div className="section-title mb-20">
                  <span className="sub-title">50% OFF ALL PREMIUM PIZZAS</span>
                  <h2>HAPPY SUNDAY</h2>
                </div>
                <p>
                  Happy Sunday Premium Pizza is a delightful blend of grilled chicken
                  Italian sausage, bell peppers, onions, and gooey mozzarella.
                </p>
                <div className="happy-button">
                  <p>Order Online</p>
                  <a href="tel:+555-657-8876" className="theme-btn style-one">
                    <i className="far fa-phone-alt"></i>+555-657-8876
                  </a>
                  <Link href="/contact" className="theme-btn style-one">
                    <i className="far fa-hand-point-up"></i>Make A Booking
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

export default HappyHourSection;
