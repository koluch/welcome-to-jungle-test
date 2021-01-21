import { DEFAULT_LANGUAGE } from "../api/constants";
import { ApiLanguage } from "../api/types";

export function useCurrentLanguage(): ApiLanguage {
  return DEFAULT_LANGUAGE;
}
