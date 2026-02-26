'use client';
import { useState } from 'react';
import Link from 'next/link';

type SubMenuItem = { href: string; label: string };
type MenuItem = { title: string; href: string; subMenu?: SubMenuItem[] };

export default function Menu() {
  const [openMenus, setOpenMenus] = useState<number[]>([]);

  // Toggle dropdown open/close
  const toggleSubMenu = (index: number) => {
    setOpenMenus((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const menuItems: MenuItem[] = [
    { title: 'Inicio', href: '/' },
    { title: 'Menú', href: '/#menu' },
    { title: 'Contacto', href: '/contact' },
  ];

  return (
    <ul>
      {menuItems.map((item, index) => (
        <li
          key={index}
          className={`menu-item ${item.subMenu ? 'has-children' : ''}`}
        >
          {item.subMenu ? (
            <>
              <a href="#">
                {item.title}
                <span
                  className={`dd-trigger ${openMenus.includes(index) ? 'sub-menu-open' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSubMenu(index);
                  }}
                >
                  <i className="far fa-angle-down"></i>
                </span>
              </a>
              <ul
                className="sub-menu"
                style={{
                  display: openMenus.includes(index) ? 'block' : 'none',
                }}
              >
                {item.subMenu.map((sub, subIndex) => (
                  <li key={subIndex}>
                    <Link href={sub.href}>{sub.label}</Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Link href={item.href!}>{item.title}</Link>
          )}
        </li>
      ))}
    </ul>
  );
}
