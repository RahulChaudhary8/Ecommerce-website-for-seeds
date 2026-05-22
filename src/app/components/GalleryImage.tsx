import { useState } from "react";
import { getLocalGalleryImage, PRODUCT_PLACEHOLDER } from "../../utils/productImage";

interface GalleryImageProps {
  index: number;
  fallbackSrc: string;
  alt: string;
  className?: string;
}

export default function GalleryImage({ index, fallbackSrc, alt, className }: GalleryImageProps) {
  const [src, setSrc] = useState(getLocalGalleryImage(index));

  const handleError = () => {
    if (src === getLocalGalleryImage(index)) {
      setSrc(fallbackSrc);
    } else if (src !== PRODUCT_PLACEHOLDER) {
      setSrc(PRODUCT_PLACEHOLDER);
    }
  };

  return <img src={src} alt={alt} className={className} onError={handleError} loading="lazy" />;
}
