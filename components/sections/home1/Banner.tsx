'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-wrapper-four">
        {/*=== Background Image ===*/}
        <div
          className="hero-bg bg_cover"
          style={{ backgroundImage: 'url(/assets/images/hero/hero-four_bg.png)' }}
        ></div>

        <div className="container">
          <div className="row align-items-center">
            {/*=== Hero Content ===*/}
            <div className="col-xl-6 order-2 order-xl-1">
              <div className="hero-content">
                <span className="tag-line wow fadeInDown" data-wow-delay=".5s">
                  La comida rápida más TOP
                </span>
                <h1 className="wow fadeInUp" data-wow-delay=".6s">
                  Enjoy our <span>delicious</span> food
                </h1>
                <p className="wow fadeInDown" data-wow-delay=".7s">
                  Donde quieras, cuando quieras. Sabor colombiano en el corazón de Florida.
                </p>
                <div className="hero-button wow fadeInUp" data-wow-delay=".75s">
                  <Link href="/" className="theme-btn style-one">
                    Order Now
                  </Link>
                </div>
              </div>
            </div>

            {/*=== Hero Image ===*/}
            <div className="col-xl-6 order-1 order-xl-2">
              <div className="hero-image text-center text-xl-end">
                <div className="shape wow bounceInUp">
                  <span>
                    <Image
                      src="/assets/images/hero/text-03.png"
                      alt="20% OFF"
                      width={150}
                      height={150}
                    />
                  </span>
                </div>

                <Image
                  className="hero-img wow fadeInRight"
                  data-wow-delay=".9s"
                  src="/assets/images/hero/hero-four_img1.png"
                  alt="Hero Image"
                  width={650}
                  height={600}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
