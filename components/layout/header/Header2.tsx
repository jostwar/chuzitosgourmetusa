'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Menu from '../Menu';

interface HeaderProps {
  scroll: boolean;
  isMobileMenu: boolean;
  handleMobileMenu: () => void;
  handlePopup: () => void;
  isSidebar: boolean;
  handleSidebar: () => void;
}

export default function Header({
  scroll,
  isMobileMenu,
  handleMobileMenu,
  handlePopup,
  isSidebar,
  handleSidebar,
}: HeaderProps) {
  const { items: cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Offcanvas overlay */}
      <div className={`offcanvas__overlay ${isMenuOpen ? 'overlay-open' : ''}`}></div>

      <header
        className={`header-area transparent-header ${
          isSticky ? 'sticky' : ''
        }`}
      >
        <div className="container">
          <div className="header-navigation">
            <div className="nav-overlay"></div>
            <div className="primary-menu">
              {/*=== Site Branding: logo solo al hacer scroll ===*/}
              <div className="site-branding">
                {isSticky && (
                  <Link href="/" className="brand-logo">
                    <Image
                      src="https://chuzitos.s3.us-west-2.amazonaws.com/Chuzitos+Blanco+.png"
                      alt="Chuzitos Gourmet USA"
                      width={200}
                      height={150}
                      sizes="200px"
                      className="chuzitos-logo"
                    />
                  </Link>
                )}
              </div>

              <div className="nav-inner-menu">
                {/*=== Main Menu ===*/}
                <nav className={`foodix-nav-menu ${isMenuOpen ? 'menu-on' : ''}`}>
                  <div className="main-menu ">
                    <div className="mobile-logo mb-30 d-block d-xl-none text-center">
                      <Link href="/" className="brand-logo">
                        <Image
                          src="https://chuzitos.s3.us-west-2.amazonaws.com/Chuzitos+Blanco+.png"
                          alt="Chuzitos Gourmet USA"
                          width={200}
                          height={150}
                          sizes="200px"
                          className="chuzitos-logo"
                        />
                      </Link>
                    </div>
                    <Menu />
                  </div>
                </nav>

                {/*=== Nav Right ===*/}
                <div className="nav-right-item">
                  <div className="nav-button d-none d-xl-block">
                    <Link href="/contact" className="theme-btn style-one">
                      Reserva
                    </Link>
                  </div>
                  <Link href="/cart" className="cart-button" aria-label={`Carrito${cartCount > 0 ? `: ${cartCount} artículo${cartCount !== 1 ? 's' : ''}` : ' (vacío)'}`}>
                    <i className="far fa-shopping-cart"></i>
                    {cartCount > 0 && (
                      <span className="cart-count-badge">{cartCount > 99 ? '99+' : cartCount}</span>
                    )}
                  </Link>

                  {/*=== Mobile Toggle ===*/}
                  <div
                    className={`navbar-toggler ${isMenuOpen ? 'active' : ''}`}
                    onClick={handleMenuToggle}
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
