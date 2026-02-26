'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useMemo } from 'react';
import { menuItems } from '@/lib/menu';
import { useCart } from '@/context/CartContext';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const CHUZO_DESGRANADO = 'CHUZO DESGRANADO';
const IMG_WIDTH = 348;
const IMG_HEIGHT = 430;

const KebabMenuSlider = () => {
  const router = useRouter();
  const chuzoItems = useMemo(
    () => menuItems.filter((item) => item.category === CHUZO_DESGRANADO),
    []
  );
  const { addItem } = useCart();

  return (
    <section className="kebab-menu-section chuzo-desgranado-slider pt-80 pb-90">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center mb-45 wow fadeInDown">
              <span className="sub-title">
                <i className="flaticon-healthy-food"></i>Menu Chuzos Desgranados
              </span>
              <h2>Disfruta el auténtico sabor Barranquillero</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid chuzo-desgranado-slider-wrap">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={24}
          slidesPerView={3}
          loop={chuzoItems.length >= 3}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 16 },
            576: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            992: { slidesPerView: 3, spaceBetween: 24 },
            1200: { slidesPerView: 4, spaceBetween: 24 },
          }}
        >
          {chuzoItems.map((item, index) => (
            <SwiperSlide key={`${item.title}-${index}`} className="chuzo-desgranado-slide">
              <div className="menu-item style-nine chuzo-desgranado-card">
                <div className="menu-thumbnail menu-thumbnail-348x430">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={IMG_WIDTH}
                    height={IMG_HEIGHT}
                    sizes="(max-width: 576px) 100vw, (max-width: 768px) 50vw, (max-width: 992px) 33vw, 348px"
                    className="chuzo-desgranado-img"
                  />
                  <div className="hover-content">
                    <div className="menu-content-wrap">
                      <div className="menu-info">
                        <h3 className="title">
                          <Link href="/menu-details">{item.title}</Link>
                        </h3>
                        <p className="price">
                          {item.price === '0.00' ? (
                            'Consultar'
                          ) : (
                            <>
                              <span className="currency">$</span>
                              {item.price}
                            </>
                          )}
                        </p>
                      </div>
                      <div className="menu-button">
                        {item.price !== '0.00' ? (
                          <button
                            type="button"
                            className="cart-button"
                            onClick={() => {
                              addItem({
                                id: `menu-${item.title}-${item.category}`,
                                title: item.title,
                                price: parseFloat(item.price),
                                img: item.img,
                                category: item.category,
                              });
                              router.push('/cart');
                            }}
                          >
                            <i className="far fa-shopping-cart"></i>
                          </button>
                        ) : (
                          <Link href="/contact" className="cart-button">
                            <i className="far fa-shopping-cart"></i>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default KebabMenuSlider;
