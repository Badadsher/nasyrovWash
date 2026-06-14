import React, { useState } from 'react';
import { Sparkles, Check, X, ShieldX, HelpCircle } from 'lucide-react';
import { ServiceType } from '../types';

interface FeatureGroup {
  category: string;
  items: {
    name: string;
    standard: boolean | string;
    deep: boolean | string;
    renovation: boolean | string;
  }[];
}

const COMPARISON_DATA: FeatureGroup[] = [
  {
    category: 'Сухая и влажная уборка',
    items: [
      { name: 'Влажная уборка полов и плинтусов', standard: true, deep: true, renovation: 'Спец. роторные щетки' },
      { name: 'Протирка доступных поверхностей от пыли (до 1.8м)', standard: true, deep: true, renovation: true },
      { name: 'Удаление пыли со стен на всю высоту', standard: false, deep: true, renovation: true },
      { name: 'Обеспыливание люстр, карнизов и кондиционеров', standard: false, deep: true, renovation: true },
      { name: 'Мытье радиаторов отопления снаружи', standard: 'Легкая протирка', deep: true, renovation: true },
      { name: 'Удаление строительной пыли со всех щелей и ниш', standard: false, deep: false, renovation: true },
    ]
  },
  {
    category: 'Кухня и кухонная зона',
    items: [
      { name: 'Влажная протирка внешних кухонных фасадов', standard: true, deep: true, renovation: true },
      { name: 'Удаление стойкого жирового слоя с плиты и фартука', standard: false, deep: true, renovation: true },
      { name: 'Дезинфекция раковины и смесителя', standard: true, deep: true, renovation: true },
      { name: 'Очистка бытовой техники изнутри (духовка/холодильник)', standard: 'Доп. опция', deep: 'Доп. опция', renovation: 'По согласованию' },
    ]
  },
  {
    category: 'Ванная комната и санузел',
    items: [
      { name: 'Мытье и дезинфекция унитаза, биде, раковины', standard: true, deep: true, renovation: true },
      { name: 'Глубокая очистка ванны / душевой кабины от налета', standard: 'Простая протирка', deep: true, renovation: true },
      { name: 'Удаление известкового и ржавого налета со смесителей', standard: false, deep: true, renovation: true },
      { name: 'Мытье плитки от пола до потолка', standard: false, deep: true, renovation: true },
    ]
  },
  {
    category: 'Прочее',
    items: [
      { name: 'Сбор и вынос мелкого мусора', standard: 'До 5 кг', deep: 'До 10 кг', renovation: 'Мелкий строит. мусор' },
      { name: 'Использование гипоаллергенной эко-химии', standard: true, deep: true, renovation: 'Усиленная химия + эко' },
      { name: 'Фирменные моющие промышленные пылесосы Kärcher', standard: 'По запросу', deep: true, renovation: true },
    ]
  }
];

