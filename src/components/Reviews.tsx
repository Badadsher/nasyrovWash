import React, { useState, useEffect } from 'react';
import { Star, MessageSquareCode, BadgeCheck, PenTool, Sparkles } from 'lucide-react';
import { Review } from '../types';
import { INITIAL_REVIEWS } from '../data';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [serviceType, setServiceType] = useState('Генеральная уборка');
  const [text, setText] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');

  // Save/Load client reviews in localStorage
  useEffect(() => {
    const saved = localStorage.getItem('nasyrov_wash_reviews_custom');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Review[];
        setReviews([...parsed, ...INITIAL_REVIEWS]);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !text) {
      alert('Пожалуйста, заполните имя и текст вашего замечательного отзыва!');
      return;
    }

    const newReview: Review = {
      id: 'rev_' + Date.now(),
      author: authorName,
      rating: rating,
      text: text,
      serviceType: serviceType,
      date: new Date().toISOString().split('T')[0],
      isVerified: true
    };

    const saved = localStorage.getItem('nasyrov_wash_reviews_custom');
    let customList: Review[] = [];
    if (saved) {
      try { customList = JSON.parse(saved); } catch (e) {}
    }
    customList.unshift(newReview);
    localStorage.setItem('nasyrov_wash_reviews_custom', JSON.stringify(customList));

    setReviews([newReview, ...reviews]);
    
    // reset form
    setAuthorName('');
    setRating(5);
    setText('');
    setShowForm(false);
    setMessage('Спасибо! Ваш отзыв опубликован и теперь виден на нашем сайте.');
    setTimeout(() => setMessage(''), 5000);
  };

  const getAverageRating = () => {
    const sum = reviews.reduce((s, r) => s + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  return (
    <section className="bg-white py-16 sm:py-24 border-t border-zinc-100" id="reviews-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Summary Header */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-end mb-12 sm:mb-16">
          <div className="md:col-span-8 text-left">
            <span className="inline-flex items-center space-x-1.5 rounded-full bg-teal-50 px-3.5 py-1.5 text-xs font-bold text-teal-700 ring-1 ring-teal-600/10 mb-4 uppercase tracking-wide">
              Отзывы о NasyrovWash
            </span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
              Что говорят москвичи о качестве уборок
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-650 font-sans max-w-2xl">
              Мы собираем обратную связь после каждого выполненного клининга. Прозрачная репутация и тысячи довольных семей в Москве и МО.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col items-start md:items-end justify-center space-y-3">
            <div className="flex items-center space-x-4 bg-zinc-50 p-4 border border-zinc-150 rounded-2xl">
              <div className="text-center">
                <span className="block font-display text-3xl font-black text-zinc-950">{getAverageRating()}</span>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-zinc-400 font-sans">Средняя оценка</span>
              </div>
              <div className="h-10 w-px bg-zinc-200"></div>
              <div>
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-zinc-550 font-sans mt-1 block">На основе {reviews.length} отзывов</span>
              </div>
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="rounded-full bg-zinc-955 bg-teal-600 px-5 py-2.5 font-sans text-xs font-bold text-white transition-all hover:bg-teal-700 shadow-md"
              id="btn_toggle_review_form"
            >
              {showForm ? 'Скрыть форму' : 'Оставить свой отзыв'}
            </button>
          </div>
        </div>

        {/* Dynamic Status message */}
        {message && (
          <div className="mx-auto max-w-2xl bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-250 mb-6 text-sm font-semibold font-sans animate-pulse">
            {message}
          </div>
        )}

        {/* Write review Form Overlay drawer-like style */}
        {showForm && (
          <div className="mx-auto max-w-xl bg-zinc-50 border border-zinc-150 rounded-3xl p-6 sm:p-8 mb-12 text-left shadow-lg animate-fade-in" id="review_form_container">
            <h3 className="font-display text-lg font-bold text-zinc-900 mb-4">Написать отзыв о клининге NasyrovWash</h3>
            
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="block font-sans text-xs font-extrabold text-zinc-500 uppercase tracking-wider">Ваше имя / Псевдоним</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Алексей М."
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 font-sans text-sm text-zinc-800 outline-none focus:border-teal-600"
                    id="input_review_name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block font-sans text-xs font-extrabold text-zinc-500 uppercase tracking-wider">Тип выполненной уборки</label>
                  <select 
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 font-sans text-sm text-zinc-800 outline-none focus:border-teal-600"
                    id="select_review_type"
                  >
                    <option value="Поддерживающая уборка">Поддерживающая уборка</option>
                    <option value="Генеральная уборка">Генеральная уборка</option>
                    <option value="Уборка после ремонта">Уборка после ремонта</option>
                    <option value="Мытье окон">Мытье окон</option>
                    <option value="Уборка офиса">Уборка офиса</option>
                  </select>
                </div>
              </div>

              {/* Star Rating select */}
              <div className="space-y-2">
                <label className="block font-sans text-xs font-extrabold text-zinc-500 uppercase tracking-wider">Оценка качества</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className="text-2xl transition-transform hover:scale-110 p-1 font-sans"
                      aria-label={`Оценить на ${s} звезд`}
                      id={`btn_star_rating_${s}`}
                    >
                      <Star className={`h-6 w-6 ${s <= rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-300'}`} />
                    </button>
                  ))}
                  <span className="text-xs font-bold font-sans text-zinc-500 ml-2">
                    {rating === 5 ? 'Идеально! ✨' : rating === 4 ? 'Очень хорошо 👍' : rating === 3 ? 'Нормально' : rating === 2 ? 'Плохо' : 'Ужасно'}
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <div className="space-y-2">
                <label className="block font-sans text-xs font-extrabold text-zinc-500 uppercase tracking-wider">Текст отзыва</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="Опишите ваши впечатления от чистоты, вежливости клинера, пунктуальности..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 font-sans text-sm text-zinc-800 outline-none focus:border-teal-600"
                  id="input_review_text"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-full border border-zinc-200 px-4 py-2.5 font-sans text-xs font-bold text-zinc-650 hover:bg-zinc-100 transition-colors"
                  id="form_review_cancel"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-teal-600 px-5 py-2.5 font-sans text-xs font-extrabold text-white hover:bg-teal-700 transition-colors"
                  id="form_review_submit"
                >
                  Опубликовать на NasyrovWash
                </button>
              </div>

            </form>
          </div>
        )}

        {/* Reviews Cards List Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left" id="reviews_logs_list">
          {reviews.map((rev) => (
            <div 
              key={rev.id}
              className="flex flex-col justify-between p-6 rounded-3xl border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:shadow-xl hover:border-teal-500/10 transition-all duration-350"
            >
              <div>
                {/* Rating & Verified */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4.5 w-4.5 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-200'}`} 
                      />
                    ))}
                  </div>
                  {rev.isVerified && (
                    <span className="flex items-center text-[10px] font-extrabold font-sans text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full">
                      <BadgeCheck className="h-3 w-3 mr-1 stroke-[2.5]" /> Заказ проверен
                    </span>
                  )}
                </div>

                {/* Review Message Text */}
                <p className="mt-4 font-sans text-sm text-zinc-650 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="mt-6 border-t border-zinc-100 pt-4 flex items-center justify-between text-xs font-sans text-zinc-500">
                <div>
                  <span className="block font-bold text-zinc-900">{rev.author}</span>
                  <span className="block text-[10px] text-zinc-400 mt-0.5">{rev.serviceType}</span>
                </div>
                <span>{rev.date}</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
