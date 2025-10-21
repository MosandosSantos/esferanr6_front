"use client";

import { useState, useEffect, useRef } from "react";
import { RiMenu4Line, RiCloseLine, RiArrowRightUpLine } from "react-icons/ri";
import { Link as ScrollLink } from "react-scroll";

const links = [
  { name: "Home", path: "home" },
  { name: "Sobre", path: "about" },
  { name: "EsferaNR6", path: "services" },
  { name: "Projetos", path: "projects" },
  { name: "Condições", path: "option" },
  { name: "Contato", path: "contact" },
  { name: "Login", path: "login" },
];

const NavMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Handle ESC key and focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      // ESC key closes menu
      if (e.key === "Escape") {
        closeMenu();
      }

      // TAB key focus trap
      if (e.key === "Tab") {
        const focusableElements = menuRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift+Tab: if on first element, go to last
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab: if on last element, go to first
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      // Cleanup on unmount
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Handle click outside - with proper event timing
  useEffect(() => {
    if (!isOpen) return;

    // Use setTimeout to avoid catching the same click that opened the menu
    const timeoutId = setTimeout(() => {
      const handleOutsideClick = (e) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(e.target) &&
          hamburgerRef.current &&
          !hamburgerRef.current.contains(e.target)
        ) {
          closeMenu();
        }
      };

      document.addEventListener("mousedown", handleOutsideClick);

      // Store cleanup function
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  const openMenu = () => {
    previousFocusRef.current = document.activeElement;
    setIsOpen(true);

    // Focus first link when menu opens
    setTimeout(() => {
      const firstLink = menuRef.current?.querySelector('a, button');
      firstLink?.focus();
    }, 300); // Wait for animation
  };

  const closeMenu = () => {
    setIsOpen(false);

    // Return focus to hamburger button
    setTimeout(() => {
      hamburgerRef.current?.focus();
    }, 300); // Wait for animation
  };

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  return (
    <div className="xl:hidden">
      {/* Hamburger Menu Button */}
      <button
        ref={hamburgerRef}
        onClick={toggleMenu}
        className="text-white text-3xl hover:text-accent transition-colors z-50 relative"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        data-testid="mobile-menu-toggle"
      >
        {isOpen ? <RiCloseLine /> : <RiMenu4Line />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeMenu}
          aria-hidden="true"
          data-testid="mobile-menu-overlay"
        />
      )}

      {/* Mobile Menu */}
      <nav
        ref={menuRef}
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className={`fixed top-0 right-0 h-full w-[280px] bg-primary shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        data-testid="mobile-menu"
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          {/* Close Button (inside menu for better UX) */}
          <button
            onClick={closeMenu}
            className="absolute top-6 right-6 text-white text-2xl hover:text-accent transition-colors"
            aria-label="Close menu"
            data-testid="mobile-menu-close"
          >
            <RiCloseLine />
          </button>

          {/* Menu Links */}
          <ul className="flex flex-col gap-6 mb-8" role="list">
            {links.map((link, index) => (
              <li key={index}>
                <ScrollLink
                  to={link.path}
                  smooth
                  spy
                  offset={-100}
                  className="text-white text-lg uppercase font-primary font-medium tracking-[1.2px]
                  hover:text-accent transition-colors cursor-pointer block py-2 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary rounded"
                  activeClass="text-accent"
                  onClick={closeMenu}
                  data-testid={`mobile-menu-link-${link.path}`}
                  tabIndex={isOpen ? 0 : -1}
                  role="link"
                  aria-label={`Navigate to ${link.name}`}
                >
                  {link.name}
                </ScrollLink>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            className="group flex items-center justify-between bg-white text-primary font-bold uppercase text-sm tracking-widest
            px-4 py-3 rounded shadow-md hover:bg-gray-100 transition-all mt-auto mb-8 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary"
            onClick={closeMenu}
            data-testid="mobile-menu-cta"
            tabIndex={isOpen ? 0 : -1}
            aria-label="Request a quote"
          >
            Peça um orçamento
            <div className="w-10 h-10 bg-primary ml-2 flex items-center justify-center rounded">
              <RiArrowRightUpLine className="text-white text-xl group-hover:rotate-45 transition-all duration-200" />
            </div>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavMobile;
