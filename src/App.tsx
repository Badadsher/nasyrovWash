import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CompareServices from "./components/CompareServices";
import Calculator from "./components/Calculator";
import Reviews from "./components/Reviews";

import { FAQS, COVERAGE_STEPS } from "./data";
import {
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  MapPin,
  Tv,
  Compass,
  Shirt,
  Trash2,
  Heart,
  Award,
  ThumbsUp,
  Star,
  Phone,
  Mail,
} from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const handleScrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    let domId = "";
    if (sectionId === "about") domId = "about-section";
    if (sectionId === "services") domId = "services-section";
    if (sectionId === "calculator") domId = "calculator-section";
    if (sectionId === "reviews") domId = "reviews-section";
    if (sectionId === "faq") domId = "faq-section";
    if (sectionId === "hero") domId = "hero-section";

    if (domId) {
      const element = document.getElementById(domId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f9ff] font-sans text-slate-800 select-none selection:bg-blue-500/25 relative overflow-hidden">
      {/* Background Decorative Gradient Spheres */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-blue-200 rounded-full blur-[120px] opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[-150px] w-[500px] h-[500px] bg-teal-100 rounded-full blur-[100px] opacity-50 pointer-events-none"></div>
      <div className="absolute top-[35%] right-[-150px] w-[600px] h-[600px] bg-sky-200 rounded-full blur-[130px] opacity-45 pointer-events-none"></div>
      <div className="absolute bottom-[-100px] right-[10%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] opacity-40 pointer-events-none"></div>

      {/* Dynamic Header Navbar */}
      <Navbar
        onNavClick={handleScrollToSection}
        activeSection={activeSection}
      />

      {/* Hero Intro component */}
      <Hero onActionClick={handleScrollToSection} />

      {/* WHY US / Pillars Section */}
      <section
        className="relative py-16 sm:py-24 border-t border-white/20 backdrop-blur-md bg-white/10 z-10"
        id="about-section"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center space-x-1.5 rounded-full bg-blue-50/80 px-3.5 py-1.5 text-xs font-bold text-blue-700 border border-white/60 backdrop-blur-md mb-4 uppercase tracking-wide shadow-sm">
              Почему москвичи выбирают нас?
            </span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Золотые правила чистоты NasyrovWash
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 font-sans">
              Клининг в Москве — это не просто уборка пыли. Это бережная забота
              о дорогих материалах, абсолютная честность и забота о здоровье
              жильцов.
            </p>
          </div>

          <div
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            id="why_us_pillars"
          >
            <div className="glass-panel p-6 rounded-3xl space-y-4 hover:shadow-2xl hover:shadow-blue-900/10 transition-transform hover:-translate-y-1 hover:bg-white/55 text-left">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 shadow-md text-blue-600 font-bold text-lg">
                💡
              </span>
              <h3 className="font-display text-lg font-bold text-slate-900">
                Высококлассная эко-химия
              </h3>
              <p className="font-sans text-sm text-slate-600 leading-relaxed">
                Мы используем только сертифицированные гипоаллергенные средства
                Kiehl и Kärcher, безопасные для детей, кошек и аллергиков.
                Никакого запаха хлора.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl space-y-4 hover:shadow-2xl hover:shadow-blue-900/10 transition-transform hover:-translate-y-1 hover:bg-white/55 text-left">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 shadow-md text-blue-600 font-bold text-lg">
                🔒
              </span>
              <h3 className="font-display text-lg font-bold text-slate-900">
                Проверенные мастера СБ
              </h3>
              <p className="font-sans text-sm text-slate-600 leading-relaxed">
                Каждый клинер NasyrovWash проходит 3-этапное интервью и проверку
                личности. Вы защищены юридическим договором до полной сдачи
                качества.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl space-y-4 hover:shadow-2xl hover:shadow-blue-900/10 transition-transform hover:-translate-y-1 hover:bg-white/55 text-left">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 shadow-md text-blue-600 font-bold text-lg">
                🚀
              </span>
              <h3 className="font-display text-lg font-bold text-slate-900">
                Профессиональное оборудование
              </h3>
              <p className="font-sans text-sm text-slate-600 leading-relaxed">
                Строительные моющие пылесосы, пароочистители, роторы, фирменные
                протирочные тряпки разного цвета, предотвращающие переноску пыли
                из с/у в кухню.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl space-y-4 hover:shadow-2xl hover:shadow-blue-900/10 transition-transform hover:-translate-y-1 hover:bg-white/55 text-left">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 shadow-md text-blue-600 font-bold text-lg">
                🎯
              </span>
              <h3 className="font-display text-lg font-bold text-slate-900">
                Страхование имущества
              </h3>
              <p className="font-sans text-sm text-slate-600 leading-relaxed">
                Полная материальная ответственность застрахована партнерской
                компанией. Если что-то случайно повредится — гарантируем ремонт
                или компенсацию.
              </p>
            </div>
          </div>

          {/* Moscow Map Coverage Teaser */}
          <div
            className="mt-16 p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden text-left border border-white/10 shadow-2xl z-10"
            id="moscow_coverage_banner"
          >
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-16 scale-120">
              {/* Map Outline icon */}
              <MapPin className="h-96 w-96 text-blue-400 stroke-[0.3]" />
            </div>

            <div className="relative max-w-2xl space-y-4">
              <span className="rounded bg-blue-500/20 px-2.5 py-1 text-xs font-bold text-blue-400 font-sans tracking-wide">
                ГЕОГРАФИЯ УСЛУГ
              </span>
              <h3 className="font-display text-2xl font-extrabold sm:text-3xl">
                Выезжаем в любой округ Москвы внутри и за МКАД до 30км
              </h3>
              <p className="font-sans text-sm text-slate-300 leading-relaxed">
                Мы базируемся по нескольким филиалам по Москве, поэтому наши
                клинеры привозят инвентарь максимально быстро — от Сколково и
                Митино, до Лефортово и Некрасовки.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs text-slate-300 font-sans">
                <span className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-blue-400 mr-2 animate-ping"></span>{" "}
                  Внутри МКАД — бесплатный выезд
                </span>
                <span className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-teal-400 mr-2"></span>{" "}
                  За МКАД — 30 руб / км
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compare Services checklists items */}
      <CompareServices />

      {/* Interactive Moscow Pricing Calculator */}
      <Calculator />

      {/* Reviews Section list and client write form */}
      <Reviews />

      {/* STEP BY STEP COVERAGE PLAN */}
      <section className="relative py-16 sm:py-24 border-t border-white/20 backdrop-blur-md bg-white/5 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center space-x-1.5 rounded-full bg-blue-50/70 border border-white/60 px-3 py-1 text-xs font-bold text-blue-700 uppercase tracking-wide shadow-sm">
              Как устроен процесс
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-900">
              4 простых шага до сияющего блеска дома
            </h2>
          </div>

          <div
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 text-left"
            id="steps_roadmap"
          >
            {COVERAGE_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="glass-panel relative p-6 rounded-3xl space-y-4 hover:bg-white/60 transition-colors duration-300"
              >
                <span className="absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white font-display text-xl font-black shadow-lg shadow-blue-600/30">
                  {idx + 1}
                </span>
                <div className="pt-4">
                  <h3 className="font-display text-base font-extrabold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section
        className="relative py-16 sm:py-24 border-t border-white/20 backdrop-blur-md bg-white/10 z-10"
        id="faq-section"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center space-x-1.5 rounded-full bg-blue-50/70 border border-white/60 px-3.5 py-1.5 text-xs font-bold text-blue-700 uppercase tracking-wide shadow-sm mb-4">
              Отвечаем честно
            </span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900">
              Разбираем популярные вопросы
            </h2>
          </div>

          {/* Interactive Accordion */}
          <div
            className="divide-y divide-slate-200/60 border-t border-b border-slate-200/65 text-left"
            id="faq_accordion_wrapper"
          >
            {FAQS.map((faq, fIdx) => {
              const isOpen = openFaqIdx === fIdx;
              return (
                <div key={fIdx} className="py-4 sm:py-5">
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : fIdx)}
                    className="flex w-full items-center justify-between text-left focus:outline-none"
                    aria-expanded={isOpen}
                    id={`faq_btn_${fIdx}`}
                  >
                    <span className="font-display text-sm sm:text-base font-bold text-slate-900 pr-4">
                      {faq.q}
                    </span>
                    <span className="flex-shrink-0 text-blue-600 bg-white/80 border border-white shadow-sm rounded-lg p-1.5">
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </span>
                  </button>

                  {/* Accordion Body */}
                  {isOpen && (
                    <div className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans pr-6 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Sticky CTA Banner / Contacts Footer */}
      <footer className="backdrop-blur-xl bg-slate-900/95 text-white pt-16 pb-12 border-t border-white/10 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 mb-12 border-b border-white/10 pb-12">
            {/* Logo/Info Col */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <div className="flex items-center space-x-2 text-blue-400">
                <Sparkles className="h-6 w-6 stroke-[2.5]" />
                <span className="font-display text-xl font-black tracking-tight text-white">
                  Nasyrov<span className="text-blue-400">Wash</span>
                </span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
                Премиальный сервис профессиональной уборки квартир, коттеджей и
                офисных помещений в Москве. Создаем безупречную чистоту, ведя
                строгий отбор мастеров.
              </p>
              <p className="text-xs text-slate-500 font-sans">
                © 2026 NasyrovWash Cleaning. Все права защищены. <br />
                Разработка выполнена в Москве на высшем уровне.
              </p>
            </div>

            {/* Quick sections Links Col */}
            <div className="lg:col-span-3 space-y-3 text-left">
              <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-slate-400">
                Разделы
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm font-sans text-slate-300">
                <li>
                  <button
                    onClick={() => handleScrollToSection("about")}
                    className="hover:text-blue-400 font-medium"
                  >
                    Почему доверяют нам
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleScrollToSection("services")}
                    className="hover:text-blue-400 font-medium"
                  >
                    Виды уборки и цены
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleScrollToSection("calculator")}
                    className="hover:text-blue-400 font-medium font-semibold text-blue-400"
                  >
                    Онлайн-калькулятор м²
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleScrollToSection("reviews")}
                    className="hover:text-blue-400 font-medium"
                  >
                    Отзывы на Яндекс
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact details Col */}
            <div className="lg:col-span-4 space-y-4 text-left font-sans text-xs sm:text-sm text-slate-300">
              <h4 className="font-display text-xs font-extrabold uppercase tracking-widest text-slate-400">
                Контакты NasyrovWash
              </h4>

              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-400 mr-2.5 flex-shrink-0" />
                  <a
                    href="tel:+79859169482"
                    className="hover:text-blue-400 font-bold text-white"
                  >
                    +7 (985) 317-94-01
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-400 mr-2.5 flex-shrink-0" />
                  <a
                    href="mailto:info@nasyrovwash.ru"
                    className="hover:text-blue-400"
                  >
                    info@nasyrovwash.ru
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <span className="block text-[11px] text-slate-500 uppercase font-semibold">
                  ОБЩЕЕ ВРЕМЯ РАБОТЫ
                </span>
                <span className="block text-slate-200 font-bold mt-1">
                  Прием заказов онлайн и выезд: Круглосуточно
                </span>
              </div>
            </div>
          </div>

          {/* Moscow area note */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-2 font-sans border-t border-white/5">
            <p>
              Цены на уборку в Москве соответствуют среднему сегменту по рынку
              МСК за 2026 год.
            </p>
            <p className="mt-2 sm:mt-0">
              Сделано с любовью и гарантией безупречного порядка 🧼
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
