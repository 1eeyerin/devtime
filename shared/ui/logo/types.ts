export type LogoVariant = "horizontal" | "vertical";

export type LogoSize = "sm" | "md" | "lg";

export type LogoLoading = "lazy" | "eager";

export type LogoVariantConfig = {
  assetPath: string;
  width: number;
  height: number;
  alt: string;
};

export type LogoBrandConfig = {
  assetBasePath?: string;
  variants: Record<LogoVariant, LogoVariantConfig>;
};
