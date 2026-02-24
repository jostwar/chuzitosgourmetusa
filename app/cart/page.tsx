'use client';

import React from "react";
import { useCart } from "@/context/CartContext";
import {
  getAddonsForCategory,
  getAddonsLabel,
  CATEGORY_SALCHIPAPAS,
  CATEGORY_CHUZO_DESGRANADO,
} from "@/lib/addons";
import Image from "next/image";
import Layout from "@/components/layout/Layout";
import Link from "next/link";

function hasAddons(category: string | undefined): boolean {
  return category === CATEGORY_SALCHIPAPAS || category === CATEGORY_CHUZO_DESGRANADO;
}

export default function CartPage() {
  const { items: cartItems, updateQuantity, removeItem, setAddOnQuantity } = useCart();

  const handleIncrease = (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) updateQuantity(id, item.quantity + 1);
  };

  const handleDecrease = (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) updateQuantity(id, item.quantity - 1);
  };

  const lineSubtotal = (item: (typeof cartItems)[0]) => {
    const addonsTotal = item.addOns?.reduce((s, a) => s + a.price * a.quantity, 0) ?? 0;
    return item.price * item.quantity + addonsTotal;
  };
  const cartSubtotal = cartItems.reduce((sum, item) => sum + lineSubtotal(item), 0);

  const orderTotal = cartSubtotal;

  return (
    <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Carrito" breadcrumbBannerBg="footer">
      <section className="cart-section pt-130 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              <div className="cart-wrapper wow fadeInUp">
                <div className="cart-table table-responsive">
                  <table className="table">
                    <tbody>
                      {cartItems.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center py-5">
                            Tu carrito está vacío 😢
                          </td>
                        </tr>
                      ) : (
                        cartItems.map((item) => (
                          <React.Fragment key={item.id}>
                            <tr>
                              <td className="thumbnail-title cart-item-cell">
                                <div className="cart-item-img">
                                  <Image
                                    src={item.img}
                                    alt={item.title}
                                    width={100}
                                    height={100}
                                    style={{ objectFit: "cover" }}
                                  />
                                </div>
                                <span className="title cart-item-title">
                                  <Link href="/menu-details">{item.title}</Link>
                                </span>
                              </td>
                              <td className="price">${item.price.toFixed(2)}</td>
                              <td className="quantity">
                                <div className="quantity-input">
                                  <button
                                    onClick={() => handleDecrease(item.id)}
                                    className="quantity-down"
                                  >
                                    <i className="far fa-minus"></i>
                                  </button>
                                  <input
                                    className="quantity"
                                    type="text"
                                    value={item.quantity}
                                    readOnly
                                  />
                                  <button
                                    onClick={() => handleIncrease(item.id)}
                                    className="quantity-up"
                                  >
                                    <i className="far fa-plus"></i>
                                  </button>
                                </div>
                              </td>
                              <td className="subtotal">
                                ${lineSubtotal(item).toFixed(2)}
                              </td>
                              <td className="remove">
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="btn btn-link p-0 text-danger"
                                >
                                  <i className="fas fa-trash-alt"></i>
                                </button>
                              </td>
                            </tr>
                            {hasAddons(item.category) && (
                              <tr key={`${item.id}-addons`} className="cart-addons-row">
                                <td colSpan={5} className="cart-addons-cell">
                                  <div className="cart-addons">
                                    <p className="cart-addons-title">
                                      {getAddonsLabel(item.category)}:
                                    </p>
                                    <ul className="cart-addons-list">
                                      {getAddonsForCategory(item.category).map((addon) => {
                                        const current = item.addOns?.find((a) => a.id === addon.id);
                                        const qty = current?.quantity ?? 0;
                                        return (
                                          <li key={addon.id} className="cart-addons-item">
                                            <span className="cart-addons-name">{addon.name}</span>
                                            <span className="cart-addons-price">
                                              ${addon.price.toFixed(2)}
                                            </span>
                                            <div className="cart-addons-qty">
                                              <button
                                                type="button"
                                                className="cart-addons-qty-btn"
                                                onClick={() => setAddOnQuantity(item.id, addon, Math.max(0, qty - 1))}
                                                aria-label="Menos"
                                              >
                                                <i className="far fa-minus"></i>
                                              </button>
                                              <span className="cart-addons-qty-value">{qty}</span>
                                              <button
                                                type="button"
                                                className="cart-addons-qty-btn"
                                                onClick={() => setAddOnQuantity(item.id, addon, qty + 1)}
                                                aria-label="Más"
                                              >
                                                <i className="far fa-plus"></i>
                                              </button>
                                            </div>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                    {item.addOns && item.addOns.length > 0 && (
                                      <p className="cart-addons-selected">
                                        Añadidos: {item.addOns.map((a) => `${a.quantity}× ${a.name}`).join(", ")}
                                      </p>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="cart-middle mt-40 wow fadeInUp">
                <div className="row">
                  <div className="col-lg-7">
                    <div className="coupon-box mb-30">
                      <form>
                        <div className="form_group">
                          <input
                            type="text"
                            className="form_control"
                            placeholder="Código de cupón"
                          />
                          <button
                            className="theme-btn style-one"
                            type="submit"
                          >
                            Aplicar cupón
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="update-cart float-lg-right mb-30">
                      <Link href="/#menu" className="theme-btn style-one">
                        Seguir comprando
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4">
              <div className="shopping-cart-total mb-30 wow fadeInUp">
                <div className="cart-pickup-legend">
                  <h4 className="cart-pickup-title">PEDIDO PARA PICK-UP o CONSUMO EN SEDE</h4>
                  <p className="cart-pickup-subtitle">Para delivery pide ahora en</p>
                  <div className="cart-delivery-buttons">
                    <a
                      href="https://www.ubereats.com/store/chuzitos-gourmet-china-food/Y7pwWrK6U1iga2oYcb65CQ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="theme-btn style-two btn-platform"
                    >
                      Uber Eats
                    </a>
                    <a href="#" className="theme-btn style-two btn-platform btn-platform-pending">
                      DoorDash
                    </a>
                  </div>
                </div>
                <h4 className="title">Total del carrito</h4>
                <table className="table mb-25">
                  <tbody>
                    <tr>
                      <td>Subtotal</td>
                      <td className="price">${cartSubtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="total">
                        <span>Total del pedido</span>
                      </td>
                      <td className="total price">
                        <span>${orderTotal.toFixed(2)}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Link
                  href={cartItems.length > 0 ? "/checkout" : "#"}
                  className={`theme-btn style-one ${cartItems.length === 0 ? "disabled" : ""}`}
                  aria-disabled={cartItems.length === 0}
                >
                  Proceder al pago
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
