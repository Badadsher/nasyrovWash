import React, { useState } from "react";
import { Phone, Clock, Menu, X } from "lucide-react";

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavClick, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (id: string) => {
    onNavClick(id);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/35 bg-white/25 backdrop-blur-xl shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div
          onClick={() => handleLinkClick("hero")}
          className="flex cursor-pointer items-center space-x-2 text-blue-600 transition-colors hover:text-blue-700"
          id="nav_logo"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-300/50">
            П
          </div>
          <span className="font-display text-xl font-extrabold tracking-tighter text-slate-800">
            Проф<span className="text-blue-600 font-black">Клининг</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 font-sans text-sm font-semibold text-slate-650">
          <button
            onClick={() => handleLinkClick("about")}
            className={`transition-colors hover:text-blue-600 ${activeSection === "about" ? "text-blue-600 font-bold" : ""}`}
            id="nav_link_about"
          >
            Почему мы
          </button>
          <button
            onClick={() => handleLinkClick("services")}
            className={`transition-colors hover:text-blue-600 ${activeSection === "services" ? "text-blue-600 font-bold" : ""}`}
            id="nav_link_services"
          >
            Виды уборки
          </button>
          <button
            onClick={() => handleLinkClick("calculator")}
            className={`transition-colors hover:text-blue-600 ${activeSection === "calculator" ? "text-blue-600 font-bold" : ""}`}
            id="nav_link_calc"
          >
            Калькулятор цен
          </button>
          <button
            onClick={() => handleLinkClick("reviews")}
            className={`transition-colors hover:text-blue-600 ${activeSection === "reviews" ? "text-blue-600 font-bold" : ""}`}
            id="nav_link_reviews"
          >
            Отзывы
          </button>
          <button
            onClick={() => handleLinkClick("faq")}
            className={`transition-colors hover:text-blue-600 ${activeSection === "faq" ? "text-blue-600 font-bold" : ""}`}
            id="nav_link_faq"
          >
            Вопросы
          </button>
        </nav>

        {/* Contacts & CTA */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex flex-col items-end text-xs font-sans text-slate-500 font-medium">
            <span className="flex items-center text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors">
              <Phone className="mr-1 h-3.5 w-3.5 text-blue-600 stroke-[2.5]" />
              <a href="tel:+79859169482">+7 (985) 317-94-01</a>
            </span>
            <span className="flex items-center mt-0.5 text-[10px] text-slate-500 font-medium font-sans">
              <Clock className="mr-1 h-3 w-3 text-slate-400" /> Круглосуточно •
              24/7
            </span>
          </div>
          <button
            onClick={() => handleLinkClick("calculator")}
            className="rounded-full bg-slate-900 text-white font-sans text-xs font-bold uppercase tracking-widest px-6 py-2.5 shadow-md shadow-slate-900/10 transition-all hover:bg-slate-800 active:scale-95"
            id="nav_cta_calc"
          >
            Рассчитать
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center space-x-3 md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-xl p-2 bg-white/40 border border-white/60 text-slate-650 hover:bg-white/60 hover:text-slate-900 transition-colors"
            aria-label="Toggle navigation menu"
            id="nav_mobile_toggle"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="border-t border-white/30 bg-white/70 backdrop-blur-xl px-4 py-4 md:hidden animate-fade-in relative z-50 animate-fade-in">
          <nav className="flex flex-col space-y-3 font-sans text-base font-semibold text-slate-700">
            <button
              onClick={() => handleLinkClick("about")}
              className="px-3 py-2 text-left rounded-lg hover:bg-white/40 hover:text-blue-600"
              id="mob_link_about"
            >
              Почему мы
            </button>
            <button
              onClick={() => handleLinkClick("services")}
              className="px-3 py-2 text-left rounded-lg hover:bg-white/40 hover:text-blue-600"
              id="mob_link_services"
            >
              Виды уборки
            </button>
            <button
              onClick={() => handleLinkClick("calculator")}
              className="px-3 py-2 text-left rounded-lg hover:bg-white/40 text-blue-600 font-bold"
              id="mob_link_calc"
            >
              Калькулятор цен (Москва)
            </button>
            <button
              onClick={() => handleLinkClick("reviews")}
              className="px-3 py-2 text-left rounded-lg hover:bg-white/40 hover:text-blue-600"
              id="mob_link_reviews"
            >
              Отзывы клиентов
            </button>
            <button
              onClick={() => handleLinkClick("faq")}
              className="px-3 py-2 text-left rounded-lg hover:bg-white/40 hover:text-blue-600"
              id="mob_link_faq"
            >
              Вопросы и ответы
            </button>
            <button
              onClick={() => handleLinkClick("calculator")}
              className="mt-2 w-full rounded-full bg-blue-600 py-3 text-center text-sm font-bold text-white shadow-md hover:bg-blue-700"
              id="mob_cta"
            >
              Рассчитать стоимость
            </button>
            <div className="flex items-center justify-between px-3 pt-4 border-t border-white/25 text-xs text-slate-500">
              <span className="flex items-center font-bold text-slate-800">
                <Phone className="mr-1 h-3.5 w-3.5 text-blue-600" />
                <a href="tel:+79859169482">+7 (985) 916-94-82</a>
              </span>
              <span>Круглосуточно</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
