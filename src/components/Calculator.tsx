import React, { useState } from "react";
import {
  Sparkles,
  ShieldCheck,
  Heart,
  Flame,
  Refrigerator,
  Tv,
  Compass,
  Shirt,
  CupSoda,
  Wind,
  PawPrint,
  Sofa,
  Grid,
  Plus,
  Minus,
  Phone,
} from "lucide-react";
import { ServiceType, ExtraService } from "../types";
import { BASE_PRICES, INITIAL_EXTRAS } from "../data";

// Helper to render lucide icons relative to their keys safely
const renderExtraIcon = (iconName: string) => {
  const props = { className: "h-5 w-5 text-blue-600" };
  switch (iconName) {
    case "Flame":
      return <Flame {...props} />;
    case "Refrigerator":
      return <Refrigerator {...props} />;
    case "Tv":
      return <Tv {...props} />;
    case "Compass":
      return <Compass {...props} />;
    case "Shirt":
      return <Shirt {...props} />;
    case "CupSoda":
      return <CupSoda {...props} />;
    case "Wind":
      return <Wind {...props} />;
    case "PawPrint":
      return <PawPrint {...props} />;
    case "Sparkles":
      return <Sofa {...props} />;
    case "Grid":
      return <Grid {...props} />;
    default:
      return <Sparkles {...props} />;
  }
};

