import { useState } from "react";
import { getLocalProductImage, PRODUCT_PLACEHOLDER } from "../../utils/productImage";

interface ProductImageProps {
  productId: number;
  fallbackSrc: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

export default function ProductImage({
  productId,
  fallbackSrc,
  alt,
  className,
  onClick,
}: ProductImageProps) {
  const [src, setSrc] = useState(getLocalProductImage(productId));

  const handleError = () => {
    if (src === getLocalProductImage(productId)) {
      setSrc(fallbackSrc);
    } else if (src !== PRODUCT_PLACEHOLDER) {
      setSrc(PRODUCT_PLACEHOLDER);
    }
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onClick={onClick}
      onError={handleError}
      loading="lazy"
    />
  );
}
