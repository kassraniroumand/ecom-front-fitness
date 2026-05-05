"use client";

import { useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";

type Variant = "light" | "dark";

interface AdaptiveImageProps extends Omit<ImageProps, "src"> {
  src: string;
  variant: Variant;
  targetLuminance?: number;
}

export const AdaptiveImage = ({
  src,
  variant,
  targetLuminance,
  className = "",
  alt = "",
  style,
  ...rest
}: AdaptiveImageProps) => {
  const [filter, setFilter] = useState<string>("none");

  useEffect(() => {
    let cancelled = false;
    const probe = new window.Image();
    probe.crossOrigin = "anonymous";
    probe.decoding = "async";

    probe.onload = () => {
      if (cancelled) return;
      try {
        const W = 64;
        const H = Math.max(1, Math.round((probe.naturalHeight / probe.naturalWidth) * W));
        const canvas = document.createElement("canvas");
        canvas.width = W;
        canvas.height = H;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;
        ctx.drawImage(probe, 0, 0, W, H);
        const { data } = ctx.getImageData(0, 0, W, H);

        let sum = 0;
        let weight = 0;
        for (let i = 0; i < data.length; i += 4) {
          const a = data[i + 3] / 255;
          if (a < 0.05) continue;
          const l = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
          sum += l * a;
          weight += a;
        }
        if (weight === 0) return;

        const avg = sum / weight;
        const target = targetLuminance ?? (variant === "dark" ? 0.78 : 0.18);
        const delta = avg - target;
        const needsHeavyFlip = Math.abs(delta) > 0.45;

        if (needsHeavyFlip) {
          const brightness = 1.0;
          const contrast = 1.05;
          setFilter(
            `invert(1) hue-rotate(180deg) brightness(${brightness.toFixed(
              2
            )}) contrast(${contrast.toFixed(2)})`
          );
          return;
        }

        const brightness = Math.max(
          0.7,
          Math.min(1.6, 1 - delta * (variant === "dark" ? 0.9 : 0.6))
        );
        const contrast = variant === "dark" ? 1.05 : 1.08;
        setFilter(`brightness(${brightness.toFixed(2)}) contrast(${contrast.toFixed(2)})`);
      } catch {
        setFilter("none");
      }
    };

    probe.onerror = () => setFilter("none");
    probe.src = src;

    return () => {
      cancelled = true;
    };
  }, [src, variant, targetLuminance]);

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      style={{ filter, transition: "filter 200ms ease", ...style }}
      {...rest}
    />
  );
};