export default function Calculator() {
  // Config state
  const [service, setService] = useState<ServiceType>("standard");
  const [area, setArea] = useState<number>(45);
  const [rooms, setRooms] = useState<number>(1);
  const [bathrooms, setBathrooms] = useState<number>(1);
  const [extras, setExtras] = useState<ExtraService[]>(INITIAL_EXTRAS);

  // Calculate live total price
  const calculateTotal = () => {
    const config = BASE_PRICES[service];
    let baseComp = config.base;
    let areaComp = 0;

    if (service === "windows") {
      // Windows are clean unit of base + specific extras
      baseComp = config.base;
    } else {
      // Standard calculations
      const extraSqm = Math.max(0, area - 25);
      areaComp = extraSqm * config.perSqm;
    }

    // Room factors
    let roomSurcharge = 0;
    if (rooms > 1 && service !== "windows" && service !== "office") {
      const perRoomCharge =
        service === "standard" ? 400 : service === "deep" ? 850 : 1200;
      roomSurcharge = (rooms - 1) * perRoomCharge;
    }

    // Bathroom factors
    let bathSurcharge = 0;
    if (bathrooms > 1 && service !== "windows" && service !== "office") {
      const perBathCharge =
        service === "standard" ? 700 : service === "deep" ? 1200 : 1500;
      bathSurcharge = (bathrooms - 1) * perBathCharge;
    }

    // Extras sum
    const extrasSum = extras.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return Math.round(
      baseComp + areaComp + roomSurcharge + bathSurcharge + extrasSum,
    );
  };

  // Estimate cleaning hours
  const estimateHours = () => {
    let baseTime = 2.5; // default supporting cleaning
    if (service === "deep") baseTime = 4.5;
    if (service === "renovation") baseTime = 6.0;
    if (service === "windows") baseTime = 2.0;
    if (service === "office") baseTime = 3.5;

    // Area additions
    const areaAdd = (area / 40) * 0.8;
    const extrasAdd = extras.reduce(
      (sum, item) => sum + item.quantity * 0.4,
      0,
    );

    const total = baseTime + areaAdd + extrasAdd;
    return Math.round(total * 2) / 2; // round to nearest half hour
  };

  // Handle Increments of extras
  const updateExtraQuantity = (id: string, delta: number) => {
    setExtras((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const potentialQty = item.quantity + delta;
          const max = item.maxQuantity ?? 10;
          const nextQty = Math.max(0, Math.min(max, potentialQty));
          return { ...item, quantity: nextQty };
        }
        return item;
      }),
    );
  };

  const totalPrice = calculateTotal();
  const estimatedHoursCount = estimateHours();

  return (
    <section
      className="relative bg-transparent py-16 sm:py-24 z-10"
      id="calculator-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 animate-fade-in">
          <span className="inline-flex items-center space-x-1.5 rounded-full bg-blue-50/80 border border-white/60 px-3.5 py-1.5 text-xs font-bold text-blue-700 mb-4 uppercase tracking-wide shadow-sm backdrop-blur-md">
            Калькулятор цен в Москве
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Рассчитайте стоимость уборки за минуту
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            Передвигайте ползунки, выбирайте дополнительные опции. Наша цена
            прозрачна и окончательна. Без скрытых наценок.
          </p>
        </div>

        <div
          className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start"
          id="calc_interactive_grid"
        >
          {/* Left Side: Setup parameters */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 glass-panel-white p-6 sm:p-8 rounded-3xl border border-white/50 shadow-xl text-left">
            {/* Select Clean Category */}
            <div className="space-y-3">
              <label className="block font-sans text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                Шаг 1: Выберите тип уборки
              </label>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 lg:grid-cols-5 animate-fade-in">
                {(
                  [
                    "standard",
                    "deep",
                    "renovation",
                    "windows",
                    "office",
                  ] as ServiceType[]
                ).map((type) => {
                  const isSelected = service === type;
                  const shortLabels: Record<ServiceType, string> = {
                    standard: "Поддерживающая",
                    deep: "Генеральная",
                    renovation: "После ремонта",
                    windows: "Мытье окон",
                    office: "Офисная",
                  };
                  return (
                    <button
                      key={type}
                      onClick={() => {
                        setService(type);
                        // Special defaults for windows of office
                        if (type === "windows") {
                          setArea(15);
                        }
                        if (type === "office") {
                          if (area < 40) setArea(80);
                        }
                      }}
                      className={`rounded-2xl p-2 sm:p-3 border text-[11px] sm:text-xs font-bold font-sans transition-all text-center flex flex-col justify-center items-center min-h-[68px] sm:min-h-[76px] leading-tight ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/50 text-blue-800 shadow-xs ring-1 ring-blue-600/35"
                          : "border-slate-200 bg-white hover:border-slate-300 text-slate-600 hover:text-slate-950 hover:bg-slate-50/35"
                      }`}
                      type="button"
                      id={`selector_btn_${type}`}
                    >
                      <span className="hyphens-auto break-words max-w-full text-center px-0.5">
                        {shortLabels[type]}
                      </span>
                    </button>
                  );
                })}
              </div>
              {/* Tiny service description explanation */}
              <div className="p-3 bg-blue-50/25 rounded-xl border border-blue-600/5 mt-2">
                <p className="text-xs text-slate-600 leading-relaxed font-sans mt-0.5">
                  <strong className="text-blue-900 font-bold">
                    {BASE_PRICES[service].label}:
                  </strong>{" "}
                  {BASE_PRICES[service].desc}
                </p>
              </div>
            </div>

            {/* Slider parameters: Only for rooms/offices */}
            {service !== "windows" && (
              <div className="space-y-5 border-t border-slate-100 pt-6">
                {/* Area Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-sans text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                      Шаг 2: Укажите площадь уборки
                    </label>
                    <span className="font-display text-lg font-extrabold text-blue-700 bg-blue-100/60 px-3 py-1 rounded-xl">
                      {area} m²
                    </span>
                  </div>
                  <input
                    type="range"
                    min={service === "office" ? 20 : 15}
                    max={250}
                    value={area}
                    step={5}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 font-sans"
                    id="area_slider_range"
                  />
                  <div className="flex justify-between text-[11px] font-sans text-slate-400">
                    <span>{service === "office" ? "20 м²" : "15 м²"}</span>
                    <span>90 м²</span>
                    <span>170 м²</span>
                    <span>250 м²</span>
                  </div>
                </div>

                {/* Rooms and Bathrooms Counters */}
                {service !== "office" && (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 pt-2">
                    {/* Room counts Buttons */}
                    <div className="space-y-2">
                      <label className="block font-sans text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                        Количество комнат
                      </label>
                      <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-2xl w-full max-w-[280px]">
                        {[1, 2, 3, 4, 5].map((rm) => (
                          <button
                            key={rm}
                            onClick={() => setRooms(rm)}
                            className={`flex-1 py-2 text-xs font-bold font-sans rounded-xl transition-all ${
                              rooms === rm
                                ? "bg-white text-slate-900 shadow-sm"
                                : "text-slate-500 hover:text-slate-800"
                            }`}
                            type="button"
                            id={`btn_rm_count_${rm}`}
                          >
                            {rm === 5 ? "5+" : rm}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bathroom counters */}
                    <div className="space-y-2">
                      <label className="block font-sans text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                        Санузлы (туалет / ванна)
                      </label>
                      <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-2xl w-full max-w-[200px]">
                        {[1, 2, 3, 4].map((bath) => (
                          <button
                            key={bath}
                            onClick={() => setBathrooms(bath)}
                            className={`flex-1 py-2 text-xs font-bold font-sans rounded-xl transition-all ${
                              bathrooms === bath
                                ? "bg-white text-slate-900 shadow-sm"
                                : "text-slate-500 hover:text-slate-800"
                            }`}
                            type="button"
                            id={`btn_bath_count_${bath}`}
                          >
                            {bath === 4 ? "4+" : bath}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Extra Services Checklist Grid */}
            <div className="space-y-4 border-t border-slate-100 pt-6">
              <label className="block font-sans text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                Шаг {service === "windows" ? "2" : "3"}: Премиум доп-услуги (по
                желанию)
              </label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {extras.map((item) => {
                  const isChosen = item.quantity > 0;
                  return (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                        isChosen
                          ? "border-blue-500 bg-blue-50/20 shadow-xs"
                          : "border-slate-150 hover:border-slate-200 bg-slate-50/50"
                      }`}
                    >
                      <div className="flex items-center space-x-3 text-left">
                        <span
                          className={`p-2 rounded-xl ${isChosen ? "bg-blue-100/50" : "bg-white"}`}
                        >
                          {renderExtraIcon(item.icon)}
                        </span>
                        <div>
                          <h4 className="font-sans text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                            {item.name}
                          </h4>
                          <p className="text-[11px] font-sans text-slate-500 mt-0.5">
                            +{item.price} ₽ / {item.unit}
                          </p>
                        </div>
                      </div>

                      {/* Counter or Toggle controls */}
                      {(item.maxQuantity ?? 10) === 1 ? (
                        <button
                          onClick={() =>
                            updateExtraQuantity(item.id, isChosen ? -1 : 1)
                          }
                          className={`rounded-full h-8 px-4 font-sans text-xs font-bold transition-all ${
                            isChosen
                              ? "bg-blue-600 text-white shadow-xs"
                              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                          }`}
                          type="button"
                          id={`toggle_extra_${item.id}`}
                        >
                          {isChosen ? "Выбрано" : "Добавить"}
                        </button>
                      ) : (
                        <div className="flex items-center space-x-2">
                          {isChosen && (
                            <button
                              onClick={() => updateExtraQuantity(item.id, -1)}
                              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 active:scale-95"
                              type="button"
                              id={`minus_extra_${item.id}`}
                            >
                              <Minus className="h-3 w-3 stroke-[3]" />
                            </button>
                          )}
                          {isChosen && (
                            <span className="font-sans text-sm font-extrabold text-slate-900 px-1">
                              {item.quantity}
                            </span>
                          )}
                          <button
                            onClick={() => updateExtraQuantity(item.id, 1)}
                            className={`p-1.5 rounded-lg active:scale-95 transition-all ${
                              isChosen
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-white text-slate-600 border border-slate-200 hover:text-slate-900"
                            }`}
                            type="button"
                            id={`plus_extra_${item.id}`}
                          >
                            {isChosen ? (
                              <Plus className="h-3 w-3 stroke-[3]" />
                            ) : (
                              <span className="text-xs font-semibold px-2">
                                Добавить
                              </span>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side: Live Price Summary sticky Panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 font-sans">
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden text-left border border-slate-800">
              {/* Visual styling absolute decorations */}
              <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-blue-500/10 blur-xl"></div>

              <h3 className="font-display text-lg sm:text-xl font-bold border-b border-slate-800 pb-4 mb-5">
                Ваша честная смета
              </h3>

              <div className="space-y-4 text-sm pb-5 border-b border-slate-800">
                {/* Service item */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="block font-bold text-blue-400">
                      {BASE_PRICES[service].label}
                    </span>
                    {service !== "windows" && (
                      <span className="text-xs text-slate-400 mt-0.5">
                        {area} м² • {rooms}{" "}
                        {rooms === 1
                          ? "комната"
                          : rooms < 5
                            ? "комнаты"
                            : "комнат"}{" "}
                        • {bathrooms} {bathrooms === 1 ? "санузел" : "санузла"}
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-slate-100">
                    {BASE_PRICES[service].base +
                      (service !== "windows"
                        ? Math.max(0, area - 25) * BASE_PRICES[service].perSqm
                        : 0)}{" "}
                    ₽
                  </span>
                </div>

                {/* Room extras */}
                {service !== "windows" &&
                  service !== "office" &&
                  (rooms > 1 || bathrooms > 1) && (
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Доп. комнаты / Сантехника:</span>
                      <span>
                        +
                        {(rooms > 1
                          ? (rooms - 1) *
                            (service === "standard"
                              ? 400
                              : service === "deep"
                                ? 850
                                : 1200)
                          : 0) +
                          (bathrooms > 1
                            ? (bathrooms - 1) *
                              (service === "standard"
                                ? 700
                                : service === "deep"
                                  ? 1200
                                  : 1500)
                            : 0)}{" "}
                        ₽
                      </span>
                    </div>
                  )}

                {/* List of active extras */}
                {extras.filter((e) => e.quantity > 0).length > 0 && (
                  <div className="space-y-1.5 bg-slate-800/60 p-3 rounded-xl border border-slate-850">
                    <span className="block text-[11px] font-extrabold uppercase text-slate-500 tracking-wider">
                      Выбранный доп-сервис:
                    </span>
                    {extras
                      .filter((e) => e.quantity > 0)
                      .map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-xs text-slate-300"
                        >
                          <span>
                            {item.name}{" "}
                            {item.quantity > 1 ? `(х${item.quantity})` : ""}
                          </span>
                          <span>+{item.price * item.quantity} ₽</span>
                        </div>
                      ))}
                  </div>
                )}

                {/* Estimate time */}
                <div className="flex justify-between text-xs text-slate-400 pt-1">
                  <span>Примерное время уборки:</span>
                  <span className="font-semibold text-slate-200">
                    ~ {estimatedHoursCount} ч.
                  </span>
                </div>
              </div>

              {/* Total Visual Box */}
              <div className="py-5 flex items-baseline justify-between">
                <span className="text-sm font-semibold text-slate-450">
                  Финальная стоимость:
                </span>
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-blue-400 tracking-tight">
                  {totalPrice} ₽
                </span>
              </div>

              {/* Assurance details */}
              <div className="bg-slate-800/50 px-4 py-3 rounded-2xl border border-slate-850 space-y-2 mb-6 text-xs text-slate-400 leading-relaxed font-sans">
                <p className="flex items-center text-blue-400 font-bold mb-1">
                  <ShieldCheck className="h-4 w-4 mr-1 text-blue-400 flex-shrink-0" />
                  Москва • Работаем честно
                </p>
                <p>
                  Профессиональный инвентарь, гипоаллергенные эко-средства и
                  выезд в любой район Москвы включены в финальную стоимость!
                </p>
              </div>

              {/* Click-to-Call Contact button */}
              <div className="space-y-3">
                <a
                  href="tel:+79859169482"
                  className="w-full rounded-2xl bg-blue-600 py-4 font-sans text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-97 flex items-center justify-center space-x-2.5"
                  id="calc_btn_call"
                >
                  <Phone className="h-4.5 w-4.5" />
                  <span>Позвонить +7 (985) 317-94-01</span>
                </a>
                <p className="text-center text-[11px] text-slate-400 leading-relaxed">
                  Позвоните нам для вызова мастеров по рассчитанной стоимости.
                  Мы зафиксируем цену и подберем удобное для вас время!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