export default function CompareServices() {
  const [activeTab, setActiveTab] = useState<ServiceType>('standard');

  const getServiceColor = (type: ServiceType) => {
    switch (type) {
      case 'standard': return 'bg-blue-600 text-white';
      case 'deep': return 'bg-blue-800 text-white';
      case 'renovation': return 'bg-slate-800 text-white';
      default: return 'bg-zinc-600 text-white';
    }
  };

  return (
    <section className="relative bg-transparent py-16 sm:py-24 z-10" id="services-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center space-x-1.5 rounded-full bg-blue-50/80 border border-white/60 px-3 py-1 text-xs font-bold text-blue-700 shadow-sm backdrop-blur-md mb-4 animate-fade-in">
            <span>Прозрачность каждой детали</span>
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Что входит в стоимость вашей уборки?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-sans">
            Мы гордимся детализированным чек-листом услуг. Сравните виды клининга и подберите идеальный вариант для вашего дома.
          </p>
        </div>

        {/* Mobile Filter Tabs */}
        <div className="flex md:hidden justify-center space-x-1 p-1 bg-white/40 border border-white/60 backdrop-blur-md rounded-2xl mb-6 max-w-md mx-auto">
          {(['standard', 'deep', 'renovation'] as ServiceType[]).map((type) => {
            const labels: Record<ServiceType, string> = {
              standard: 'Поддерживающая',
              deep: 'Генеральная',
              renovation: 'После ремонта',
              office: 'Офис',
              windows: 'Окна'
            };
            return (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={`w-full py-2.5 rounded-xl text-xs font-bold font-sans transition-all ${
                  activeTab === type 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-605 hover:text-slate-900'
                }`}
                id={`comp_tab_${type}`}
              >
                {labels[type]}
              </button>
            );
          })}
        </div>

        {/* Responsive Table Grid */}
        <div className="glass-panel overflow-hidden border border-white/55 rounded-3xl shadow-2xl" id="services_comparison_table">
          
          {/* Header Row (Hidden on mobile) */}
          <div className="hidden md:grid grid-cols-12 bg-white/55 backdrop-blur-md p-6 border-b border-white/45 items-center font-display font-extrabold text-sm text-slate-800">
            <div className="col-span-5 text-left text-slate-500 tracking-wider font-extrabold uppercase text-xs">Чек-лист выполняемых работ</div>
            <div className="col-span-2 text-center text-slate-950 font-bold">Поддерживающая</div>
            <div className="col-span-3 text-center text-blue-650 font-extrabold">Генеральная (Выбор мск)</div>
            <div className="col-span-2 text-center text-blue-800 font-bold">После ремонта</div>
          </div>

          {/* Group Content */}
          <div className="divide-y divide-white/20">
            {COMPARISON_DATA.map((group, gIdx) => (
              <div key={gIdx} className="bg-transparent">
                {/* Category Header */}
                <h3 className="bg-white/25 px-6 py-4 font-display font-extrabold text-xs text-slate-400 tracking-wider uppercase text-left border-b border-white/10">
                  {group.category}
                </h3>

                {/* Categories Items */}
                <div className="divide-y divide-white/20">
                  {group.items.map((item, iIdx) => (
                    <div 
                      key={iIdx} 
                      className="grid grid-cols-1 md:grid-cols-12 px-6 py-4 items-center group hover:bg-white/25 transition-colors"
                    >
                      {/* Feature label */}
                      <span className="col-span-1 md:col-span-5 font-sans text-sm font-semibold text-slate-800 text-left mb-2 md:mb-0">
                        {item.name}
                      </span>

                      {/* Standard value */}
                      <div className={`col-span-1 md:col-span-2 text-center md:flex md:justify-center py-1.5 md:py-0 ${activeTab !== 'standard' ? 'hidden md:block' : ''}`}>
                        <span className="md:hidden text-xs font-bold font-sans text-slate-400 mr-2">Поддерживающая:</span>
                        {typeof item.standard === 'boolean' ? (
                          item.standard ? (
                            <Check className="h-5 w-5 text-blue-600 mx-auto" />
                          ) : (
                            <X className="h-4 w-4 text-slate-350 mx-auto" strokeWidth={2.5} />
                          )
                        ) : (
                          <span className="font-sans text-xs font-semibold text-slate-500">{item.standard}</span>
                        )}
                      </div>

                      {/* Deep value */}
                      <div className={`col-span-1 md:col-span-3 text-center md:flex md:justify-center py-1.5 md:py-0 ${activeTab !== 'deep' ? 'hidden md:block' : ''}`}>
                        <span className="md:hidden text-xs font-bold font-sans text-blue-500 mr-2">Генеральная:</span>
                        {typeof item.deep === 'boolean' ? (
                          item.deep ? (
                            <Check className="h-5 w-5 text-blue-650 mx-auto stroke-[2.5]" />
                          ) : (
                            <X className="h-4 w-4 text-slate-350 mx-auto" strokeWidth={2.5} />
                          )
                        ) : (
                          <span className="font-sans text-xs font-bold text-blue-700 bg-white/70 border border-white/40 px-2.5 py-1 rounded-full">{item.deep}</span>
                        )}
                      </div>

                      {/* Renovation value */}
                      <div className={`col-span-1 md:col-span-2 text-center md:flex md:justify-center py-1.5 md:py-0 ${activeTab !== 'renovation' ? 'hidden md:block' : ''}`}>
                        <span className="md:hidden text-xs font-bold font-sans text-blue-800 mr-2">После ремонта:</span>
                        {typeof item.renovation === 'boolean' ? (
                          item.renovation ? (
                            <Check className="h-5 w-5 text-blue-800 mx-auto stroke-[2.5]" />
                          ) : (
                            <X className="h-4 w-4 text-slate-350 mx-auto" />
                          )
                        ) : (
                          <span className="font-sans text-xs font-bold text-blue-900 bg-white/70 border border-white/40 px-2.5 py-1 rounded-full">{item.renovation}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Pricing disclaimer under table */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between p-5 rounded-3xl bg-white/50 border border-white/60 backdrop-blur-md max-w-4xl mx-auto space-y-4 sm:space-y-0 shadow-lg">
          <div className="flex items-center space-x-3 text-left">
            <HelpCircle className="h-5 w-5 text-slate-400 flex-shrink-0" />
            <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
              Не нашли нужную работу? Вы можете добавить любые индивидуальные требования в поле комментария или выбрать дополнительные услуги в нашем онлайн-калькуляторе.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
