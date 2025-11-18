import { LogoBrandConfig } from "./types";

const defaultVariants: LogoBrandConfig["variants"] = {
  horizontal: {
    assetPath: "/assets/horizontal-logo.svg",
    width: 148,
    height: 40,
    alt: "사이트 가로 로고",
  },
  vertical: {
    assetPath: "/assets/vertical-logo.svg",
    width: 132,
    height: 100,
    alt: "사이트 세로 로고",
  },
};

export const logoBrandRecords = {
  default: {
    assetBasePath: "",
    variants: defaultVariants,
  },
} satisfies Record<string, LogoBrandConfig>;

export type LogoBrandKey = keyof typeof logoBrandRecords;

export const DEFAULT_LOGO_BRAND: LogoBrandKey = "default";
