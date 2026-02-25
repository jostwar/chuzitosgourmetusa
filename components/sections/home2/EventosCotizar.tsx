'use client';

import Link from 'next/link';
import Image from 'next/image';

const EVENTOS_RIGHT_IMAGE = 'https://chuzitos.s3.us-west-2.amazonaws.com/WhatsApp+Image+2026-02-24+at+11.26.00+AM.jpeg';

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
                  <Image
                    src={EVENTOS_RIGHT_IMAGE}
                    alt="Chuzitos Gourmet - Eventos"
                    width={500}
                    height={500}
                    className="eventos-box-img"
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
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
