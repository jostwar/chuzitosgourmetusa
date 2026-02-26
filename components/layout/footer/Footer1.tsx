'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
interface FooterProps {
  paddingClass?: string; // optional prop for custom padding
}



export default function Footer({ paddingClass = 'pt-120 pb-75' }: FooterProps) {
  const [year, setYear] = useState<number>();

  useEffect(() => setYear(new Date().getFullYear()), []);
  return (
    <footer className="footer-default p-r z-1 footer-bg-image">
      <div className="container">
        {/*=== Footer Widgets ===*/}
        <div className={`footer-widget-area ${paddingClass}`}>
        {/* <div className="footer-widget-area "> */}
          <div className="row">
            {/*=== About Widget ===*/}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="footer-widget footer-about-widget mb-40 wow fadeInUp">
                <div className="widget-content">
                  <div className="footer-logo mb-25">
                    <Link href="/">
                      <Image
                        src="https://chuzitos.s3.us-west-2.amazonaws.com/chuzitosmiamilogo.png"
                        alt="Chuzitos Gourmet USA"
                        width={200}
                        height={150}
                        sizes="200px"
                        style={{ height: "auto" }}
                        className="chuzitos-logo"
                      />
                    </Link>
                  </div>
                  <p className="footer-tagline mb-3">
                    Donde quieras, cuando quieras. Sabor colombiano en el corazón de Florida.
                  </p>
                  <ul className="social-link">
                    <li>
                      <a href="https://www.instagram.com/chuzitosgourmetmiami?igsh=eDk4aTIzeTh4MXVz" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/*=== Contact Widget ===*/}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="footer-widget footer-contact-widget mb-40 wow fadeInUp">
                <div className="widget-content">
                  <h4 className="widget-title">Contáctanos</h4>
                  <ul className="address-list">
                    <li>Sede Kendall 6605 SW 127th Ave, Miami, FL 33183, USA</li>
                    <li>
                      <Link href="tel:+17866582780">+1 (786) 658-2780</Link>
                    </li>
                    <li>
                      <Link href="mailto:kendall@chuzitosgourmetusa.com">kendall@chuzitosgourmetusa.com</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/*=== Quick Links ===*/}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="footer-widget footer-nav-widget mb-40 wow fadeInUp">
                <div className="widget-content">
                  <h4 className="widget-title">Enlaces</h4>
                  <ul className="widget-menu">
                    <li>
                      <Link href="/#menu">Menú</Link>
                    </li>
                    <li>
                      <Link href="/about">Nosotros</Link>
                    </li>
                    <li>
                      <Link href="/#eventos">Eventos</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/*=== Opening Hours ===*/}
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="footer-widget footer-opening-widget mb-40 wow fadeInUp">
                <div className="widget-content">
                  <h4 className="widget-title">Horarios</h4>
                  <ul className="opening-schedule opening-schedule-by-day">
                    <li className="opening-location">Kendall</li>
                    <li><span className="opening-days">Martes a jueves</span><span className="opening-hours">6:30pm - 11pm</span></li>
                    <li><span className="opening-days">Viernes y sábado</span><span className="opening-hours">6:30pm - 1am</span></li>
                    <li><span className="opening-days">Domingo</span><span className="opening-hours">6pm - 11:30pm</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*=== Copyright Area ===*/}
      <div className="copyright-area text-center">
        <div className="container">
          <div className="copyright-text">
            <p>&copy; {year || '2026'} Chuzitos Gourmet USA. All rights reserved. Powered by iPeakAgency.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
