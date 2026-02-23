import Link from "next/link";
import React from "react";

const BannerSection = () => {
  return (
    <section className="banner-section pt-130">
      <div className="container">
        <div className="row">
          {/* Full width banner */}
          <div className="col-lg-12">
            <div className="foodix-banner-item style-three mb-30 wow fadeInDown">
              <div
                className="banner-inner-wrap bg_cover"
                style={{ backgroundImage: "url(assets/images/bg/banner-bg-2.jpg)" }}
              >
                <div className="banner-img">
                  <img src="assets/images/bg/bn-img-5.png" alt="banner image" />
                </div>
                <div className="banner-content">
                  <span className="sub-title">Premium Berger</span>
                  <h3>Italian burger</h3>
                  <p>
                    Experience Italy on a bun with our Italian burger—juicy, seasoned beef
                    patty, melted mozzarella.
                  </p>
                  <Link href="/contact" className="theme-btn style-one">
                    Make a Booking
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Two half width banners */}
          <div className="col-xl-6">
            <div className="foodix-banner-item style-three mb-30 wow fadeInUp">
              <div
                className="banner-inner-wrap bg_cover"
                style={{ backgroundImage: "url(assets/images/bg/banner-bg-3.jpg)" }}
              >
                <div className="banner-img">
                  <img src="assets/images/bg/bn-img-1.png" alt="banner image" />
                </div>
                <div className="banner-content">
                  <span>Premium skewers</span>
                  <h3>chicken skewers</h3>
                  <p>
                    Savor the tantalizing taste of our expertly grilled chicken skewers,
                    marinated.
                  </p>
                  <Link href="/contact" className="theme-btn style-one">
                    Make a Booking
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6">
            <div className="foodix-banner-item style-three mb-30 wow fadeInUp">
              <div
                className="banner-inner-wrap bg_cover"
                style={{ backgroundImage: "url(assets/images/bg/banner-bg-4.jpg)" }}
              >
                <div className="banner-img">
                  <img src="assets/images/bg/bn-img-2.png" alt="banner image" />
                </div>
                <div className="banner-content">
                  <span>Premium Wrap</span>
                  <h3>chicken Wrap</h3>
                  <p>
                    Indulge in our savory chicken wrap, a delightful blend of tender grilled
                    chicken.
                  </p>
                  <Link href="/contact" className="theme-btn style-one">
                    Make a Booking
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

export default BannerSection;
