import React from 'react';
import Image from 'next/image';

const HERO_BG =
  'https://chuzitos.s3.us-west-2.amazonaws.com/heroback3.png';
const HERO_LOGO =
  'https://chuzitos.s3.us-west-2.amazonaws.com/LogoModoChuzitos.png';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-wrapper-five p-r">
        {/* Background Image - LCP: optimizada y prioritaria */}
        <div className="hero-bg-img text-center">
          <Image
            src={HERO_BG}
            alt="Food Background"
            width={1920}
            height={1080}
            sizes="100vw"
            priority
            fetchPriority="high"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Main Content */}
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="hero-content text-center">
                <div className="hero-logo-wrap wow fadeInDown" data-wow-delay=".6s">
                  <Image
                    src={HERO_LOGO}
                    alt="Chuzitos Gourmet USA - #AyPapááá"
                    width={754}
                    height={722}
                    sizes="(max-width: 480px) 473px, (max-width: 768px) 510px, 754px"
                    priority
                    fetchPriority="high"
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
