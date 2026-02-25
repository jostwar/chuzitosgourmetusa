import Image from 'next/image';
import Link from 'next/link';

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
          {/* Left Column - imagen 410x455 */}
          <div className="col-xl-4 col-md-6">
            <div className="food-item mb-50">
              <div className="food-thumbnail wow fadeInUp">
                <Image
                  src="/assets/images/home-beef/about/food1.png"
                  alt="Maíz con salsa Chuzitos Gourmet"
                  width={410}
                  height={455}
                  priority
                  sizes="(max-width: 576px) 100vw, (max-width: 991px) 50vw, 410px"
                />
              </div>
            </div>
          </div>

          {/* Center Column - imagen 410x343 + caja de pedido */}
          <div className="col-xl-4 col-md-6">
            <div className="food-item mb-50 wow fadeInDown">
              <div className="food-thumbnail">
                <Image
                  src="/assets/images/home-beef/about/food2.png"
                  alt="Menú infantil Chuzitos Gourmet"
                  width={410}
                  height={343}
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
                <Link href="/contact" className="theme-btn style-one">
                  Ordenar ahora
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - imagen 410x695 */}
          <div className="col-xl-4 col-md-12">
            <div className="food-item mb-50 wow fadeInRight">
              <div className="food-thumbnail">
                <Image
                  src="/assets/images/home-beef/about/food3.png"
                  alt="Pollo y papas Chuzitos Gourmet"
                  width={410}
                  height={695}
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
