import Layout from "@/components/layout/Layout";
import Image from "next/image";

export default function ContactPage() {
  return (
    <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Contacto" breadcrumbBannerBg="footer">
      {/*====== Sección de contacto ======*/}
      <section className="contact-section pt-120 gray-bg">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-md-12">
              <div className="contact-wrapper">
                <div className="section-title mb-50 wow fadeInDown">
                  <span className="sub-title">Escríbenos</span>
                  <h2>
                    ¿Tienes preguntas? <br /> ¡Contáctanos!
                  </h2>
                </div>
                <form className="contact-form wow fadeInUp">
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
                          placeholder="Asunto"
                          name="subject"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form_group">
                        <input
                          type="text"
                          className="form_control"
                          placeholder="Motivo"
                          name="service"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form_group">
                        <textarea
                          className="form_control"
                          rows={5}
                          placeholder="Escribe tu mensaje"
                          name="message"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form_group">
                        <button className="theme-btn style-one">
                          Enviar
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-xl-6 col-md-12 d-none d-xl-block">
              <div className="contact-image-box text-end wow fadeInDown">
                <Image
                  src="https://chuzitos.s3.us-west-2.amazonaws.com/546450254_17951380650008551_4855666058276831025_n.jpg"
                  alt="Chuzitos Gourmet - Contacto"
                  width={510}
                  height={860}
                  className="w-full"
                  style={{ height: "auto", objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*====== Start Contact Info Section ======*/}
      <section className="contact-info-section pt-130 pb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="iconic-info-box style-one text-center mb-30 wow fadeInDown">
                <div className="icon">
                  <i className="far fa-map-marker-alt"></i>
                </div>
                <div className="content">
                  <h4>Dirección</h4>
                  <p>
                    Sede Kendall<br />
                    6605 SW 127th Ave<br />
                    Miami, FL 33183, USA
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="iconic-info-box style-one text-center mb-30 wow fadeInDown">
                <div className="icon">
                  <i className="far fa-envelope"></i>
                </div>
                <div className="content">
                  <h4>Correo</h4>
                  <p>
                    <a href="mailto:kendall@chuzitosgourmetusa.com">
                      kendall@chuzitosgourmetusa.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="iconic-info-box style-one text-center mb-30 wow fadeInDown">
                <div className="icon">
                  <i className="far fa-phone-alt"></i>
                </div>
                <div className="content">
                  <h4>Teléfono</h4>
                  <p>
                    <a href="tel:+17866582780">+1 (786) 658-2780</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*====== Start Map Section ======*/}
      <section className="contact-map-section">
        <div className="contact-map-box wow fadeInDown">
          <iframe
            title="Chuzitos Gourmet - Sede Kendall"
            height={600}
            src="https://maps.google.com/maps?q=6605+SW+127th+Ave,+Miami,+FL+33183&t=&z=16&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
            className="w-full"
          />
        </div>
      </section>
    </Layout>
  );
}
