import React, { useState, useRef, useEffect } from "react";
import { Sparkles, ArrowLeftRight } from "lucide-react";
import scandiHeroImg from "../assets/images/scandi_room_hero_1780675164177.png";

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const stopDragging = () => {
    isDragging.current = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", stopDragging);
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", stopDragging);
  };

  const startDragging = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isDragging.current = true;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", stopDragging);
  };

  return (
    <section
      className="relative bg-transparent py-16 sm:py-24 z-10"
      id="before-after-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center space-x-1.5 rounded-full bg-blue-50/80 border border-white/60 px-3 py-1 text-xs font-bold text-blue-700 mb-4 shadow-sm backdrop-blur-md">
            <Sparkles className="h-3 w-3 text-blue-600 stroke-[2.5]" />
            <span>Интерактивная демонстрация</span>
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Почувствуйте разницу своими глазами
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-sans">
            Двигайте бегунок влево и вправо, чтобы оценить профессиональный
            результат весенней генеральной чистки от нашей команды.
          </p>
        </div>

        {/* Dragging Container */}
        <div
          ref={containerRef}
          className="relative mx-auto max-w-4xl h-[300px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/40 select-none"
          id="before_after_container"
        >
          {/* After Image (Clean) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={scandiHeroImg}
              alt="После уборки ПрофКлининг"
              className="w-full h-full object-cover pointer-events-none"
              referrerPolicy="no-referrer"
            />
            {/* Label After */}
            <span className="absolute bottom-4 right-4 bg-blue-600/90 text-white px-3 py-1.5 rounded-xl text-xs font-bold font-sans tracking-wide shadow-md backdrop-blur-md border border-white/20">
              ПОСЛЕ ТРУДА ПРОФКЛИНИНГ ✨
            </span>
          </div>

          {/* Before Image (Dusty / Dim Overlay over same room for perfect alignment) */}
          <div
            className="absolute inset-y-0 left-0 h-full overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            {/* We duplicate the same image but styled with CSS dirty filter (brightness-75, saturate-75, sepia-15, dust-overlay) */}
            <div
              className="absolute inset-0 w-[400px] sm:w-[896px] h-full"
              style={{
                width: containerRef.current?.getBoundingClientRect().width,
              }}
            >
              <img
                src={scandiHeroImg}
                alt="До уборки ПрофКлининг"
                className="w-full h-full object-cover pointer-events-none filter sepia-[20%] brightness-[70%] contrast-[95%] saturate-[80%]"
                referrerPolicy="no-referrer"
              />
              {/* Overlay filter for dust texture */}
              <div className="absolute inset-0 bg-yellow-950/20 mix-blend-multiply opacity-60"></div>
              {/* Clutter effect or soft haze */}
              <div className="absolute inset-0 bg-black/10 backdrop-blur-[0.5px]"></div>
            </div>
            {/* Label Before */}
            <span className="absolute bottom-4 left-4 bg-slate-900/90 text-white px-3 py-1.5 rounded-lg text-xs font-bold font-sans tracking-wide shadow-md backdrop-blur-md border border-white/10">
              ДО УБОРКИ 🌫️
            </span>
          </div>

          {/* Draggable Divider Line */}
          <div
            className="absolute inset-y-0 w-1 bg-white cursor-ew-resize group"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={startDragging}
            onTouchStart={startDragging}
            id="slider_handle_line"
          >
            {/* Pulse Indicator Button */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-blue-605 shadow-xl flex items-center justify-center border border-slate-200 transition-transform group-hover:scale-110 active:scale-95">
              <ArrowLeftRight className="h-5 w-5 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Dynamic comparison list */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
          <div className="glass-panel p-5 rounded-3xl flex items-start space-x-3 hover:translate-y-[-2px] transition-transform duration-300">
            <span className="flex-shrink-0 h-8 w-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs">
              ДО
            </span>
            <div className="text-left">
              <h4 className="font-sans text-sm font-bold text-slate-900">
                Запыленность и разводы
              </h4>
              <p className="mt-1 text-xs text-slate-500 font-sans leading-relaxed">
                Потускневший паркет, следы от пальцев на мебели, серый налет на
                зеркалах и скопления пыли в плинтусах.
              </p>
            </div>
          </div>
          <div className="glass-panel p-5 rounded-3xl flex items-start space-x-3 hover:translate-y-[-2px] transition-transform duration-300">
            <span className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
              ПОСЛЕ
            </span>
            <div className="text-left">
              <h4 className="font-sans text-sm font-bold text-slate-900">
                Идеальный матовый блеск
              </h4>
              <p className="mt-1 text-xs text-slate-500 font-sans leading-relaxed">
                Кристально чистые стекла, очищенная эко-средствами мебель,
                тщательно вымытый и увлажненный воздух.
              </p>
            </div>
          </div>
          <div className="glass-panel p-5 rounded-3xl flex items-start space-x-3 hover:translate-y-[-2px] transition-transform duration-300">
            <span className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
              ⏳
            </span>
            <div className="text-left">
              <h4 className="font-sans text-sm font-bold text-slate-900">
                Экономия вашего времени
              </h4>
              <p className="mt-1 text-xs text-slate-500 font-sans leading-relaxed">
                В среднем вы экономите 4.5 часа личного времени, которое можете
                провести с близкими или посвятить любимому делу.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
