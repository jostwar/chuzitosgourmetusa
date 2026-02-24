'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { menuItems } from '@/lib/menu';
import { useCart } from '@/context/CartContext';

const CATEGORY_ALL = 'Todas';

/* Iconos por categoría: Maíz, BBQ, Arepa, Plato, Kids, Plátano, Hot dog, Papa, Bebidas */
const CATEGORY_ICONS: Record<string, string> = {
  [CATEGORY_ALL]: 'flaticon-food-tray',
  'ASADOS': 'fas fa-fire',           // BBQ
  'BEBIDAS': 'fas fa-glass-martini-alt', // Bebidas
  'CHUZO AREPA': 'fas fa-bread-slice', // Arepa / redondo tipo pancake
  'CHUZO DESGRANADO': 'fas fa-corn',   // Maíz
  'ENTRADAS': 'fas fa-utensils',     // Plato
  'MAZORCAS': 'fas fa-corn',         // Maíz
  'MENÚ INFANTIL': 'fas fa-child',   // Kids
  'PATACÓN': 'fas fa-leaf',          // Plátano
  'PERROS CALIENTES': 'fas fa-hotdog', // Hot dog
  'SALCHIPAPAS': 'fas fa-french-fries', // Papa / papas fritas
  'SÁNDWICH': 'flaticon-sandwich',
};

function getCategoryIcon(category: string): string {
  return CATEGORY_ICONS[category] ?? 'flaticon-food-tray';
}

const CHUZO_DESGRANADO = 'CHUZO DESGRANADO';

function getItemId(item: { title: string; category: string }) {
  return `menu-${item.title}-${item.category}`;
}

export default function BiryaniMenuSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>(CHUZO_DESGRANADO);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { addItem } = useCart();

  const getQty = (item: (typeof menuItems)[0]) =>
    quantities[getItemId(item)] ?? 1;
  const setQty = (item: (typeof menuItems)[0], delta: number) => {
    const id = getItemId(item);
    setQuantities((prev) => {
      const next = (prev[id] ?? 1) + delta;
      return { ...prev, [id]: Math.max(1, next) };
    });
  };

  const categories = useMemo(() => {
    const set = new Set(menuItems.map((item) => item.category));
    const list = Array.from(set).sort((a, b) => a.localeCompare(b));
    const sinDesgranado = list.filter((c) => c !== CHUZO_DESGRANADO);
    return [CHUZO_DESGRANADO, ...sinDesgranado, CATEGORY_ALL];
  }, []);

  const filteredItems = useMemo(() => {
    if (selectedCategory === CATEGORY_ALL) return menuItems;
    return menuItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="menu" className="biryani-menu-section pt-130 pb-100 gray-bg">
      <div className="container">
        {/* Section Title */}
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center mb-30 wow fadeInDown">
              <span className="sub-title">
                <i className="fas fa-utensils"></i>Menu
              </span>
              <h2>Todas nuestras especialidades</h2>
            </div>
          </div>
        </div>

        {/* Category filters */}
        <div className="row mb-40">
          <div className="col-12">
            <div className="menu-category-filters d-flex flex-wrap justify-content-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`menu-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  <i className={getCategoryIcon(cat)} />
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="row">
          {filteredItems.map((item, index) => (
            <div className="col-xl-6" key={index}>
              <div className="menu-item style-ten mb-30 wow fadeInDown">
                <div className="menu-thumbnail position-relative menu-thumbnail-circle">
                  <Image
                    src={item.img}
                    alt={`${item.title} Thumbnail`}
                    width={160}
                    height={160}
                    className="menu-circle-img"
                  />
                  <div className="menu-after">
                    <Image
                      src="/assets/images/home-beef/menu/menu-after.png"
                      alt="Menu background overlay"
                      width={600}
                      height={400}
                    />
                  </div>
                </div>
                <div className="menu-info">
                  <h3 className="title">
                    <Link href="/menu-details">{item.title}</Link>
                  </h3>
                  <p>{item.description}</p>
                  {item.price !== "0.00" ? (
                    <div className="menu-info-actions">
                      <p className="price mb-0">${item.price}</p>
                      <div className="quantity-input menu-quantity">
                        <button
                          type="button"
                          className="quantity-down"
                          onClick={() => setQty(item, -1)}
                          aria-label="Menos"
                        >
                          <i className="far fa-minus"></i>
                        </button>
                        <input
                          className="quantity"
                          type="text"
                          value={getQty(item)}
                          readOnly
                        />
                        <button
                          type="button"
                          className="quantity-up"
                          onClick={() => setQty(item, 1)}
                          aria-label="Más"
                        >
                          <i className="far fa-plus"></i>
                        </button>
                      </div>
                      <button
                        type="button"
                        className="theme-btn style-two btn-add-cart-sm"
                        onClick={() =>
                          addItem({
                            id: getItemId(item),
                            title: item.title,
                            price: parseFloat(item.price),
                            img: item.img,
                            quantity: getQty(item),
                            category: item.category,
                          })
                        }
                      >
                        <i className="far fa-cart-plus"></i> Añadir
                      </button>
                    </div>
                  ) : (
                    <p className="price">
                      <span>Consultar</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nota de referencia e inventario - solo cuando se muestra BEBIDAS */}
        {selectedCategory === 'BEBIDAS' && (
          <div className="row mt-20">
            <div className="col-12 text-center">
              <p className="menu-section-disclaimer mb-0" style={{ fontSize: '0.85rem', color: '#666' }}>
                * Algunas imágenes son de referencia, producto sujeto a disponibilidad en inventario.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
