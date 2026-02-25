'use client';

import Link from 'next/link';
import ResponsivePicture from '@/components/elements/ResponsivePicture';

const S3_MOVIL = 'https://chuzitos.s3.us-west-2.amazonaws.com/movil';
const EVENTOS_DESKTOP_IMAGE = 'https://chuzitos.s3.us-west-2.amazonaws.com/WhatsApp+Image+2026-02-24+at+11.26.00+AM.jpeg';

export default function EventosCotizarSection() {
  return (
    <section id="eventos" className="booking-section eventos-section">
      <div className="booking-wrapper-three eventos-wrapper bg_cover pt-130 pb-80">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="section-content-box wow fadeInLeft mb-50">
                <div className="section-title mb-50 text-white">
                  <span className="sub-title">
                    <i className="flaticon-party"></i>Eventos
                  </span>
                  <h2>
                    Cotiza tu evento y dale a tus invitados una experiencia memorable con la mejor comida rápida de Colombia 🔥
                  </h2>
                </div>
                <div className="happy-button">
                  <Link href="#" className="theme-btn style-one">
                    Cotizar
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="eventos-right-placeholder wow fadeInRight mb-50">
                <div className="eventos-image-box">
                  <ResponsivePicture
                    mobileSrc={`${S3_MOVIL}/eventos1.png`}
                    desktopSrc={EVENTOS_DESKTOP_IMAGE}
                    alt="Chuzitos Gourmet - Eventos"
                    breakpoint={768}
                    className="eventos-box-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
