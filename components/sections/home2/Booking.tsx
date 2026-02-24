import React from 'react';
import Link from 'next/link';

const BookingSection = () => {
  return (
    <section className="booking-section">
      <div className="booking-wrapper-three bg_cover pt-130 pb-80">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              {/* Section Content Box */}
              <div className="section-content-box wow fadeInLeft mb-50">
                <div className="section-title mb-50 text-white">
                  <span className="sub-title">
                    <i className="far fa-calendar-alt"></i>Reserva
                  </span>
                  <h2>
                    ¿Necesitas reserva? <br /> Reserva tu mesa ahora
                  </h2>
                </div>
                <div className="happy-button">
                  <p>Reserva en línea</p>
                  <a href="tel:+17866582780" className="theme-btn style-one">
                    <i className="far fa-phone"></i> +1 (786) 658-2780
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              {/* Booking Form Box */}
              <div className="booking-form-box wow fadeInRight mb-50">
                <div className="booking-title text-center">
                  <h3>Reserva tu mesa</h3>
                </div>
                <form className="booking-form">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="text"
                          className="form_control"
                          placeholder="Tu nombre"
                          name="name"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="email"
                          className="form_control"
                          placeholder="Tu correo"
                          name="email"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="text"
                          className="form_control"
                          placeholder="Tu teléfono"
                          name="phone"
                          required
                        />
                        <span className="icon">
                          <i className="far fa-phone"></i>
                        </span>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="text"
                          className="form_control"
                          placeholder="Fecha"
                          id="datepicker"
                          name="date"
                        />
                        <span className="icon">
                          <i className="far fa-calendar-alt"></i>
                        </span>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <select
                        id="people"
                        name="people"
                        className="form_control wide"
                        defaultValue="01"
                        required
                      >
                        <option value="01">1 persona</option>
                        <option value="02">2 personas</option>
                        <option value="03">3 personas</option>
                        <option value="04">4 personas</option>
                        <option value="05">5 personas</option>
                      </select>
                    </div>

                    <div className="col-lg-12">
                      <div className="form_group text-center">
                        <Link href="/contact" className="theme-btn style-one">
                          Reserva
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
