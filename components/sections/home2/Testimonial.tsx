"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const GOOGLE_REVIEWS_LINK = "https://share.google/k7I51u3iwQgHF28Un";

const googleReviews = [
  {
    name: "Carlos M.",
    rating: 5,
    text: "Los chuzos desgranados son una delicia. El sabor barranquillero auténtico y el queso costeño hacen la diferencia. Recomendado.",
    date: "Hace 2 semanas",
  },
  {
    name: "María G.",
    rating: 5,
    text: "Excelente atención y la comida llegó súper rápido. El perro chuzo de pollo está increíble. Volveremos seguro.",
    date: "Hace 1 mes",
  },
  {
    name: "Andrés R.",
    rating: 5,
    text: "La mejor salchipapa de la zona. Las porciones son generosas y el precio muy bueno. Chuzitos se ha vuelto nuestro favorito.",
    date: "Hace 3 semanas",
  },
  {
    name: "Laura P.",
    rating: 5,
    text: "Probamos el menú infantil y a los niños les encantó. Todo muy limpio y el sabor de la salsa de la casa es único.",
    date: "Hace 2 meses",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <ul className="ratings" aria-label={`${rating} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <li key={star}>
          <i className={star <= rating ? "fas fa-star" : "far fa-star"} />
        </li>
      ))}
    </ul>
  );
}

const TestimonialSection = () => {
  return (
    <>
      <section className="testimonial-section pt-130 pb-80 white-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center mb-50 wow fadeInDown">
                <span className="sub-title">
                  <i className="fas fa-star"></i>Reseñas
                </span>
                <h2>Lo que dicen en Google</h2>
                <p className="mt-3 mb-0">
                  <a
                    href={GOOGLE_REVIEWS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="google-reviews-link"
                  >
                    Ver todas las reseñas en Google
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="google-reviews-slider-wrap">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              loop={googleReviews.length >= 2}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              navigation={true}
              breakpoints={{
                0: { slidesPerView: 1 },
                576: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
              }}
              className="testimonial-slider-three wow fadeInUp google-reviews-slider"
            >
            {googleReviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="testimonial-item style-four google-review-card">
                  <div className="testimonial-content">
                    <div className="author-thumb-item">
                      <div className="author-thumb author-thumb-google">
                        <span className="author-initial">
                          {review.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="author-info">
                        <h5>{review.name}</h5>
                        <span className="position">{review.date}</span>
                      </div>
                    </div>
                    <StarRating rating={review.rating} />
                    <p>{review.text}</p>
                    <div className="google-badge">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <span>Google</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialSection;
