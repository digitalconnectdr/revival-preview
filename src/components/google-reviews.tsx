"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { business } from "@/content/business";
import { googleReviews } from "@/content/data";

const reviewsUrl = `https://www.google.com/maps/search/?api=1&query_place_id=${business.googlePlaceId.value}&query=Revival%20Transportation%20Group`;

export function GoogleReviews() {
  const [activeReview, setActiveReview] = useState(0);
  const reviewCount = googleReviews.reviews.length;

  useEffect(() => {
    if (reviewCount < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % reviewCount);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [reviewCount]);

  function selectReview(nextReview: number) {
    setActiveReview((nextReview + reviewCount) % reviewCount);
  }

  return <section aria-labelledby="google-reviews-title" className="reviews-showcase">
    <div className="container reviews-showcase-grid">
      <div className="reviews-summary">
        <p className="eyebrow">Google reviews</p>
        <h2 id="google-reviews-title">Trusted by travelers, in their own words.</h2>
        <div aria-label={`${googleReviews.rating} out of 5 stars from Google reviews`} className="review-rating">
          <strong>{googleReviews.rating}</strong><span aria-hidden="true">★★★★★</span>
        </div>
        <p className="review-count">Based on {googleReviews.total} Google reviews</p>
        <p className="review-verified">Review snapshot last checked {googleReviews.lastChecked}</p>
        <Link className="button button-gold" href={reviewsUrl} rel="noreferrer" target="_blank">Read all Google reviews <span aria-hidden="true">↗</span></Link>
      </div>
      <div aria-label="Traveler reviews carousel" className="review-carousel" role="region">
        <div className="review-carousel-viewport">
          <div className="review-carousel-track" style={{ transform: `translateX(-${activeReview * 100}%)` }}>
            {googleReviews.reviews.map((review, reviewIndex) => <figure aria-hidden={reviewIndex !== activeReview} className="review-card" key={review.author}>
              <div aria-hidden="true" className="review-card-quote-mark">“</div>
              <div aria-hidden="true" className="review-stars">★★★★★</div>
              <blockquote>“{review.quote}”</blockquote>
              <figcaption><strong>{review.author}</strong><span>Featured Google review</span></figcaption>
            </figure>)}
          </div>
        </div>
        <div className="review-carousel-footer">
          <div aria-label={`Showing review ${activeReview + 1} of ${reviewCount}`} className="review-dots">
            {googleReviews.reviews.map((review, reviewIndex) => <button aria-label={`Show review ${reviewIndex + 1} by ${review.author}`} aria-pressed={reviewIndex === activeReview} className={reviewIndex === activeReview ? "is-active" : ""} key={review.author} onClick={() => selectReview(reviewIndex)} type="button" />)}
          </div>
          <div className="review-carousel-controls">
            <button aria-label="Show previous review" onClick={() => selectReview(activeReview - 1)} type="button">←</button>
            <span aria-live="polite">{String(activeReview + 1).padStart(2, "0")} / {String(reviewCount).padStart(2, "0")}</span>
            <button aria-label="Show next review" onClick={() => selectReview(activeReview + 1)} type="button">→</button>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
