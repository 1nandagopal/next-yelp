"use client";

import { Image, Skeleton } from "@nextui-org/react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import NextImage from "next/image";
import { useEffect, useState } from "react";

export function ImageCarousel({ images }) {
  const [imgLoadStatus, setImgLoadStatus] = useState(
    new Array(images.length).fill(false)
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      watchDrag: images.length > 1 ? true : false,
    },
    [
      Autoplay({
        delay: 2500,
        stopOnInteraction: false,
      }),
    ]
  );

  useEffect(() => {
    if (emblaApi && images.length > 1) emblaApi.slideNodes();
  }, [emblaApi]);

  useEffect(() => {
    console.log(imgLoadStatus);
  }, [imgLoadStatus]);

  function toggleImgStatus(index) {
    setImgLoadStatus((prev) =>
      prev.map((status, i) => (index === i ? !status : status))
    );
  }

  return (
    <div className="overflow-hidden select-none h-full" ref={emblaRef}>
      <div className="flex h-full">
        {images.map((image, index) => {
          return (
            <div
              className="flex-grow-0 flex-shrink-0 basis-full h-full"
              key={image}
            >
              <Skeleton
                className="h-full relative"
                isLoaded={imgLoadStatus[index]}
              >
                <NextImage
                  src={image}
                  fill
                  alt="as"
                  quality={100}
                  className="object-cover px-[1px]"
                  priority
                  onLoad={(e) => toggleImgStatus(index)}
                />
              </Skeleton>
            </div>
          );
        })}
      </div>
    </div>
  );
}
