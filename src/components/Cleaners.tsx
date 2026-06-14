import React, { useState } from 'react';
import { Star, ShieldCheck, Award, MessageSquare, Heart, ArrowRight } from 'lucide-react';
import { Cleaner } from '../types';
import { TEAM_CLEANERS } from '../data';

interface CleanersProps {
  onSelectCleaner: (cleanerName: string) => void;
}

export default function Cleaners({ onSelectCleaner }: CleanersProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isRequested, setIsRequested] = useState<string | null>(null);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const selectCleaner = (cleaner: Cleaner) => {
    onSelectCleaner(cleaner.name);
    setIsRequested(cleaner.name);
    setTimeout(() => {
      setIsRequested(null);
    }, 3000);
  };

  return (
    <section className="bg-zinc-50 py-16 sm:py-24" id="team-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-600/10 mb-4 uppercase tracking-wide">
            Наша Московская команда
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
            Элитные мастера чистоты NasyrovWash
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-650 font-sans">
            Все наши клинеры проходят проверку службы безопасности, аттестацию по чек-листам Kärcher и регулярные медицинские осмотры. Вы можете бесплатно выбрать конкретного исполнителя.
          </p>
        </div>

        {/* Cleaners Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4" id="cleaners_team_grid">
          {TEAM_CLEANERS.map((cleaner) => {
            const isFav = favorites.includes(cleaner.id);
            const isChosen = isRequested === cleaner.name;
            return (
              <div 
                key={cleaner.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-teal-500/20 text-left"
              >
                {/* Avatar area */}
                <div className="relative aspect-square w-full overflow-hidden bg-zinc-100">
                  <img 
                    src={cleaner.avatar} 
                    alt={cleaner.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Rating Label top left */}
                  <div className="absolute top-3 left-3 flex items-center space-x-1 bg-white/95 px-2.5 py-1 rounded-xl shadow-md blur-backdrop">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-sans text-xs font-black text-zinc-900">{cleaner.rating}</span>
                  </div>

                  {/* Favorite Button top right */}
                  <button
                    onClick={(e) => toggleFavorite(cleaner.id, e)}
                    className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/95 flex items-center justify-center text-zinc-400 hover:text-rose-500 active:scale-90 transition-all shadow-md blur-backdrop"
                    aria-label="Add cleaner to favorites"
                    id={`fav_cleaner_${cleaner.id}`}
                  >
                    <Heart className={`h-4.5 w-4.5 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-zinc-400 hover:text-rose-500'}`} />
                  </button>
                </div>

                {/* Content info */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center space-x-1">
                    <span className="font-sans text-xs font-extrabold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md">МСК Профи</span>
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  </div>

                  <h3 className="mt-2 font-display text-base font-extrabold text-zinc-900 line-clamp-1">
                    {cleaner.name}
                  </h3>

                  <div className="mt-3 grid grid-cols-2 gap-2 border-t border-zinc-100 pt-3 text-[11px] font-sans text-zinc-400">
                    <div>
                      <span className="block font-semibold uppercase tracking-wider text-[9px] text-zinc-400">Опыт работы</span>
                      <span className="mt-0.5 font-bold text-zinc-800">{cleaner.experience}</span>
                    </div>
                    <div>
                      <span className="block font-semibold uppercase tracking-wider text-[9px] text-zinc-400">Выполнено уборок</span>
                      <span className="mt-0.5 font-bold text-zinc-800">{cleaner.ordersCount} заказов</span>
                    </div>
                  </div>

                  {/* Specialty pills */}
                  <div className="mt-4 flex flex-wrap gap-1">
                    {cleaner.specialty.map((spec, sIdx) => (
                      <span 
                        key={sIdx}
                        className="rounded bg-zinc-50 border border-zinc-100 px-2 py-0.5 text-[9px] font-semibold text-zinc-500 font-sans"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Request Cleaner button */}
                  <div className="mt-5">
                    <button
                      onClick={() => selectCleaner(cleaner)}
                      className={`w-full rounded-xl py-2.5 font-sans text-xs font-bold transition-all flex items-center justify-center space-x-1 ${
                        isChosen 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-zinc-100 text-zinc-700 hover:bg-teal-50 hover:text-teal-700'
                      }`}
                      id={`calc_request_cleaner_${cleaner.id}`}
                    >
                      {isChosen ? (
                        <span>✓ Назначен в калькулятор!</span>
                      ) : (
                        <>
                          <span>Выбрать этого мастера</span>
                          <ArrowRight className="h-3 w-3" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Dynamic call out */}
        <div className="mt-12 p-6 rounded-3xl bg-linear-to-r from-teal-50 to-teal-100/40 border border-teal-500/10 flex flex-col sm:flex-row items-center justify-between max-w-4xl mx-auto text-left space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3.5">
            <Award className="h-10 w-10 text-teal-650 flex-shrink-0" />
            <div>
              <h4 className="font-sans text-sm font-bold text-zinc-900">Индивидуальные пожелания к составу бригады?</h4>
              <p className="mt-1 text-xs text-zinc-550 leading-relaxed max-w-xl font-sans">
                Если у вас большой загородный коттедж (от 200 м²), мы бесплатно направим усиленную бригаду из 3-4 клинеров во главе с опытным бригадиром для контроля качества.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
