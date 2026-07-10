/** Minimal `next/image` replacement — a plain <img>. Not used by the catalog,
 *  provided only so any stray import resolves. */
import { forwardRef, type ImgHTMLAttributes } from "react";

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string | { src: string };
  priority?: boolean;
  fill?: boolean;
  quality?: number;
  loader?: unknown;
};

const NextImage = forwardRef<HTMLImageElement, ImageProps>(function NextImage(
  { src, priority: _priority, fill: _fill, quality: _quality, loader: _loader, ...rest },
  ref,
) {
  const resolved = typeof src === "string" ? src : src?.src;
  return <img ref={ref} src={resolved} {...rest} />;
});

export default NextImage;
