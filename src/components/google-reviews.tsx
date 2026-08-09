"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { business } from "@/content/business";
import { googleReviews } from "@/content/data";
import type { Locale } from "@/i18n/config";

const reviewsUrl = `https://www.google.com/maps/search/?api=1&query_place_id=${business.googlePlaceId.value}&query=Revival%20Transportation%20Group`;
const localizedReviewDate: Record<Locale, string> = { en: googleReviews.lastChecked, es: "9 de agosto de 2026", pt: "9 de agosto de 2026" };

const reviewCopy: Record<Locale, { eyebrow: string; title: string; rating: string; count: string; verified: string; all: string; carousel: string; featured: string; previous: string; next: string; showing: (current: number, total: number) => string; show: (index: number, author: string) => string }> = {
  en: { eyebrow: "Google reviews", title: "Trusted by travelers, in their own words.", rating: `${googleReviews.rating} out of 5 stars from Google reviews`, count: `Based on ${googleReviews.total} Google reviews`, verified: `Review snapshot last checked ${googleReviews.lastChecked}`, all: "Read all Google reviews", carousel: "Traveler reviews carousel", featured: "Featured Google review", previous: "Show previous review", next: "Show next review", showing: (current, total) => `Showing review ${current} of ${total}`, show: (index, author) => `Show review ${index} by ${author}` },
  es: { eyebrow: "Reseñas de Google", title: "La confianza de los viajeros, en sus propias palabras.", rating: `${googleReviews.rating} de 5 estrellas en reseñas de Google`, count: `Basado en ${googleReviews.total} reseñas de Google`, verified: `Resumen de reseñas verificado el ${localizedReviewDate.es}`, all: "Leer todas las reseñas de Google", carousel: "Carrusel de reseñas de viajeros", featured: "Reseña destacada de Google", previous: "Ver reseña anterior", next: "Ver siguiente reseña", showing: (current, total) => `Mostrando reseña ${current} de ${total}`, show: (index, author) => `Ver reseña ${index} de ${author}` },
  pt: { eyebrow: "Avaliações do Google", title: "A confiança dos viajantes, em suas próprias palavras.", rating: `${googleReviews.rating} de 5 estrelas em avaliações do Google`, count: `Com base em ${googleReviews.total} avaliações do Google`, verified: `Resumo das avaliações verificado em ${localizedReviewDate.pt}`, all: "Ler todas as avaliações do Google", carousel: "Carrossel de avaliações de viajantes", featured: "Avaliação em destaque do Google", previous: "Ver avaliação anterior", next: "Ver próxima avaliação", showing: (current, total) => `Mostrando a avaliação ${current} de ${total}`, show: (index, author) => `Ver avaliação ${index} de ${author}` },
};

export function GoogleReviews({ locale = "en" }: { locale?: Locale }) {
  const [activeReview, setActiveReview] = useState(0);
  const reviewCount = googleReviews.reviews.length;
  const text = reviewCopy[locale];

  useEffect(() => {
    if (reviewCount < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => setActiveReview((current) => (current + 1) % reviewCount), 6500);
    return () => window.clearInterval(interval);
  }, [reviewCount]);

  function selectReview(nextReview: number) { setActiveReview((nextReview + reviewCount) % reviewCount); }

  return <section aria-labelledby="google-reviews-title" className="reviews-showcase"><div className="container reviews-showcase-grid">
    <div className="reviews-summary"><p className="eyebrow">{text.eyebrow}</p><h2 id="google-reviews-title">{text.title}</h2><div aria-label={text.rating} className="review-rating"><strong>{googleReviews.rating}</strong><span aria-hidden="true">★★★★★</span></div><p className="review-count">{text.count}</p><p className="review-verified">{text.verified}</p><Link className="button button-gold" href={reviewsUrl} rel="noreferrer" target="_blank">{text.all} <span aria-hidden="true">↗</span></Link></div>
    <div aria-label={text.carousel} className="review-carousel" role="region"><div className="review-carousel-viewport"><div className="review-carousel-track" style={{ transform: `translateX(-${activeReview * 100}%)` }}>{googleReviews.reviews.map((review, reviewIndex) => <figure aria-hidden={reviewIndex !== activeReview} className="review-card" key={review.author}><div aria-hidden="true" className="review-card-quote-mark">“</div><div aria-hidden="true" className="review-stars">★★★★★</div><blockquote>“{review.quote}”</blockquote><figcaption><strong>{review.author}</strong><span>{text.featured}</span></figcaption></figure>)}</div></div><div className="review-carousel-footer"><div aria-label={text.showing(activeReview + 1, reviewCount)} className="review-dots">{googleReviews.reviews.map((review, reviewIndex) => <button aria-label={text.show(reviewIndex + 1, review.author)} aria-pressed={reviewIndex === activeReview} className={reviewIndex === activeReview ? "is-active" : ""} key={review.author} onClick={() => selectReview(reviewIndex)} type="button" />)}</div><div className="review-carousel-controls"><button aria-label={text.previous} onClick={() => selectReview(activeReview - 1)} type="button">←</button><span aria-live="polite">{String(activeReview + 1).padStart(2, "0")} / {String(reviewCount).padStart(2, "0")}</span><button aria-label={text.next} onClick={() => selectReview(activeReview + 1)} type="button">→</button></div></div></div>
  </div></section>;
}
