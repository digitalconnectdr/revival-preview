"use client";

import Image from "next/image";
import { useState } from "react";
import type { Service } from "@/content/data";

type GalleryLabels = {
  gallery: string;
  previous: string;
  next: string;
  image: string;
};

export function ServiceImageGallery({ service, labels }: { service: Service; labels?: GalleryLabels }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slideCount = service.images.length;

  function selectSlide(nextSlide: number) {
    setActiveSlide((nextSlide + slideCount) % slideCount);
  }

  function label(template: string, current: number, total: number) {
    return template.replace("{current}", String(current)).replace("{total}", String(total));
  }

  return <section aria-label={labels?.gallery ?? `${service.name} image gallery`} className="service-detail-gallery">
    <div className="service-detail-stage">
      {service.images.map((image, imageIndex) => <Image
        alt={imageIndex === activeSlide ? image.alt : ""}
        aria-hidden={imageIndex !== activeSlide}
        className={`service-detail-image${imageIndex === activeSlide ? " is-active" : ""}`}
        fill
        key={image.src}
        priority={imageIndex === 0}
        sizes="(max-width: 780px) 100vw, 1200px"
        src={image.src}
      />)}
      <div className="detail-gallery-bar">
        <span>{String(activeSlide + 1).padStart(2, "0")} / {String(slideCount).padStart(2, "0")}</span>
      </div>
      <div className="detail-gallery-controls">
        <button aria-label={labels?.previous ?? `Previous ${service.name} image`} onClick={() => selectSlide(activeSlide - 1)} type="button">←</button>
        <button aria-label={labels?.next ?? `Next ${service.name} image`} onClick={() => selectSlide(activeSlide + 1)} type="button">→</button>
      </div>
    </div>
    <div className="service-detail-thumbnails">
      {service.images.map((image, imageIndex) => <button
        aria-label={labels ? label(labels.image, imageIndex + 1, slideCount) : `Show image ${imageIndex + 1} of ${slideCount} for ${service.name}`}
        aria-pressed={imageIndex === activeSlide}
        className={`service-detail-thumbnail${imageIndex === activeSlide ? " is-active" : ""}`}
        key={image.src}
        onClick={() => selectSlide(imageIndex)}
        type="button"
      ><Image alt="" fill sizes="(max-width: 780px) 30vw, 260px" src={image.src} /></button>)}
    </div>
  </section>;
}
