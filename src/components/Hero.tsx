import React from 'react';
import { Sparkles, Calendar, ChevronRight, ShieldCheck, Heart } from 'lucide-react';

interface HeroProps {
  onActionClick: (sectionId: string) => void;
}

export default function Hero({ onActionClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-transparent py-12 sm:py-20 lg:py-24" id="hero-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column Text Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left z-10">
            {/* Promo Tag */}
            <div className="inline-flex items-center space-x-2 rounded-full bg-blue-50/75 px-3.5 py-1.5 text-xs sm:text-sm font-semibold tracking-wide text-blue-700 border border-white/60 shadow-sm backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-blue-600 stroke-[2.5] animate-pulse" />
              <span>Профессиональный клининг в Москве и Подмосковье</span>
            </div>

            {/* Main Catchy Heading */}
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.1]">
              Ваш дом засияет чистотой с{' '}
              <span className="relative inline-block text-blue-600">
                NasyrovWash
              </span>
            </h1>

            {/* Beautiful Subtitles */}
            <p className="max-w-2xl text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
              Регулярная, генеральная и послеремонтная уборка по честным средним ценам Москвы. Рассчитайте стоимость за 1 минуту онлайн — платите только после полной приемки работы.
            </p>

            {/* Quick Pricing stats */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 max-w-lg border-y border-white/40 py-5 sm:py-6">
              <div>
                <dt className="text-xs font-semibold text-slate-400 font-sans uppercase tracking-wider">Цена за м²</dt>
                <dd className="mt-1 text-lg font-bold text-slate-900 font-display">от 65 рублей</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-slate-400 font-sans uppercase tracking-wider">Приезд мастера</dt>
                <dd className="mt-1 text-lg font-bold text-slate-900 font-display">от 1.5 часов</dd>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <dt className="text-xs font-semibold text-slate-400 font-sans uppercase tracking-wider">Весь инвентарь</dt>
                <dd className="mt-1 text-lg font-bold text-slate-900 font-display">Привозим с собой</dd>
              </div>
            </div>

            {/* Buttons UI */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => onActionClick('calculator')}
                className="group flex items-center justify-center space-x-2 rounded-full bg-blue-600 px-8 py-4 font-sans text-base font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-700/30 active:scale-98"
                id="hero_btn_calc"
              >
                <Calendar className="h-5 w-5 stroke-[2.2]" />
                <span>Рассчитать калькулятором</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => onActionClick('about')}
                className="flex items-center justify-center space-x-1.5 rounded-full bg-white/50 border border-white/60 px-6 py-4 font-sans text-sm font-semibold text-slate-700 hover:bg-white/80 active:scale-98 transition-all backdrop-blur-md"
                id="hero_btn_about"
              >
                <span>Узнать наши гарантии</span>
              </button>
            </div>

            {/* Quality assurances badge */}
            <div className="flex flex-wrap gap-y-2 gap-x-6 pt-2 text-xs text-slate-500 font-sans">
              <span className="flex items-center">
                <ShieldCheck className="mr-1.5 h-4 w-4 text-teal-600" /> Клинеры проверены СБ РФ
              </span>
              <span className="flex items-center">
                <Heart className="mr-1.5 h-4 w-4 text-rose-500 fill-rose-500" /> Застраховано до 5 млн ₽
              </span>
            </div>
          </div>

          {/* Right Column Image Banner */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="relative mx-auto max-w-[440px] lg:max-w-none">
              {/* Decorative behind elements */}
              <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-blue-400 to-sky-400 opacity-20 blur-2xl"></div>
              
              <div className="relative overflow-hidden rounded-3xl border border-white/40 shadow-2xl">
                <img
                  src="/src/assets/images/scandi_room_hero_1780675164177.png"
                  alt="Премиальная уборка квартир NasyrovWash"
                  className="aspect-4/3 w-full object-cover transition-transform duration-500 hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Banner card info (Float overlay) */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/70 p-4 rounded-2xl border border-white/70 shadow-lg backdrop-blur-xl flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100/80 border border-white/60 shadow-xs text-blue-700 font-bold text-lg">5★</span>
                    <div>
                      <h4 className="font-sans text-xs font-extrabold text-slate-950 uppercase tracking-wider text-left">Чистота с гарантией</h4>
                      <p className="text-[11px] font-sans text-slate-500 text-left">Оценка на Яндекс.Услугах 4.9/5</p>
                    </div>
                  </div>
                  <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700 font-sans">
                    100% Возврат
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
