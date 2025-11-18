import Image from "next/image";
import { forwardRef } from "react";

import { cn } from "@/utils/cn";

import {
  DEFAULT_LOGO_BRAND,
  logoBrandRecords,
  type LogoBrandKey,
} from "./brand-records";
import { type LogoLoading, type LogoSize, type LogoVariant } from "./types";

const SIZE_SCALE: Record<LogoSize, number> = {
  sm: 0.75,
  md: 1,
  lg: 1.25,
};

const DEFAULT_LOGO_PROPS = {
  brand: DEFAULT_LOGO_BRAND,
  variant: "horizontal" as LogoVariant,
  size: "md" as LogoSize,
  priority: false,
  loading: "lazy" as LogoLoading,
};

export type LogoProps = {
  brand?: LogoBrandKey;
  variant?: LogoVariant;
  size?: LogoSize;
  priority?: boolean;
  loading?: LogoLoading;
  className?: string;
  ariaLabel?: string;
  assetBasePath?: string;
};

const resolveBrand = (brand?: LogoBrandKey) =>
  logoBrandRecords[brand ?? DEFAULT_LOGO_BRAND] ??
  logoBrandRecords[DEFAULT_LOGO_BRAND];

const resolveVariant = (variant?: LogoVariant) => variant ?? "horizontal";

const Logo = forwardRef<HTMLDivElement, LogoProps>(function Logo(
  {
    brand = DEFAULT_LOGO_PROPS.brand,
    variant = DEFAULT_LOGO_PROPS.variant,
    size = DEFAULT_LOGO_PROPS.size,
    priority = DEFAULT_LOGO_PROPS.priority,
    loading = DEFAULT_LOGO_PROPS.loading,
    className,
    ariaLabel,
    assetBasePath,
  },
  ref
) {
  const brandConfig = resolveBrand(brand);
  const variantKey = resolveVariant(variant);
  const variantConfig = brandConfig.variants[variantKey];
  const scale = SIZE_SCALE[size];

  const width = Math.round(variantConfig.width * scale);
  const height = Math.round(variantConfig.height * scale);

  const basePath = assetBasePath ?? brandConfig.assetBasePath ?? "";
  const src = `${basePath}${variantConfig.assetPath}`;

  return (
    <div
      ref={ref}
      className={cn("inline-flex items-center justify-center", className)}
      aria-label={ariaLabel}
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt={variantConfig.alt}
        priority={priority}
        loading={priority ? undefined : loading}
      />
    </div>
  );
});

Logo.displayName = "Logo";

export default Logo;
