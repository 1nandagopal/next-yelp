"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect } from "react";

export function ImageCarousel({ images }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [
      Autoplay({
        delay: 2500,
        stopOnInteraction: false,
      }),
    ]
  );

  useEffect(() => {
    if (emblaApi) emblaApi.slideNodes();
  }, [emblaApi]);

  return (
    <div className=" overflow-hidden select-none" ref={emblaRef}>
      <div className="flex h-full">
        {images.map((image) => {
          return (
            <div
              className="relative flex-grow-0 flex-shrink-0 basis-full"
              key={image}
            >
              <Image
                src={image}
                fill
                className="object-cover px-[1px]"
                alt="campground image"
                priority
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
