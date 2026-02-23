'use client';

import React, { useState, KeyboardEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type MenuItem = {
  id: string;
  title: string;
  image: string;
  price: string;
  rating: string;
  description: string;
  href?: string;
};

type Category = {
  id: string;
  title: string;
  items: MenuItem[];
};

const menuCategories = [
  {
    id: "cat1",
    name: "Cheese",
    items: [
      {
        title: "Cheese Pizza",
        description: "Melting mozzarella atop a crisp crust a timeless cheese pizza",
        price: 121,
        image: "assets/images/menu/menu-19.png",
        hoverImage: "assets/images/menu/hover-af.png",
      },
      {
        title: "Pesto Paradise",
        description: "Melting mozzarella atop a crisp crust a timeless cheese pizza",
        price: 159,
        image: "assets/images/menu/menu-20.png",
        hoverImage: "assets/images/menu/hover-af.png",
      },
      {
        title: "Cali Fiesta Pie",
        description: "Melting mozzarella atop a crisp crust a timeless cheese pizza",
        price: 210,
        image: "assets/images/menu/menu-21.png",
        hoverImage: "assets/images/menu/hover-af.png",
      },
    ],
  },
  {
    id: "cat2",
    name: "Mushroom",
    items: [
      {
        title: "Cheese Pizza",
        description: "Melting mozzarella atop a crisp crust a timeless cheese pizza",
        price: 121,
        image: "assets/images/menu/menu-3_1.jpg",
        hoverImage: "assets/images/menu/hover-af.png",
      },
      {
        title: "Pesto Paradise",
        description: "Melting mozzarella atop a crisp crust a timeless cheese pizza",
        price: 159,
        image: "assets/images/menu/menu-3_2.jpg",
        hoverImage: "assets/images/menu/hover-af.png",
      },
      {
        title: "Cali Fiesta Pie",
        description: "Melting mozzarella atop a crisp crust a timeless cheese pizza",
        price: 210,
        image: "assets/images/menu/menu-3_3.jpg",
        hoverImage: "assets/images/menu/hover-af.png",
      },
    ],
  },
  {
    id: "cat3",
    name: "Sausage",
    items: [
      {
        title: "Cheese Pizza",
        description: "Melting mozzarella atop a crisp crust a timeless cheese pizza",
        price: 121,
        image: "assets/images/menu/menu-3_4.jpg",
        hoverImage: "assets/images/menu/hover-af.png",
      },
      {
        title: "Pesto Paradise",
        description: "Melting mozzarella atop a crisp crust a timeless cheese pizza",
        price: 210,
        image: "assets/images/menu/menu-3_5.jpg",
        hoverImage: "assets/images/menu/hover-af.png",
      },
      {
        title: "Cali Fiesta Pie",
        description: "Melting mozzarella atop a crisp crust a timeless cheese pizza",
        price: 159,
        image: "assets/images/menu/menu-3_6.jpg",
        hoverImage: "assets/images/menu/hover-af.png",
      },
    ],
  },
  {
    id: "cat4",
    name: "Pepperoni",
    items: [
      {
        title: "Cheese Pizza",
        description: "Melting mozzarella atop a crisp crust a timeless cheese pizza",
        price: 121,
        image: "assets/images/menu/menu-3_7.jpg",
        hoverImage: "assets/images/menu/hover-af.png",
      },
      {
        title: "Pesto Paradise",
        description: "Melting mozzarella atop a crisp crust a timeless cheese pizza",
        price: 154,
        image: "assets/images/menu/menu-3_8.jpg",
        hoverImage: "assets/images/menu/hover-af.png",
      },
      {
        title: "Cali Fiesta Pie",
        description: "Melting mozzarella atop a crisp crust a timeless cheese pizza",
        price: 98,
        image: "assets/images/menu/menu-3_9.jpg",
        hoverImage: "assets/images/menu/hover-af.png",
      },
    ],
  },
];

const MenuSection = () => {
  const [activeTab, setActiveTab] = useState("cat1");

  return (
    <section className="menu-section pt-90 pb-90">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center mb-55 wow fadeInDown">
              <span className="sub-title">Choose your flavor</span>
              <h2>Our Special pizza</h2>
              <p>
                Indulge in the extraordinary with Our Special Pizza. A tantalizing blend
                of succulent toppings, premium cheeses, and a secret sauce, crafted to
                perfection.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="foodix-tabs style-two mb-80">
              <ul className="nav nav-tabs wow fadeInUp">
                {menuCategories.map(({ id, name }) => (
                  <li key={id}>
                    <button
                      className={`nav-link ${activeTab === id ? "active" : ""}`}
                      onClick={() => setActiveTab(id)}
                      type="button"
                    >
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="tab-content wow fadeInDown">
              {menuCategories.map(({ id, items }) => (
                <div
                  key={id}
                  className={`tab-pane fade ${
                    activeTab === id ? "show active" : ""
                  }`}
                  id={id}
                >
                  <div className="row justify-content-center">
                    {items.map(
                      ({ title, description, price, image, hoverImage }, idx) => (
                        <div
                          key={idx}
                          className="col-xl-4 col-md-6 col-sm-12"
                        >
                          <div className="menu-item style-seven text-center mb-35">
                            <div className="menu-thumbnail">
                              <img src={image} alt="menu item" />
                              <div className="hover-img">
                                <img src={hoverImage} alt="Hover Image" />
                              </div>
                            </div>
                            <div className="menu-info">
                              <h3 className="title">
                                <Link href="/menu-details">{title}</Link>
                              </h3>
                              <p>{description}</p>
                              <p className="price">
                                <span className="currency">$</span>
                                {price}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
