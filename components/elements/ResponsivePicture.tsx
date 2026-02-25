/**
 * Muestra una imagen en móvil y otra en escritorio.
 * El navegador solo descarga la que corresponde al ancho actual (usa <picture> + media).
 *
 * Uso:
 * <ResponsivePicture
 *   mobileSrc="/assets/images/food-mobile.jpg"
 *   desktopSrc="/assets/images/food-desktop.jpg"
 *   alt="..."
 *   breakpoint={768}
 * />
 */
type Props = {
  /** URL de la imagen que se verá en pantallas menores a breakpoint (móvil) */
  mobileSrc: string;
  /** URL de la imagen que se verá en pantallas >= breakpoint (escritorio) */
  desktopSrc: string;
  alt: string;
  /** Ancho en px a partir del cual se usa desktopSrc. Por defecto 768 (móvil < 768px) */
  breakpoint?: number;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
};

export default function ResponsivePicture({
  mobileSrc,
  desktopSrc,
  alt,
  breakpoint = 768,
  className = '',
  priority = false,
  width,
  height,
  sizes = '100vw',
}: Props) {
  const media = `(max-width: ${breakpoint - 1}px)`;
  return (
    <picture className={className}>
      <source media={media} srcSet={mobileSrc} />
      <img
        src={desktopSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </picture>
  );
}
