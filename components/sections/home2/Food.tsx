import Link from 'next/link';
import ResponsivePicture from '@/components/elements/ResponsivePicture';

const S3_MOVIL = 'https://chuzitos.s3.us-west-2.amazonaws.com/movil';

export default function FoodSection() {
  return (
    <section className="our-food-section pt-90">
      <div className="container">
        {/* Section Title - fila aparte para alinear las 3 imágenes por arriba */}
        <div className="row">
          <div className="col-12">
            <div className="section-title mb-50 wow fadeInDown text-center">
              <span className="sub-title">
                <i className="flaticon-burger"></i>#ModoChuzitos
              </span>
              <h2>Antojos para todos</h2>
            </div>
          </div>
        </div>

        <div className="row align-items-start">
          {/* Left Column - móvil: antojos1.png; escritorio: food1.png */}
          <div className="col-xl-4 col-md-6">
            <div className="food-item mb-50">
              <div className="food-thumbnail wow fadeInUp">
                <ResponsivePicture
                  mobileSrc={`${S3_MOVIL}/antojos1.png`}
                  desktopSrc="/assets/images/home-beef/about/food1.png"
                  alt="Maíz con salsa Chuzitos Gourmet"
                  breakpoint={768}
                  priority
                  sizes="(max-width: 576px) 100vw, (max-width: 991px) 50vw, 410px"
                />
              </div>
            </div>
          </div>

          {/* Center Column - móvil: antojos2.png; escritorio: food2.png */}
          <div className="col-xl-4 col-md-6">
            <div className="food-item mb-50 wow fadeInDown">
              <div className="food-thumbnail">
                <ResponsivePicture
                  mobileSrc={`${S3_MOVIL}/antojos2.png`}
                  desktopSrc="/assets/images/home-beef/about/food2.png"
                  alt="Menú infantil Chuzitos Gourmet"
                  breakpoint={768}
                  sizes="(max-width: 576px) 100vw, (max-width: 991px) 50vw, 410px"
                />
              </div>
            </div>

            <div className="iconic-info-box style-two mb-50 wow fadeInUp">
              <div className="icon">
                <i className="far fa-phone-alt"></i>
              </div>
              <div className="content">
                <h4 className="title">Ordena en línea ahora</h4>
                <h4>
                  <Link href="tel:+17866582780">+1 (786) 658-2780</Link>
                </h4>
                <a href="https://wa.me/17866582780" target="_blank" rel="noopener noreferrer" className="theme-btn style-one">
                  Ordenar ahora
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - móvil: antojos3.png; escritorio: food3.png */}
          <div className="col-xl-4 col-md-12">
            <div className="food-item mb-50 wow fadeInRight">
              <div className="food-thumbnail">
                <ResponsivePicture
                  mobileSrc={`${S3_MOVIL}/antojos3.png`}
                  desktopSrc="/assets/images/home-beef/about/food3.png"
                  alt="Pollo y papas Chuzitos Gourmet"
                  breakpoint={768}
                  sizes="(max-width: 576px) 100vw, (max-width: 991px) 50vw, 410px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
