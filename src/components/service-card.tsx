"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLink } from "@/components/site-components";
import type { Service } from "@/content/data";

type ServiceCardProps = {
  service: Service;
  index: number;
  totalServices?: number;
  headingLevel?: "h2" | "h3";
  actionLabel?: string;
  href?: string;
  galleryLabels?: {
    gallery: string;
    previous: string;
    next: string;
    imagePosition: string;
    showImage: string;
  };
};

export function ServiceCard({ service, index, totalServices = 1, headingLevel = "h3", actionLabel = "Learn more", href, galleryLabels }: ServiceCardProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slideCount = service.images.length;
  const Heading = headingLevel;
  const staggerDelay = (index + 1) * 3000;
  const cycleDelay = Math.max(totalServices, 1) * 3000;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % slideCount);
      interval = window.setInterval(() => {
        setActiveSlide((currentSlide) => (currentSlide + 1) % slideCount);
      }, cycleDelay);
    }, staggerDelay);

    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, [cycleDelay, slideCount, staggerDelay]);

  function selectSlide(nextSlide: number) {
    setActiveSlide((nextSlide + slideCount) % slideCount);
  }

  function label(template: string, current: number, total: number) {
    return template.replace("{current}", String(current)).replace("{total}", String(total));
  }

  return (
    <article className="service-card">
      <div className="service-gallery" aria-label={galleryLabels ? galleryLabels.gallery : `${service.name} image gallery`}>
        {service.images.map((image, imageIndex) => (
          <Image
            alt={imageIndex === activeSlide ? image.alt : ""}
            aria-hidden={imageIndex !== activeSlide}
            className={`service-card-image${imageIndex === activeSlide ? " is-active" : ""}`}
            fill
            key={image.src}
            sizes="(max-width: 780px) 100vw, (max-width: 1050px) 50vw, 33vw"
            src={image.src}
          />
        ))}
        <div className="gallery-controls">
          <button aria-label={galleryLabels ? galleryLabels.previous : `Previous ${service.name} image`} className="gallery-control" onClick={() => selectSlide(activeSlide - 1)} type="button">
            <span aria-hidden="true">&#8592;</span>
          </button>
          <div aria-label={galleryLabels ? label(galleryLabels.imagePosition, activeSlide + 1, slideCount) : `Image ${activeSlide + 1} of ${slideCount}`} className="gallery-dots" role="group">
            {service.images.map((image, imageIndex) => (
              <button
                aria-label={galleryLabels ? label(galleryLabels.showImage, imageIndex + 1, slideCount) : `Show image ${imageIndex + 1} of ${slideCount} for ${service.name}`}
                aria-pressed={imageIndex === activeSlide}
                className={`gallery-dot${imageIndex === activeSlide ? " is-active" : ""}`}
                key={image.src}
                onClick={() => selectSlide(imageIndex)}
                type="button"
              />
            ))}
          </div>
          <button aria-label={galleryLabels ? galleryLabels.next : `Next ${service.name} image`} className="gallery-control" onClick={() => selectSlide(activeSlide + 1)} type="button">
            <span aria-hidden="true">&#8594;</span>
          </button>
        </div>
      </div>
      <div className="service-card-content">
        <div className="card-index">{String(index + 1).padStart(2, "0")}</div>
        <p className="card-kicker">{service.kicker}</p>
        <Heading>{service.name}</Heading>
        <p>{service.summary}</p>
        <ArrowLink href={href ?? `/services/${service.slug}`}>{actionLabel}</ArrowLink>
      </div>
    </article>
  );
}
